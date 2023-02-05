import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './App.css';

import logo from './assets/SuggestABook.png';

function About(){

    const italicStyles = {
        fontStyle: 'italic',
    };

    return (

        <div className="App">
            <Box
                component="img"
                sx={{
                marginTop: "100px",
                maxHeight: { xs: 80, md: 161 },
                maxWidth: { xs: 200, md: 400 },
                }}
                alt="SugestABookLogo."
                src={logo}
            />
            <Box sx={{backgroundColor: '#F0F0F0',
                      width:  {xs:"75%", md: "50%", xl:"50%"},
                      padding: '20px',
                      margin: 'auto',
                      marginTop: '30px',
                      textAlign: 'left',
                      borderRadius: '25px'}}>
                <Typography fontFamily={"Roboto"} variant="h5" fontWeight='bold' component="div" style={{marginLeft: "20px"}}>
                    About
                </Typography>
                <p style={{marginLeft: "20px"}}>
                    We use GPT-3.5 text generation model to create personalized book suggestions. To get a list of recommendations, just enter your prompt (e.g. <span style={italicStyles}>“suggest me a sci-fi book with AI characters”</span>).
                </p>
                <p style={{marginLeft: "20px"}}>
                    The website is inspired by the subreddit <a href="https://www.reddit.com/r/suggestmeabook" style={{ color: "#FF3232" }} rel="noreferrer" target="_blank">r/suggestmeabook</a>.
                </p>
            </Box>
        </div>
    )
}

export default About