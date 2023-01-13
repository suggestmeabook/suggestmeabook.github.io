import './App.css';
import TextField from '@mui/material/TextField';
import React, {  useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#b5533f',
    },
    secondary: {
      main: '#f50057',
    },
  },
})


function App() {
  const [response, setResponse] = useState("");
  const [textValue, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <h1>
    SuggestABook.app</h1>
    <p style={{marginTop: "10px"}} >
    We use prompt engineering to get an awesome list of titles suggested by ChatGPT.</p>
      <TextField 
        id="outlined-basic" 
                  label="What kind of book are you looking for?" 
        style={{width: "80%",marginTop: "30px"}} 
        variant="outlined" 
        multiline
        rows={2}
                  onChange={(event) => { setText(event.target.value)}}
        InputProps={{endAdornment: <IconButton aria-label="get" onClick={() => {
          async function fetchTodo() {
            const url = `/.netlify/functions/todo?id=${textValue}`;
            try {
              setLoading(true);
              const todo = await fetch(url).then((res) => res.json());
              setResponse(extractBulletPoints(todo.response));
            } catch (err) {
              console.log(err);
            } finally {
              setLoading(false);
            }
          }
          fetchTodo();
        }}>
        <SendIcon />
      </IconButton>}}
        />
              <div style={{ textAlign: "left", maxWidth: "80%", margin: "auto", marginTop: "30px" }}> {loading ? <p>Loading...</p> : response}</div>
      <header className="App-header">
      </header>
    </div>
    </ThemeProvider>
  );
}

function getEl(obj, ind){return (<li>{obj.replace(".", "")}</li>)}

function extractBulletPoints(textInput){
  var splitted = textInput.split(/\s[0-9]\.\s/)
  var chunks = splitted.splice(1,3).map((obj, ind) =>getEl(obj, ind));
  return <><p>{splitted[0]}</p><ol>
      {chunks}
  </ol></>
}

export default App;
