import React from "react";
import Box from '@mui/material/Box';
import './App.css';

import logo from './assets/SuggestABook.png';

function About(){

    const styles = {
        backgroundColor: '#F0F0F0',
        width: '50%',
        padding: '20px',
        margin: 'auto',
        textAlign: 'left',
        borderRadius: '25px'
      };

    const italicStyles = {
        fontStyle: 'italic',
    };

    return (

        <div className="App">
            <Box
                component="img"
                sx={{
                marginTop: "20px",
                maxHeight: { xs: 80, md: 161 },
                maxWidth: { xs: 200, md: 400 },
                }}
                alt="SugestABookLogo."
                src={logo}
            />
            <div style={styles}>
            <h2>
                About
            </h2>
            <p>
                We use GPT-3.5 text generation model to create personalized book suggestions.
            </p>
            <p>
                To get a list of recommendations, just enter your prompt (e.g. <span style={italicStyles}>“suggest me a sci-fi book with AI characters”</span>).
            </p>
            <p>
                The website is inspired by the subreddit <a href="https://www.reddit.com/r/suggestmeabook" style={{ color: "#FF3232" }} rel="noreferrer" target="_blank">r/suggestmeabook</a>.
            </p>
            </div>
        </div>
    )
}

export default About