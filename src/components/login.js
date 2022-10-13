import * as React from "react";
import { Button, Box, TextField } from '@mui/material';
import authModel from "../models/auth";
import docsColor from '../models/colors';
import Register from './register';



export default function Login({setToken, setUserId}) {
    const [user, setUser] = React.useState({});

    const changeHandler = (event) => {
        let newObject = {}

        newObject[event.target.name] = event.target.value;

        setUser({...user, ...newObject});
    };

    const handleRegister = () => {
        
    };

    async function handleLogin() {
        const loginResult = await authModel.login(user)

        if (loginResult.data.token) {
            setToken(loginResult.data.token);
            setUserId(loginResult.data.email);
        }
    };

    return (
        <Box sx={{ textAlign: "center", width: '60%', margin: '0 auto', bgcolor: "white", padding: '4em', border: '1px solid black'}} >
            <h3>Logga in eller registrera dig</h3>
            <TextField
                label="Email"
                name="email"
                onChange={changeHandler}
                sx={{ margin: '1em 0.5em' }}
            />
            <TextField
                label="Lösenord"
                name="password"
                type="password"
                onChange={changeHandler}
                sx={{ margin: '1em 0.5em' }}
            />
            <br/>
            <Button 
                className="btn-grad" 
                variant="contained"
                sx={{ width: "150px", margin: '2em', backgroundImage: docsColor.getColor(2)}}
                onClick={handleLogin} 
                >Logga in
            </Button>
            <br/>
            <Register setToken={setToken} setUserId={setUserId}/>
        </Box>
    );
}