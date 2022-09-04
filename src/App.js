import * as React from "react";
import "trix/dist/trix";
import "trix/dist/trix.css";
import { TrixEditor } from "react-trix";
import {Button, Box} from '@mui/material';



export default function App() {
  const [saveEdit, setSaveEdit] = React.useState('');


  const handleClick = () => {
    console.log(saveEdit)
  };
  
  const handleChange = (html, text) => {
    setSaveEdit(text);
  };

  return (
    <>
    <Box sx={{
          bgcolor: '#003163',
          textAlign: 'center',
          color: 'white',
          padding: '1em',
          boxShadow: '2px 1px 10px #003372'
       }}  >
      <h1>jsramverk</h1>
      </Box>
    <Box sx={{
          margin: '2rem'
       }}  >
      <Button variant='contained' sx={{ margin: '1em 0' }} onClick={handleClick}>Save</Button>
      <TrixEditor 
      id="trixEditor"
      placeholder="Enter text to editor"
      onChange={handleChange} />
      </Box>

    </>

  );
}