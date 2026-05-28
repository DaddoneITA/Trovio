import { decrypt } from './crypto'

type Provider = 'openai' | 'anthropic' | 'gemini'

const TEMPLATES = [
  (service: string, title: string) =>
    `Hey! I noticed your post about "${title}" — I specialize in ${service} and have helped several clients with similar projects. I'd love to learn more about what you're looking for. Feel free to DM me and we can discuss the details!`,
  (service: string, title: string) =>
    `Hi there! Your project caught my eye. I'm a freelance ${service} professional with experience in exactly this kind of work. I'd be happy to share some relevant examples from my portfolio. Drop me a DM if you'd like to chat!`,
  (service: string, title: string) =>
    `This sounds like a great project! I've been doing ${service} for several years and have worked on similar requests to "${title}". I'd love to understand your requirements better and see if I'm a good fit. Send me a DM anytime!`,
  (service: string, title: string) =>
    `Hey! I came across your post and it aligns perfectly with my ${service} expertise. I've delivered similar work for clients in your space and would love to help. Feel free to reach out via DM — happy to share my portfolio!`,
  (service: string, title: string) =>
    `Hi! I specialize in ${service} and your post really resonated with me. I've tackled projects like "${title}" before and consistently delivered great results. Would love to discuss further — DM me whenever you're ready!`,
]

function randomTemplate(service: string, postTitle: string): string {
  const idx = Math.floor(Math.random() * TEMPLATES.length)
  return TEMPLATES[idx](service, postTitle)
}

function buildPrompt(service: string, postTitle: string, postBody: string): string {
  return `Write a 3-4 sentence Reddit reply from a freelancer offering "${service}" services.
Post title: "${postTitle}"
Post context: "${postBody?.substring(0, 300)}"
Requirements: specific to their need, mention relevant experience briefly, invite DM, no generic phrases, professional but friendly. English only. Do not use quotation marks around the entire message.`
}

async function callAnthropic(apiKey: string, service: string, postTitle: string, postBody: string): Promise<string | null> {
  try {
    const { default: Anthropic } = await import('@anthropic-ai/sdk')
    const client = new Anthropic({ apiKey })
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      messages: [{ role: 'user', content: buildPrompt(service, postTitle, postBody) }],
    })
    const text = msg.content.find((b) => b.type === 'text')
    return text?.type === 'text' ? text.text : null
  } catch (e) {
    console.error('Anthropic error:', e)
    return null
  }
}

async function callOpenAI(apiKey: string, service: string, postTitle: string, postBody: string): Promise<string | null> {
  try {
    const { default: OpenAI } = await import('openai')
    const client = new OpenAI({ apiKey })
    const res = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 300,
      messages: [{ role: 'user', content: buildPrompt(service, postTitle, postBody) }],
    })
    return res.choices[0]?.message?.content?.replace(/^["']|["']$/g, '').trim() || null
  } catch (e) {
    console.error('OpenAI error:', e)
    return null
  }
}

async function callGemini(apiKey: string, service: string, postTitle: string, postBody: string): Promise<string | null> {
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const result = await model.generateContent(buildPrompt(service, postTitle, postBody))
    const text = result.response.text()
    return text?.replace(/^["']|["']$/g, '').trim() || null
  } catch (e) {
    console.error('Gemini error:', e)
    return null
  }
}

export async function generateMessage(
  service: string,
  postTitle: string,
  postBody: string,
  credentials?: { provider: Provider; apiKey: string }[]
): Promise<string> {
  const selectedProvider = credentials?.find((c) => c.apiKey)

  if (selectedProvider) {
    let result: string | null = null
    const key = decrypt(selectedProvider.apiKey)
    switch (selectedProvider.provider) {
      case 'anthropic':
        result = await callAnthropic(key, service, postTitle, postBody)
        break
      case 'openai':
        result = await callOpenAI(key, service, postTitle, postBody)
        break
      case 'gemini':
        result = await callGemini(key, service, postTitle, postBody)
        break
    }
    if (result) return result
  }

  const envKey = process.env.ANTHROPIC_API_KEY
  if (envKey) {
    const result = await callAnthropic(envKey, service, postTitle, postBody)
    if (result) return result
  }

  return randomTemplate(service, postTitle)
}
