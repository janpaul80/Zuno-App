import fs from 'node:fs'
import path from 'node:path'

function getenvFromDotEnv(dotEnvPath, key) {
  if (!fs.existsSync(dotEnvPath)) return null
  const lines = fs.readFileSync(dotEnvPath, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    if (!line || line.trim().startsWith('#')) continue
    const idx = line.indexOf('=')
    if (idx === -1) continue
    const k = line.slice(0, idx).trim()
    if (k !== key) continue
    return line.slice(idx + 1).trim().replace(/^"|"$/g, '')
  }
  return null
}

function toUrl(baseUrl, p) {
  const normalized = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  return `${normalized}${p}`
}

async function main() {
  // Read .env.local without printing secrets.
  const root = process.cwd()
  const dotEnv = path.join(root, '.env.local')

  const apiKey =
    process.env.MUAPI_API ||
    getenvFromDotEnv(dotEnv, 'MUAPI_API') ||
    process.env.HIGGSFIELD_API_KEY ||
    getenvFromDotEnv(dotEnv, 'HIGGSFIELD_API_KEY')

  if (!apiKey) {
    console.error('Missing MUAPI_API (or HIGGSFIELD_API_KEY) in environment/.env.local')
    process.exitCode = 1
    return
  }

  const baseUrl = (process.env.MUAPI_BASE_URL || getenvFromDotEnv(dotEnv, 'MUAPI_BASE_URL') || 'https://api.muapi.ai').trim()
  const endpoint = process.env.MUAPI_T2V_ENDPOINT || getenvFromDotEnv(dotEnv, 'MUAPI_T2V_ENDPOINT') || 'seedance-lite-t2v'

  // This is an example generation request. It may bill/consume credits.
  // Keep it intentionally short.
  const submitUrl = toUrl(baseUrl, `/api/v1/${endpoint}`)
  const submitPayload = {
    prompt: 'A cinematic, moody forest corridor, slow dolly forward, volumetric fog, 35mm, film grain',
    aspect_ratio: '9:16',
    duration: 5,
    resolution: '480p',
  }

  const submitRes = await fetch(submitUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(submitPayload),
  })

  const submitText = await submitRes.text().catch(() => '')
  if (!submitRes.ok) {
    console.error(`submit failed: ${submitRes.status} ${submitRes.statusText}`)
    console.error(submitText.slice(0, 500))
    process.exitCode = 1
    return
  }

  const submitJson = submitText ? JSON.parse(submitText) : {}
  const requestId = submitJson.request_id || submitJson.id
  if (!requestId) {
    const directUrl = submitJson.url
    console.log(JSON.stringify({ ok: true, directUrl: typeof directUrl === 'string' ? directUrl : null }))
    return
  }

  const pollUrl = toUrl(baseUrl, `/api/v1/predictions/${requestId}/result`)
  const maxAttempts = 10
  for (let i = 1; i <= maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 2000))
    const r = await fetch(pollUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
      },
    })
    const t = await r.text().catch(() => '')
    if (!r.ok) {
      console.error(`poll failed: ${r.status} ${r.statusText}`)
      console.error(t.slice(0, 200))
      process.exitCode = 1
      return
    }
    const j = t ? JSON.parse(t) : {}
    const status = typeof j.status === 'string' ? j.status : null
    if (status && ['completed', 'succeeded', 'success'].includes(status.toLowerCase())) {
      const url = Array.isArray(j.outputs) ? j.outputs[0] : j.url || j.output?.url
      console.log(JSON.stringify({ ok: true, status, url: typeof url === 'string' ? url : null }))
      return
    }
    if (status && ['failed', 'error'].includes(status.toLowerCase())) {
      console.error(JSON.stringify({ ok: false, status, error: j.error ?? null }))
      process.exitCode = 1
      return
    }
  }

  console.log(JSON.stringify({ ok: false, status: 'timeout', note: 'polling exceeded smoke-test limit' }))
  process.exitCode = 2
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
