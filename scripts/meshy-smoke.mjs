import fs from 'node:fs'
import path from 'node:path'

function getenvFromDotEnv(dotEnvPath, key) {
  try {
    const raw = fs.readFileSync(dotEnvPath, 'utf8')
    const lines = raw.split(/\r?\n/)
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const [k, v] = trimmed.split('=')
      if (!k || typeof v === 'undefined') continue
      if (k.trim() === key) return v.trim().replace(/^"|"$/g, '')
    }
  } catch {
    // ignore
  }
  return undefined
}

async function main() {
  const dotEnvPath = path.join(process.cwd(), '.env.local')
  const canonical = process.env.MESHY_AI_API || getenvFromDotEnv(dotEnvPath, 'MESHY_AI_API')
  const legacy = process.env.MESHI_AI_API || getenvFromDotEnv(dotEnvPath, 'MESHI_AI_API')

  const apiKey = (canonical || legacy || '').trim()
  if (!apiKey) {
    console.error(
      '[meshy-smoke] Meshy API key missing. Set MESHY_AI_API (preferred) or MESHI_AI_API in .env.local.',
    )
    process.exit(1)
  }

  console.log('[meshy-smoke] Meshy API key detected (value hidden).')
  console.log('[meshy-smoke] WARNING: any real Meshy generation request may consume credits.')
  console.log('[meshy-smoke] This script currently does not call the live Meshy API.')
}

main().catch((err) => {
  console.error('[meshy-smoke] Unexpected error:', err)
  process.exit(1)
})
