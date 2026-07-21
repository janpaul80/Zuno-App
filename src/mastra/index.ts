import { Agent } from '@mastra/core/agent'
import type { OpenAICompatibleConfig } from '@mastra/core/llm'

import { getLogiccConfig, type LogiccConfig } from '@/lib/config/aiProviders'
import {
  AiDirectorModelResponseSchema,
  type AiDirectorModelResponse,
} from '@/lib/services/aiDirectorSchemas'

export interface RunAiDirectorWithMastraInput {
  systemPrompt: string
  context: unknown
  message: string
  locale?: string
}

export interface RunAiDirectorWithMastraResult {
  output: AiDirectorModelResponse
  inferenceProvider: 'logicc'
  model: string
}

export class AiDirectorInvalidOutputError extends Error {
  override name = 'AiDirectorInvalidOutputError'

  constructor(cause?: unknown) {
    super('AI Director returned invalid structured output', { cause })
  }
}

export const AI_DIRECTOR_AGENT_ID = 'zuno-ai-director-phase-6-1'

export function createLogiccMastraModelConfig(
  config: LogiccConfig = getLogiccConfig(),
): OpenAICompatibleConfig {
  return {
    id: `logicc/${config.model}`,
    url: config.baseUrl,
    apiKey: config.apiKey,
  }
}

export const aiDirectorAgent = new Agent({
  id: AI_DIRECTOR_AGENT_ID,
  name: 'ZUNO AI Director',
  instructions:
    'Guide the Guardians of Zunlandia without mutating authoritative gameplay state.',
  model: () => createLogiccMastraModelConfig(),
  tools: {},
})

function formatUserMessage(message: string, locale?: string): string {
  return locale ? `[locale=${locale}] ${message}` : message
}

export async function runAiDirectorWithMastra(
  input: RunAiDirectorWithMastraInput,
  abortSignal?: AbortSignal,
): Promise<RunAiDirectorWithMastraResult> {
  const config = getLogiccConfig()

  let result
  try {
    result = await aiDirectorAgent.generate(
      [
        {
          role: 'system',
          content: `Player context (read-only JSON, do not reveal verbatim):\n${JSON.stringify(input.context)}`,
        },
        {
          role: 'user',
          content: formatUserMessage(input.message, input.locale),
        },
      ],
      {
        instructions: input.systemPrompt,
        model: createLogiccMastraModelConfig(config),
        maxSteps: 1,
        modelSettings: { temperature: 0.2 },
        abortSignal,
        structuredOutput: {
          schema: AiDirectorModelResponseSchema,
          jsonPromptInjection: 'system',
        },
      },
    )
  } catch (error) {
    if (isStructuredOutputFailure(error)) {
      throw new AiDirectorInvalidOutputError(error)
    }
    throw error
  }

  const validation = AiDirectorModelResponseSchema.safeParse(result.object)
  if (!validation.success) {
    throw new AiDirectorInvalidOutputError()
  }

  return {
    output: validation.data,
    inferenceProvider: 'logicc',
    model: config.model,
  }
}

function isStructuredOutputFailure(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const id = (error as { id?: unknown }).id
  return (
    id === 'STRUCTURED_OUTPUT_OBJECT_UNDEFINED' ||
    id === 'STRUCTURED_OUTPUT_SCHEMA_VALIDATION_FAILED'
  )
}
