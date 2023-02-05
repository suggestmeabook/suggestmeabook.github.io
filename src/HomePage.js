import './App.css';
import TextField from '@mui/material/TextField';
import React, {  useState, useEffect } from "react";
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import stringSimilarity from "string-similarity";
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import '@fontsource/roboto/400.css';

import logo from './assets/SuggestABook.png';

function HomePage() {
  const [response, setResponse] = useState("");
  const [textValue, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="App" style={{fontFamily: "Roboto"}}>
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
    <p style={{marginTop: "10px"}} >
    Use AI to get a list of book recommendations</p>
      <TextField 
        id="outlined-basic" 
                  label="What kind of book are you looking for?" 
        sx={{width: {xs:"80%", md: "50%", xl:"30%"},
        marginTop: "30px",
      borderRadius: "5%",
      boxShadow: 3}}
      inputProps={{maxlength: 150}}
        variant="outlined"
        rows={2}
                  onChange={(event) => { setText(event.target.value)}}
        InputProps={{endAdornment: <IconButton aria-label="get" onClick={() => {
          async function fetchTodo() {
            const url = `/.netlify/functions/todo?id=${textValue}`;
            try {
              setLoading(true);
              const todo = await fetch(url).then((res) => res.json());
              setResponse(todo.response);
            } catch (err) {
              console.log(err);
              setResponse("An error occurred, please retry again later.");
            } finally {
              setLoading(false);
            }
          }
          fetchTodo();
        }}>
        <SendIcon />
      </IconButton>}}
        />
              <div style={{ textAlign: "left", maxWidth: "80%", margin: "auto", marginTop: "30px" }}> {loading ? <p>Loading...</p> : extractBulletPoints(response)}</div>
      <header className="App-header">
      </header>
      {response === "" ?
      <Box sx={{backgroundColor: '#F0F0F0',
      width:  {xs:"80%", md: "50%", xl:"30%"},
      padding: '20px',
      margin: 'auto',
      marginTop: '30px',
      textAlign: 'left',
      borderRadius: '25px'}}>
        <Typography fontFamily={"Roboto"} variant="h4" fontWeight='bold' component="div" style={{marginLeft: "20px"}}>
          Examples
        </Typography>
          <ul style={{ textAlign: "left" }}>
            <li key="ex1">Suggest me a book full of plot twists</li>
            <li key="ex2">Books about starting a business</li>
            <li key="ex3">What are some sci-fi books with complex AI characters?</li>
          </ul>
      </Box> : <div style={{ maxWidth: "80%", margin: "auto", marginTop: "30px" }}><GetBookFromDb formattedTitleAuthorsList={extractFormattedTitleAuthors(response)} /></div>}
    </div>
  );
}

function extractFormattedTitleAuthors(query){

  var formattedTitleAuthorsList = []

  try{
    const titles = query.split("\"").filter(function(element, index, array) {
      return (index % 2 === 1);
    });

    const other = query.split("\"").filter(function(element, index, array) {
      return (index % 2 === 0);
    });

    for(const [index, element] of  titles.entries()){
      if(index === 6) {
        break;
      }
      try{
        formattedTitleAuthorsList.push(element+"-"+other[index+1].split(":")[0].replace(" by ", ""))
      } catch (error) {console.log("Title missing")}
    }
  } catch (error) {console.log(error)}


  return formattedTitleAuthorsList
  
}

function ShowResult(props){
    if (props.valueList === [] || props.valueList === undefined) {
      return <p></p>
  }
  
  var matches = stringSimilarity.findBestMatch(props.titleCode, props.valueList);
  var result = props.booksDb[matches.bestMatch.target]

  console.log("Rebuild")

  if(matches.bestMatch.rating < 0.4){
    return <>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.book.split("-")[1]}
      </Typography>
      <Typography variant="h5" component="div">
        {props.book.split("-")[0]}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Book not found
      </Typography>
    </CardContent></>
  }

  return <>
  <CardContent key={props.book}>
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {matches.bestMatch.target.split("-")[1]}
    </Typography>
    <Typography variant="h5" component="div">
      {matches.bestMatch.target.split("-")[0]}
    </Typography>
    <CardMedia
      component="img"
      height="300"
      src={result.image_url}
      alt="Book cover"
    />
    <Typography sx={{ mb: 1.5 }} color="text.secondary">
      {result.format}
    </Typography>
    <Typography variant="body2">
      {result.price}
    </Typography>
  </CardContent>
  {result.asin !== "" ? 
    <CardActions>
      <Button size="small" target="_blank" href={"http://www.amazon.it/dp/"+result.asin+"/ref=nosim?tag=suggestmeab00-20"}>Buy on Amazon</Button>
    </CardActions> : <p></p>}</>
}

function GetBookFromDb(props){
  const [booksDb, setBooksDb] = useState({});

  useEffect(() => {
    const loadData = async () => {
      var data = await import('./assets/data/amazon/books_dic.json')
      setBooksDb({ data })
    }

    loadData();
  }, [props.formattedTitleAuthorsList])

  if (props.formattedTitleAuthorsList === [] || props.formattedTitleAuthorsList === undefined) {
    return <p></p>
  }

    if (props.formattedTitleAuthorsList.length === 1) {
      return <p></p>
    }

  return (booksDb === {} || Object.keys(booksDb).length === 0) ? <p></p> : 

  <><h2>Some books that you may find interesting:</h2>
   <Grid container spacing={1}>
    {props.formattedTitleAuthorsList.map(book => (
      <Grid item xs={12} md={4} key={book}>
        <Card sx={{ maxWidth: 275 }} key={book}>
          <ShowResult titleCode={book} valueList={Object.keys(booksDb.data)} booksDb={booksDb.data} book={book}/>
      </Card>
    </Grid>))}
    </Grid></>
          

}

function getEl(obj, ind){return (<li key={obj}>{obj.replace(".", "")}</li>)}


function extractBulletPoints(textInput){
  try{
    if(textInput === ''){
      return "An error occured :( \n Please try again later."
    }
    const removeWrongOutput = textInput.split(" Human: ")[0]; 
    var splitted = removeWrongOutput.split(/\s[0-9]\.\s/)
    var chunks = splitted.splice(1,6).map((obj, ind) =>getEl(obj, ind));
    return <><p>{splitted[0]}</p><ul>
        {chunks}
    </ul></>
  } catch (error) {
    console.log(error)
    return <p>{textInput}</p>
  }
}

export default HomePage;
