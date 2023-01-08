import './App.css';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import getResponse from './utils/getResponse';
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
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <h1>
    SuggestABook.app</h1>
    <p>
    We use prompt engineering to get an awesome list of titles suggested by ChatGPT.</p>
      <TextField 
        id="outlined-basic" 
        label="What did you like?" 
        style={{width: "80%"}} 
        variant="outlined" 
        multiline
        rows={2}
                  onChange={(event) => { setText(event.target.value)}}
        InputProps={{endAdornment: <IconButton aria-label="delete" onClick={() => {
          getResponse(setResponse, textValue);
        }}>
        <SendIcon />
      </IconButton>}}
        />
      <p>
        {response}
      </p>
      <header className="App-header">
      </header>
    </div>
    </ThemeProvider>
  );
}

export default App;
