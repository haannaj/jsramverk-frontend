import * as React from 'react';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { InputLabel, MenuItem, FormControl, Select, OutlinedInput, Button, Dialog ,DialogContent, DialogTitle,  Link, TextField, Box, Typography  } from '@mui/material';
import authModel from '../models/auth';
import mailModel from '../models/mail';

import docsColor from '../models/colors';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';


export default function MailOwners({setOwnersName, owner, index, header, docId}) {
    const [sendEmail, setSendEmail] = React.useState(false);
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handleSubmit() {
        await mailModel.sendAccessMail(sendEmail, docId[index])
        handleClose()
    }

    const handleTextInputChange = (event) => {
        setSendEmail(event.target.value);
    };


  return (
    <>
        <Button
            color="button"
            variant="contained"
            disabled={(header==='')}
            sx={{ 
            marginRight: '1em'
            }}
            startIcon={<ForwardToInboxIcon />}
            onClick={handleClickOpen}
            >Bjud in användare
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description" >
        <DialogContent sx={{ border: '1px solid black', borderRadius: "4px", padding: '1em'}}>
            <Box sx={{ textAlign: "center", padding: '2em 7em' }} >
                <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
                {header}
                </DialogTitle>
                <Typography >
                    Skicka mailinbjudan för att redigera dokumentet
                </Typography>
                <FormControl sx={{ width: 300 }}>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        onChange={handleTextInputChange}
                        sx={{ width: '100%', margin: "1em 0"}}
                    />
                    <Button 
                        className="btn-grad" 
                        variant="contained"
                        sx={{ margin: '2em', backgroundImage: docsColor.getColor(2)}}
                        onClick={handleSubmit} 
                        startIcon={<ForwardToInboxIcon />}
                        >Skicka inbjudan
                    </Button>
                </FormControl>
            </Box>
            <Link
                component="button"
                variant="body2"
                onClick={handleClose}
                >
                Avbryt
            </Link>
        </DialogContent>
      </Dialog>

    </>
  );
}

