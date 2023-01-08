const fetch = require('node-fetch')

exports.handler = async function (event, context) {
  try{
    const { id } = event.queryStringParameters;
    responseText = await fetch("https://api.openai.com/v1/completions", {
        body: "{\"model\":\"davinci\", \"prompt\":\""+id+"\", \"max_tokens\": 150,\"temperature\": 0.5, \"stop\":\"\\nHuman\", \"best_of\":5}",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_OPENAI_API_KEY
        },
        method: "POST"
    })
    .then(response => response.json())
    .then(data => {return data["choices"][0]["text"]})
    return {
        statusCode: 200,
        body: JSON.stringify({ title: responseText }),
    }
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
