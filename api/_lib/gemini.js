const { GoogleGenerativeAI } = require('@google/generative-ai');

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
}

async function generateText({ system, prompt, model = 'gemini-1.5-flash' }) {
  const client = getGeminiClient();
  if (!client) {
    const err = new Error('Gemini not configured');
    err.code = 'NO_GEMINI_KEY';
    throw err;
  }

  const m = client.getGenerativeModel({ model, systemInstruction: system });
  const result = await m.generateContent(prompt);
  const text = result && result.response ? result.response.text() : '';
  return String(text || '').trim();
}

module.exports = { generateText };
