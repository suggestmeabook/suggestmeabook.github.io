async function getResponse(setResponse, inputText) {
    fetch("https://api.openai.com/v1/completions", {
        body: "{\"model\":\"davinci\", \"prompt\":\""+inputText+"\", \"max_tokens\": 150,\"temperature\": 0.5, \"stop\":\"\\nHuman\", \"best_of\":5}",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer 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"
        },
        method: "POST"
      })
    .then(response => response.json())
    .then(data => setResponse(data["choices"][0]["text"]))
  }

  export default getResponse;