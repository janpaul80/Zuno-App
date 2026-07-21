import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  AI_DIRECTOR_AGENT_ID,
  AiDirectorInvalidOutputError,
  aiDirectorAgent,
  createLogiccMastraModelConfig,
  runAiDirectorWithMastra,
} from './index'
import { AiDirectorModelResponseSchema } from '@/lib/services/aiDirectorSchemas'

const structuredReply = {
  category: 'help' as const,
  reply: 'Follow the beacon, Guardian.',
  suggestions: ['Open the mission map'],
  warnings: ['Do not leave Zunlandia unguarded'],
  narrationText: 'The beacon calls across Zunlandia.',
}

function logiccResponse(content: string): Response {
  return new Response(
    JSON.stringify({
      id: 'chatcmpl-zuno-test',
      object: 'chat.completion',
      created: 1,
      model: 'test-model',
      choices: [
        {
          index: 0,
          message: { role: 'assistant', content },
          finish_reason: 'stop',
        },
      ],
      usage: {
        prompt_tokens: 10,
        completion_tokens: 10,
        total_tokens: 20,
      },
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    },
  )
}

function configureLogicc(): void {
  vi.stubEnv('LOGICC_API_KEY', 'logicc-test-key')
  vi.stubEnv('LOGICC_BASE_URL', 'https://logicc.example/v1/')
  vi.stubEnv('LOGICC_MODEL', 'test-model')
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

describe('Mastra AI Director runner', () => {
  it('uses the configured tool-less Agent and returns full structured output', async () => {
    configureLogicc()
    let requestUrl = ''
    let requestBody: Record<string, unknown> = {}
    let authorization = ''

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input, init) => {
      requestUrl = String(input)
      requestBody = JSON.parse(String(init?.body)) as Record<string, unknown>
      authorization = new Headers(init?.headers).get('authorization') ?? ''
      return logiccResponse(JSON.stringify(structuredReply))
    })

    expect(aiDirectorAgent.id).toBe(AI_DIRECTOR_AGENT_ID)
    expect(await aiDirectorAgent.listTools()).toEqual({})
    expect(createLogiccMastraModelConfig()).toMatchObject({
      id: 'logicc/test-model',
      url: 'https://logicc.example/v1/',
    })

    const result = await runAiDirectorWithMastra({
      systemPrompt: 'You are the ZUNO AI Director.',
      context: { guardian: { level: 4 } },
      message: 'What is next?',
      locale: 'en-US',
    })

    expect(AiDirectorModelResponseSchema.safeParse(result.output).success).toBe(true)
    expect(result.output).toEqual(structuredReply)
    expect(result).toMatchObject({
      inferenceProvider: 'logicc',
      model: 'test-model',
    })
    expect(requestUrl).toBe('https://logicc.example/v1/chat/completions')
    expect(authorization).toBe('Bearer logicc-test-key')
    expect(requestBody.tools).toBeUndefined()
    const messages = requestBody.messages as Array<{ content: string }>
    expect(messages.some(({ content }) => content.includes('{"guardian":{"level":4}}'))).toBe(
      true,
    )
    expect(messages.some(({ content }) => content.includes('[locale=en-US] What is next?'))).toBe(
      true,
    )
  })

  it('propagates cancellation to the Logicc HTTP request', async () => {
    configureLogicc()
    let receivedSignal: AbortSignal | null = null

    vi.spyOn(globalThis, 'fetch').mockImplementation(
      async (_input, init) =>
        await new Promise<Response>((_resolve, reject) => {
          receivedSignal = init?.signal ?? null
          receivedSignal?.addEventListener('abort', () => {
            reject(receivedSignal?.reason ?? new DOMException('Aborted', 'AbortError'))
          })
        }),
    )

    const controller = new AbortController()
    const pending = runAiDirectorWithMastra(
      {
        systemPrompt: 'You are the ZUNO AI Director.',
        context: { guardian: { level: 4 } },
        message: 'What is next?',
      },
      controller.signal,
    )

    await vi.waitFor(() => expect(receivedSignal).not.toBeNull())
    controller.abort(new Error('test cancellation'))

    await expect(pending).rejects.toBeDefined()
    expect((receivedSignal as unknown as AbortSignal).aborted).toBe(true)
  })

  it('rejects malformed model output instead of returning it to a player', async () => {
    configureLogicc()
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(logiccResponse('not valid json'))

    await expect(
      runAiDirectorWithMastra({
        systemPrompt: 'You are the ZUNO AI Director.',
        context: { guardian: { level: 4 } },
        message: 'What is next?',
      }),
    ).rejects.toBeInstanceOf(AiDirectorInvalidOutputError)
  })

  it('does not authorize Langdock merely because Langdock credentials exist', async () => {
    vi.stubEnv('LANGDOCK_API_KEY', 'langdock-key-that-must-not-be-used')
    vi.stubEnv('LANGDOCK_BASE_URL', 'https://langdock.example/v1')
    vi.stubEnv('LANGDOCK_MODEL', 'langdock-model')
    vi.stubEnv('LOGICC_API_KEY', '')
    vi.stubEnv('LOGICC_BASE_URL', '')
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    await expect(
      runAiDirectorWithMastra({
        systemPrompt: 'You are the ZUNO AI Director.',
        context: { guardian: { level: 4 } },
        message: 'What is next?',
      }),
    ).rejects.toMatchObject({
      message: expect.stringContaining('LOGICC_API_KEY'),
    })
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
