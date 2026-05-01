import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function parseMultipart(buffer: Buffer, boundary: string) {
  const parts: Array<{ name: string; filename?: string; contentType?: string; data: Buffer }> = []
  const sep = Buffer.from(`\r\n--${boundary}`)
  const startMarker = Buffer.from(`--${boundary}\r\n`)

  let pos = buffer.indexOf(startMarker)
  if (pos === -1) return parts
  pos += startMarker.length

  while (pos < buffer.length) {
    const headerEnd = buffer.indexOf(Buffer.from('\r\n\r\n'), pos)
    if (headerEnd === -1) break

    const headerStr = buffer.slice(pos, headerEnd).toString('utf8')
    const nextSep = buffer.indexOf(sep, headerEnd + 4)
    const data = nextSep === -1
      ? buffer.slice(headerEnd + 4)
      : buffer.slice(headerEnd + 4, nextSep)

    const nameMatch = headerStr.match(/name="([^"]+)"/i)
    const fileMatch = headerStr.match(/filename="([^"]+)"/i)
    const ctMatch = headerStr.match(/Content-Type:\s*(.+)/i)

    if (nameMatch) {
      parts.push({
        name: nameMatch[1],
        filename: fileMatch?.[1],
        contentType: ctMatch?.[1]?.trim(),
        data,
      })
    }

    if (nextSep === -1) break
    pos = nextSep + sep.length + 2
    if (buffer.slice(pos, pos + 2).toString() === '--') break
  }

  return parts
}

function jsonRes(res: ServerResponse, status: number, body: object) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'launchpal-api',
      configureServer(server) {
        // ── /api/transcribe ───────────────────────────────────────────
        server.middlewares.use('/api/transcribe', async (req: IncomingMessage, res: ServerResponse) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end()
            return
          }

          const apiKey = process.env.OPENAI_API_KEY
          if (!apiKey) {
            console.warn('[/api/transcribe] OPENAI_API_KEY is not set — returning stub')
            jsonRes(res, 200, { text: '[Transcription unavailable: OPENAI_API_KEY not configured]' })
            return
          }

          try {
            const rawBody = await readBody(req)
            const contentType = (req.headers['content-type'] as string) ?? ''
            const boundaryMatch = contentType.match(/boundary=(.+)/)
            if (!boundaryMatch) throw new Error('Missing multipart boundary')

            const parts = parseMultipart(rawBody, boundaryMatch[1].trim())
            const audioPart = parts.find(p => p.name === 'audio')
            if (!audioPart) throw new Error('No audio part in multipart body')

            // Build a new FormData for OpenAI
            const formData = new FormData()
            const blob = new Blob([audioPart.data], { type: audioPart.contentType ?? 'audio/webm' })
            formData.append('file', blob, audioPart.filename ?? 'recording.webm')
            formData.append('model', 'whisper-1')

            const upstream = await fetch('https://api.openai.com/v1/audio/transcriptions', {
              method: 'POST',
              headers: { Authorization: `Bearer ${apiKey}` },
              body: formData,
            })

            if (!upstream.ok) {
              const errText = await upstream.text()
              throw new Error(`OpenAI error ${upstream.status}: ${errText}`)
            }

            const result = await upstream.json() as { text: string }
            jsonRes(res, 200, { text: result.text })
          } catch (err) {
            console.error('[/api/transcribe]', err)
            jsonRes(res, 500, { error: String(err) })
          }
        })

        // ── /api/submit ──────────────────────────────────────────────
        server.middlewares.use('/api/submit', async (req: IncomingMessage, res: ServerResponse) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end()
            return
          }

          try {
            const rawBody = await readBody(req)
            const { name, email, idea, reality } = JSON.parse(rawBody.toString('utf8')) as {
              name: string
              email: string
              idea: string
              reality: string
            }

            const realityLabels: Record<string, string> = {
              yes_scoping: 'YES — expert scoping and a working build in 2 weeks',
              no_platform: 'NO — building a massive platform',
              no_cheaper: 'NO — looking for the cheapest option',
            }
            const realityLabel = realityLabels[reality] ?? reality

            const subject = encodeURIComponent(`[LAUNCHPAL]: ${name}`)
            const body = encodeURIComponent(
              `Name: ${name}\nEmail: ${email}\n\nThe Idea:\n${idea}\n\nReality Check:\n${realityLabel}`
            )

            // Log for dev; in production wire up your email service of choice.
            console.log(`\n── [LAUNCHPAL INTAKE] ──────────────────────`)
            console.log(`Subject : [LAUNCHPAL]: ${name}`)
            console.log(`To      : go@100k31d.co`)
            console.log(`From    : ${email}`)
            console.log(`\nIdea:\n${idea}`)
            console.log(`\nReality: ${realityLabel}`)
            console.log(`────────────────────────────────────────────\n`)

            // Fallback: open a mailto link (works only from browser context,
            // not from the server — this is a reference for the client if needed)
            const _mailtoHref = `mailto:go@100k31d.co?subject=${subject}&body=${body}`
            void _mailtoHref

            jsonRes(res, 200, { ok: true })
          } catch (err) {
            console.error('[/api/submit]', err)
            jsonRes(res, 500, { error: String(err) })
          }
        })
      },
    },
  ],
})
