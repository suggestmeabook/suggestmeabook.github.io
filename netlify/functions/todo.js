const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function (event, context) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  try{
    var { id } = event.queryStringParameters;
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
      body: err.toString(),
    };
  }
};

function createBookPrompt(inputText) {
  return `You are an AI that suggests books. Suggest 3 books using the format: <number>. "<title>" by <author>: <short description>.\n\nHuman: ${inputText}\nAI:`;
}
