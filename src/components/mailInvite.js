import * as React from 'react';
import { FormControl, Button, Dialog, DialogContent, DialogTitle, Link, TextField, Box, Typography, Alert  } from '@mui/material';
import mailModel from '../models/mail';
import docsColor from '../models/colors';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';


export default function MailOwners({index, header, docId}) {
    const [sendEmail, setSendEmail] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState(false);


    // handle open maildialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // handle close maildialog
    const handleClose = () => {
        setOpen(false);
        setStatus(false);
    };

    // handle submit mail
    async function handleSubmit() {
        const res = await mailModel.sendAccessMail(sendEmail, docId[index])

        if (res[0] === 200 && res[1] === 200 ) {
            setStatus(true)
        } else {
            setStatus(false)
        }
    }

    // handle change input
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
            >Bjud in
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description" >
        <DialogContent >
            <Box sx={{ textAlign: "center", padding: '0.5em 4em' }} >
                {(status === true) ?
                    <Alert severity="success" sx={{ fontWeight: "bold" }}>Email har skickats!</Alert> : null }
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

