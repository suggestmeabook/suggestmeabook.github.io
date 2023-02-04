import './App.css';
import React, {  useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import '@fontsource/roboto/400.css';

import HomePage from './HomePage'
import About from './About'

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#000000',
    },
  },
})


function App() {
  const [isHome, setIsHome] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Container sx={{ flexGrow: 1}} />
          <Button 
            style={{color:"#ffffff", fontFamily: "Roboto"}} 
            onClick={() => {
              setIsHome(true);
            }} 
            variant="text">
            HOME
          </Button>
          <Button 
            style={{color:"#ffffff", fontFamily: "Roboto"}} 
            onClick={() => {
              setIsHome(false);
            }} 
            variant="text">
            ABOUT
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
    {isHome ? <HomePage /> : <About />}
    </ThemeProvider>
  );
}

export default App;
