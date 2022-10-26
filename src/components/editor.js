import * as React from "react";
import "trix";
import "trix/dist/trix.css";
import './../App.css';
import { TrixEditor } from "react-trix";
import { Button, Box, TextField, Card, Typography, Grid } from '@mui/material';
import docsModel from '../models/docs';
import docsColor from '../models/colors';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Users from "./users";
import MailOwners from "./mailInvite";
import PdfComponent from "./pdffile";
import ReactHtmlParser from 'react-html-parser'; 
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Comments from "./comments";
import AddComments from "./addComments";
import CommentIcon from '@mui/icons-material/Comment';

let sendToSocket = false;
let theIndex = null;
let index = null;


function changeSendToSocket(value) {
  sendToSocket = value;
}

function docsIndex(value) {
  theIndex = value;
}

function createIndex(value) {
  index = value;
}


const EditorDocs = (token) => {
  const element = document.querySelector("trix-editor");
  const [allDocs, setAllDocs] = React.useState(null);
  const [saveEdit, setSaveEdit] = React.useState('');
  const [headName, setHeadName] = React.useState('');
  const [socket, setSocket] = React.useState(null);
  const [amount, setAmount] = React.useState({});
  const [showUser, setShowUser] = React.useState(false);
  const [owners, setOwners] = React.useState('');
  const [ownersName, setOwnersName] = React.useState([]);
  const buttonSection = React.useRef(null);
  const [comment, setComment] = React.useState("");
  

  // Marked string in editor
  const handleMouseUp = () => {
    console.log(`Selected text: ${window.getSelection().toString()}`);
    setComment(window.getSelection().toString())
  }


  // Open/Close comments
  function OpenCloseComments() {
    var x = document.getElementById("myDIV");

    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block"; 
    }
  }


  // Scrolldown function
  const scrollDown = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth',
    });
  };


  // Update editor
  const updateEditor = (x) => {
    element.editor.setSelectedRange([0, 10000])
    element.editor.deleteInDirection("backwards")
    element.editor.insertHTML(x)

  };


  // Fetch docs from database 
  async function fetchDocs() {
    const docs = await docsModel.getDocById(token.token, token.userID);

    setAllDocs(docs)
  };
  
  // Handle click after save document
  const handleClick = () => {
    setShowUser(true);

    const newObject = {
      namn: headName,
      text: saveEdit,
      owner: token.userID,
      allowed_users: ownersName
    };
    saveObject(newObject)
  };

  // Save document to database
  async function saveObject(x) {
    await docsModel.saveDoc(x);
    
    setHeadName('');
    updateEditor('');
    setShowUser(false);
    setOwners('');
  };

  // Handle when change in editor
  const handleChange = (editor, text) => {
    setShowUser(true);

    setAmount({ "index": index,
            "data": editor });
    setSaveEdit(editor);

  };
  
  // Handle editor when clicked document
  const handleEditorReady = (event) => {

    if (element!=null) {
      createIndex(event.target.value);
      docsIndex(event.target.value);

      updateEditor(allDocs[event.target.value]['text'])
      setHeadName(allDocs[event.target.value]['namn'])
      setOwners(allDocs[event.target.value]['allowed_users'])
    } 

  };

  // Handle "rubrik"
  const handleTextInputChange = (event) => {
    setHeadName(event.target.value);
  };

  // Handle updatebutton
  async function handleUpdate() { 

      const obj = {
        _id: (allDocs[index]["_id"]),
        namn: headName,
        text: saveEdit,
        allowed_users: ownersName
      };
      await docsModel.updateDoc(obj);

      setHeadName('');
      updateEditor('');
      setShowUser(false);
      setOwners('');
      createIndex(null);

    };

  // Handle closebutton
  async function handleClose() { 
    setHeadName('');
    updateEditor('');
    setShowUser(false);
    setOwners('');
    createIndex(null);
  };

  
  useEffect(() => {
      if (socket && sendToSocket) {
        console.log("saveEdit skicka över sock")
        socket.emit("amount", amount)
      }
      changeSendToSocket(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveEdit]);


  useEffect(() => {
    (async () => {
      console.log("fetching all")
      await fetchDocs();
      }
    )();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showUser]);


  useEffect(() => {
    setSocket(io(docsModel.baseUrl));
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (socket) {
      socket.on("amount", function (data) {
        if (theIndex===data['index']) {
          updateEditor(data['data']);
        }
        changeSendToSocket(false);
      })
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  

  return (
    <>
      <Box sx={{ textAlign: "center", width: '70%', margin: '0 auto'}} >
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
          {allDocs?.map((planet, index) => 
          <Grid item xs={2} sm={4} md={4} key={index} sx={{ margin: "0 auto" }}>
            <Card sx={{ padding: "2em" }}>
              <Typography gutterBottom variant="h5" component="div">
                {planet.namn}
              </Typography>
              <Typography component="div" sx={{ height: '3em', overflow: 'hidden' }} variant="body2" color="text.secondary">
                { ReactHtmlParser (planet.text) }
              </Typography>
              <Button 
                className="btn-grad" 
                value={index} 
                variant='contained' 
                sx={{ margin: '1em', backgroundImage: docsColor.getColor(index) }} 
                onClick={(event) => { 
                  scrollDown(buttonSection); 
                  handleEditorReady(event); 
                }}>Välj dokument
              </Button>
            </Card>
          </Grid>
          )}
        </Grid>
      </Box>
      
      <Box sx={{
        bgcolor: 'white ',
        margin: '2rem 0',
        padding: '2em 5%',
       }} >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "100%" }}> 
            <Box sx={{ display: "flex", justifyContent: "space-between"}}> 
              <TextField
                  label="Rubrik"
                  value={headName}
                  onChange={handleTextInputChange}
                  sx={{ margin: '1rem 0' }}
                />
              <Button 
                color="button"
                variant="contained"
                sx={{ 
                  height: "20%",
                }}
                onClick={OpenCloseComments} 
                ><CommentIcon sx={{ 
                  fontSize: "medium"
                }} />
              </Button>
            </Box>
            <div onMouseUp={handleMouseUp}>
              <TrixEditor 
                className="trix-texteditor"
                placeholder="Skapa ett nytt dokument"
                onChange={handleChange}
                onEditorReady={handleEditorReady}
              />
            </div>
            <br/>
            <Box sx={{ display: "flex", justifyContent: "space-between"}} 
                ref={buttonSection}
                > 
              <Users setOwnersName={setOwnersName} owners={owners} />
              <AddComments comment={comment} user={(token.userID)} setShowUser={setShowUser} index={index} docID={allDocs} />
            </Box>
            <br/>
          </Box>
            <Comments comments={ (index) ? (allDocs[index]['comments']) : null} />
        </Box>
        <Box sx={{ marginTop: "4em", display: "flex", justifyContent: "space-between" }}>
          <Button 
            color="button"
            variant="contained"
            disabled={ (headName==='') || (index!==null) }
            sx={{ 
              marginRight: '1em'
            }}
            startIcon={<AddIcon />}
            onClick={handleClick} 
            >Skapa nytt
          </Button>
          <Box>
            <Button 
              color="button"
              variant="contained"
              startIcon={<SaveAltIcon />}
              disabled={(index===null) || (headName==='') || (saveEdit==='') } 
              onClick={handleUpdate} 
              >Spara
            </Button>
            <PdfComponent text={saveEdit} header={headName} owner={owners} />
            <MailOwners index={index} header={headName} docId={allDocs} />
            <Button 
              sx={{ backgroundImage: 'linear-gradient(to right, #485563 0%, #29323c  51%, #485563  100%)' }}
              variant="contained"
              startIcon={<CloseIcon />}
              disabled={ (saveEdit==='') && (headName==='') } 
              onClick={handleClose} 
              >Avbryt
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default EditorDocs;


         

