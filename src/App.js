import React from 'react';
import EditorDocs from './components/editor';
import Login from './components/login';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { SnackbarProvider } from 'notistack';



const theme = createTheme({
  palette: {
    primary: {
      main: '#000'
    },
    button: {
      main: '#eee'
    },
    secondary_button: {
      main: '#e0e0e0'
    }
  }
});


function App() {
  const [token, setToken] = React.useState("");
  const [userID, setUserId] = React.useState("");

  // Handle click logout
  const handleClick = () => {
    window.location.reload()
  };

  return (
    <>
    
      <ThemeProvider theme={theme}>
        <Box sx={{
            bgcolor: 'white',
            textAlign: "center",
            color: 'black',
            padding: '1em',
            marginBottom: '3em',
            borderBottom: "1px solid Black"
        }}  >
        <h1>jsramverk</h1>
        { token ? 
        <Button sx={{position: "absolute", right: '2em', top: '2.7em' }} color="inherit" onClick={handleClick}><LogoutIcon /></Button>
        : null }
        </Box>
        { token ? 
          <>
          <EditorDocs token={token} userID={userID}/>
          </>
          :
          <>
          <Login setToken={setToken} setUserId={setUserId}/>
          </>
        }
      </ThemeProvider>
    </>
  );
}


export default App;

