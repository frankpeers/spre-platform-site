import { Configuration, OpenAIApi } from 'openai';

export async function handler(event, context) {
  const body = JSON.parse(event.body || '{}');
  const messages = body.messages;
  const key = process.env.OPENAI_API_KEY;

  if (!key) {
    return { statusCode: 500, body: JSON.stringify({ error: 'OPENAI_API_KEY not set' }) };
  }

  if (!messages || !Array.isArray(messages)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid message payload' }) };
  }

  const config = new Configuration({ apiKey: key });
  const client = new OpenAIApi(config);

  try {
    const resp = await client.createChatCompletion({
      model: 'gpt-4',
      messages: messages,
    });
    const reply = resp.data.choices[0].message.content;
    return { statusCode: 200, body: JSON.stringify({ reply }) };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.response?.data?.error?.message || err.message }),
    };
  }
}
