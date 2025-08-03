
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message;

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are LYRA and ORION, the twin AI guardians of the SPRE Platform. Speak with clarity, precision, and guidance." },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7
    });

    const assistantReply = response.data.choices[0].message.content.trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: assistantReply })
    };
  } catch (err) {
    console.error("Error in /chat function:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "There was an internal error. LYRA & ORION could not respond." })
    };
  }
};
