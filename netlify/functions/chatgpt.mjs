import { ChatGPTAPIBrowser } from 'chatgpt'

exports.handler = async function (event, context) {
    try{
      const { id } = event.queryStringParameters;
      const api = new ChatGPTAPIBrowser({
        email: process.env.OPENAI_EMAIL,
        password: process.env.OPENAI_PASSWORD
      })
    
      await api.initSession()
    
      const result = await api.sendMessage('Hello World!')
      console.log(result.response);
      return {
          statusCode: 200,
          body: JSON.stringify({ title: result.response }),
      }
    } catch (err) {
      return {
        statusCode: 404,
        body: err.toString(),
      };
    }
  };