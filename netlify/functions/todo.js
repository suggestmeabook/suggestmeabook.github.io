const fetch = require('node-fetch')

exports.handler = async function (event, context) {
  try{
    const { id } = event.queryStringParameters;
    const prompt = createBookPrompt(id);
    responseText = await fetch("https://api.openai.com/v1/completions", {
        body: "{\"model\":\"davinci:ft-personal:suggestmeabook-v0-2023-01-13-12-26-27\", \"prompt\":\""+prompt+"\", \"max_tokens\": 150,\"temperature\": 0.5, \"stop\":\"\\nHuman\", \"best_of\":5}",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: process.env.OPENAI_API_KEY
        },
        method: "POST"
    })
    .then(response => response.json())
    .then(data => {return data["choices"][0]["text"]})
    return {
        statusCode: 200,
        body: JSON.stringify({ response: responseText }),
    }
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};

function createBookPrompt(inputText) {
  return `The following is a conversation with an AI assistant that suggests books. The assistant is very friendly and must ALWAYS follow the following rules: (1) Always suggest 3 books, (2) Always organize books in a numbered list, (3) Never reply with another question, (4) Always put book titles between double quotes and (5) Always write the book's author.\\n\\nHuman: Hello, who are you?\\nAI: I am an AI that suggests books. How can I help you today?\\nHuman: ${inputText}\\nAI:`;
}
