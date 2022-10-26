import * as React from 'react';
import { Button, Dialog ,DialogContent, TextField, Box, Typography } from '@mui/material';
import dateFormat from "dateformat";
import docsModel from '../models/docs';
import SendIcon from '@mui/icons-material/Send';


export default function AddComments({comment, user, setShowUser, index, docID}) {
    const [comfrase, setComFrase] = React.useState({});
    const [open, setOpen] = React.useState(false);

    // Handle commentsection open
    const handleClickOpen = () => {
      setOpen(true);
    };

    // Handle commentsection close
    const handleClose = () => {
      setOpen(false);
    };

    // Handle new comment
    const changeHandler = (event) => {
      setComFrase(event.target.value)
      setShowUser(true);
    };

    // Handle addbutton
  async function handleUpdate() { 
    const obj = {
      _id: (docID[index]["_id"]),
      frase: comment,
      comment: comfrase,
      owner: user,
      time: dateFormat()
    };

    await docsModel.updateDocComment(obj);
    setShowUser(false);
    setOpen(false);
  };

    return (
          <Box>
           <div>
           <Button 
              color="button"
              variant="contained"
              disabled={(index===null) }
              onClick={handleClickOpen} 
              >Kommentera... 
            </Button>
     <Dialog
       open={open}
       onClose={handleClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
     >
       <DialogContent sx={{ textAlign: "center", padding: "2em 3em" }}>
         <Typography variant="body2" sx={{ marginBottom: "1em", fontWeight: "bold" }}>
            Kommentera: "{comment}"
         </Typography>
         <TextField
            placeholder='Skriv kommentar...'
            onChange={changeHandler}
            sx={{ width: '20em' }}
          />
             <Button 
                color="button"
                variant="contained"
                sx={{ 
                  margin: "0.2em 0em 0.2em 1em",
                  padding: '1em'
                }}
                onClick={handleUpdate} 
                ><SendIcon sx={{ 
                  fontSize: "medium"
                }} />
              </Button>
       </DialogContent>
     </Dialog>

     </div>
     </Box>

    );
}