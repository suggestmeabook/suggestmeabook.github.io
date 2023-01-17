const { Configuration, OpenAIApi } = require("openai");
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try{
    const headers = 
    {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    };
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    var { id } = event.queryStringParameters;
    const moderator = await fetch("https://api.openai.com/v1/moderations", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
      input: id,
      }),
    }).then(res => {return res.json()});
    if (moderator["results"][0]["flagged"]) {
      return {
        statusCode: 200,
        body: JSON.stringify({ response: "This violates ChatGPT policy :(" }),
    }
    }
    if (id.split(" ").length === 1) {id = "Suggest some great books on "+id+" please. "};
    const prompt = createBookPrompt(id);
    const responseText = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\nHuman:"],
    }).then(data => { return data.data["choices"][0]["text"] });
    return {
        statusCode: 200,
        body: JSON.stringify({ response: responseText }),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 404,
        body: JSON.stringify({ response: "Connection error. Please try again later." }),
    };
  }
};

function createBookPrompt(inputText) {
  return `You are an AI that suggests books. Suggest 6 books using the format: <number>. "<title>" by <author>: <short description>. \nHuman: ${inputText}\\nAI:`;
}
