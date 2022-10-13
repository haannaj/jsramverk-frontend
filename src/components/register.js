import * as React from 'react';
import { Button, Dialog, DialogActions,DialogContent, DialogContentText, DialogTitle,  Link, TextField, Box } from '@mui/material';
import docsColor from '../models/colors';
import authModel from "../models/auth";


export default function Register({setToken, setUserId}) {
    const [user, setUser] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const changeHandler = (event) => {
        let newObject = {}

        newObject[event.target.name] = event.target.value;

        setUser({...user, ...newObject});
    };

    async function handleRegister() {
        await authModel.register(user);
        const loginResult = await authModel.login(user);

        if (loginResult.data.token) {
            setToken(loginResult.data.token);
            setUserId(loginResult.data.email);
        }
      };
  

    return (
        <div>
            <Link
                component="button"
                variant="body2"
                onClick={handleClickOpen}
                >
                Saknar du konto? Registrera dig här
            </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        
        <DialogContent sx={{ border: '1px solid black', borderRadius: "4px" }}>
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold", textAlign: "center" }}>
          {"Registrera med email och lösenord"}
        </DialogTitle>
        <Box sx={{ textAlign: "center", padding: '2em 4em' }} >
            <TextField
                label="Email"
                name="email"
                onChange={changeHandler}
                sx={{ width: '100%'}}
            />
            <TextField
                label="Lösenord"
                type="password"
                name="password"
                onChange={changeHandler}
                sx={{ width: '100%', margin: "1em 0"}}
            />
            <br/>
            <Button 
                className="btn-grad" 
                variant="contained"
                sx={{ margin: '2em', backgroundImage: docsColor.getColor(1)}}
                onClick={handleRegister} 
                >Registrera användare
            </Button>
            <br/>
        </Box>
        <Link
                component="button"
                variant="body2"
                onClick={handleClose}
                >
                Avbryt registrering
            </Link>
        </DialogContent>

      </Dialog>

      </div>
    );
}