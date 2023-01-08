import logo from './logo.svg';
import './App.css';
import ProminentAppBar from './utils/appBar';
import * as React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  status: {
    danger: orange[500],
  },
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
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <h1>SuggestABook.app</h1>
      <header className="App-header">
      </header>
    </div>
    </ThemeProvider>
  );
}

export default App;
