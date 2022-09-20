import * as React from "react";
import "trix/dist/trix";
import "trix/dist/trix.css";
import { TrixEditor } from "react-trix";
import {Button, Box, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import docsModel from '../models/docs';
import { useEffect, useState } from 'react';


const EditorDocs = () => {
  const [saveEdit, setSaveEdit] = useState('');
  const [allDocs, setAllDocs] = useState(null);
  const [index, setIndex] = useState('');
  const element = document.querySelector("trix-editor");
  let str = 'namn: Snusmumriken \n bor: Mumindalen';

  async function fetchDocs() {
    const docs = await docsModel.getAllDoc();
    setAllDocs(docs)
  };
  
  const handleClick = (event) => {
    const newObject = {};
    let newDoc = saveEdit.replace(/\r/g, "").split(/\n/);

    for (let i = 0; i < newDoc.length; i++) {
      let newKeys = newDoc[i].split(":");
      newObject[newKeys[0]] = newKeys[1]
    }
    saveObject(newObject)
  };
  
  async function saveObject(x) {
    await docsModel.saveDoc(x);
  };


  const handleChange = (editor, text) => {
    setSaveEdit(text);
  };
  
  
  const handleEditorReady = (editor) => {
    element.editor.setSelectedRange([0, 10000])
    element.editor.deleteInDirection("backwards")
    element.editor.insertString(`${(JSON.stringify(allDocs[index], null, 2))}`)
  };

  const handleEditorAll = (editor) => {
    element.editor.setSelectedRange([0, 10000])
    element.editor.deleteInDirection("backwards")
    element.editor.insertString(`${(JSON.stringify(allDocs, null, 2))}`)
  };


  const handleChangeDrop = (event) => {
    setIndex(event.target.value);
  };

  async function handleUpdate() {
    let obj = (saveEdit.replace(/\n/g, "")).replace(/\s/g,'');
    obj = JSON.parse(obj);
    
    await docsModel.updateDoc(obj);
  };
  

  useEffect(() => {
    (async () => {
      await fetchDocs();
    })();
  }, []);


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
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Välj dokument att updatera</InputLabel>
          
            <Select
                labelId="demo-simple-select-label"
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
      <Button variant='contained' sx={{ margin: '1em 0' }} onClick={handleEditorReady}>Välj</Button>
      
      
      <TrixEditor 
        placeholder={str}
        onChange={handleChange} 
        onEditorReady={handleEditorReady}
      />
      <br/>
      <Button variant='contained' sx={{ margin: '1em 0' }} onClick={handleClick}>Skapa nytt dokument</Button>
      <Button variant='contained' sx={{ margin: '1em' }} onClick={handleUpdate}>Updatera valt dokument</Button>
      <Button variant='contained' sx={{ margin: '1em 0' }} onClick={handleEditorAll}>Visa alla dokument</Button>
      </Box>
      
    </>
    
  );
}

export default EditorDocs;