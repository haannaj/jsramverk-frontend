import * as React from "react";
import "trix";
import "trix/dist/trix.css";

import { TrixEditor } from "react-trix";
import { Button, Box, FormControl, Select, MenuItem, InputLabel, TextField } from '@mui/material';
import docsModel from '../models/docs';
import { useEffect } from 'react';
import { Divider } from '@mui/material';
import { io } from "socket.io-client";

let sendToSocket = false;
let theIndex = null;


function changeSendToSocket(value) {
  sendToSocket = value;
}

function docsIndex(value) {
  theIndex = value;
}

const EditorDocs = () => {
  const [allDocs, setAllDocs] = React.useState(null);
  const [saveEdit, setSaveEdit] = React.useState('');
  const [index, setIndex] = React.useState('');
  const [headName, setHeadName] = React.useState('');
  const [socket, setSocket] = React.useState(null);
  const [amount, setAmount] = React.useState({});


  const element = document.querySelector("trix-editor");
  let str = 'Skapa ett nytt dokument';

  async function fetchDocs() {
    
    const docs = await docsModel.getAllDoc();

    setAllDocs(docs)

  };
  
  const handleClick = (event) => {

    const newObject = {
      namn: headName,
      text: saveEdit
    };
  
    saveObject(newObject)
  };
  

  async function saveObject(x) {
    await docsModel.saveDoc(x);
  };


  const handleChange = (editor, text) => {

    setAmount({ "index": index,
            "data": text });

    setSaveEdit(text);

    if (index==='') {
      changeSendToSocket(false); 
    }
  };
  
  const handleEditorReady = (editor) => {

    if (element!=null) {
      element.editor.setSelectedRange([0, 10000])
      element.editor.deleteInDirection("backwards")
      element.editor.insertString(allDocs[index]['text'])
      setHeadName(allDocs[index]['namn'])
    } 

  };

  const handleChangeDrop = (event) => {
    setIndex(event.target.value);
    docsIndex(event.target.value);

  };

  const handleTextInputChange = (event) => {
    setHeadName(event.target.value);
  };

  async function handleUpdate() { 
    const obj = {
      _id: (allDocs[index]["_id"]),
      namn: headName,
      text: saveEdit
    };

    await docsModel.updateDoc(obj);
  };

  
  useEffect(() => {
      if (socket && sendToSocket) {
        console.log("saveEdit skicka över sock")
        socket.emit("amount", amount)

      }
      changeSendToSocket(true);
    
  }, [saveEdit]);


  useEffect(() => {
    (async () => {
      await fetchDocs();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {

    setSocket(io(docsModel.baseUrl));

    return () => {
      if (socket) {
        socket.disconnect();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {

    if (socket) {
      socket.on("amount", function (data) {

        if (theIndex===data['index']) {
            element.editor.setSelectedRange([0, 10000])
            element.editor.deleteInDirection("backwards")
            element.editor.insertString(`${data['data']}`);
        }

        changeSendToSocket(false);
        
      })
    };
    
  }, [socket]);

  

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
          margin: '2rem',
          padding: '0 15%'
       }}  >
        <FormControl fullWidth>
          <InputLabel aria-labelledby="demo-simple-select" >Välj dokument att updatera</InputLabel>
          
            <Select
                labelId="demo-simple-select"
                id="demo-simple-select"
                value={index}
                label="Välj dokument att updatera"
                onChange={handleChangeDrop}
                
              >
                {allDocs?.map((planet, index) => 
                  <MenuItem value={index}>
                    {planet.namn}
                  </MenuItem>
                )}

            </Select>
      </FormControl>
      <Button variant='contained' sx={{ margin: '1em 1em 1em 0'  }}  onClick={handleEditorReady} >Välj</Button>
      <Divider/>
      <br/>
      <TextField
            label="Rubrik"
            value={headName}
            onChange={handleTextInputChange}
        />
      <br/>
      <br/>
      <TrixEditor 
        className="trix-texteditor"
        placeholder={str}
        onChange={handleChange}
        onEditorReady={handleEditorReady}
      />
      <br/>
      <Button disabled={(headName==='') || (typeof(index)==="number")} id="create" variant='contained' sx={{ margin: '1em 1em 1em 0'  }} onClick={handleClick}>Skapa nytt dokument</Button>
      <Button disabled={(typeof(index)==="string")} variant='contained' onClick={handleUpdate}>Updatera valt dokument</Button>
      </Box>
      
    </>
    
  );
}

export default EditorDocs;

