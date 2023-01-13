import { ChatGPTAPIBrowser } from 'chatgpt'


exports.handler = async function (event, context) {
    try{
      console.log("ok")
      const { id } = event.queryStringParameters
      const email:string = process.env.OPENAI_EMAIL!
      const password:string = process.env.OPENAI_PASSWORD!
      const api = new ChatGPTAPIBrowser({
        email,
        password
      })
      await api.initSession()
    
      console.log("ok2")
    
      const result = await api.sendMessage('Hello World!')
      console.log("ok3")
      console.log(result.response);
      await api.closeSession()
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