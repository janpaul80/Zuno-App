import fs from 'node:fs'
import path from 'node:path'

function parseDotEnv(text) {
  const env = {}
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const idx = line.indexOf('=')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    // If a key occurs multiple times, the last one wins.
    env[key] = val
  }
  return env
}

async function main() {
  const dotenvPath = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(dotenvPath)) {
    console.error('Missing .env.local in repo root')
    process.exit(1)
  }

  const env = parseDotEnv(fs.readFileSync(dotenvPath, 'utf8'))

  const baseUrl = (env.LANGDOCK_ENDPOINT_URL || env.LANGDOCK_BASE_URL || '').trim()
  const apiKey = (env.LANGDOCK_API_CODE || env.LANGDOCK_API_KEY || '').trim()
  const model = (env.MODEL || env.LANGDOCK_MODEL || '').trim()

  if (!baseUrl || !apiKey || !model) {
    console.error('Missing Langdock configuration in .env.local')
    console.error(
      JSON.stringify({ hasBaseUrl: !!baseUrl, hasApiKey: !!apiKey, hasModel: !!model }),
    )
    process.exit(1)
  }

  const url = baseUrl.replace(/\/$/, '') + '/chat/completions'

  const body = {
    model,
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content:
          'Return ONLY valid JSON with keys category and reply. Do not include markdown. category must be "help".',
      },
      { role: 'user', content: 'Say hello.' },
    ],
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  const text = await res.text().catch(() => '')
  console.log('status', res.status)
  console.log('body', text.slice(0, 900))

  if (!res.ok) {
    process.exit(2)
  }
}

main().catch((err) => {
  console.error('error', err?.message ?? String(err))
  process.exit(3)
})
