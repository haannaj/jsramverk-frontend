import * as React from "react";
import { useRef } from "react";
import { Button, Typography, Box } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useReactToPrint } from "react-to-print";
var parse = require('html-react-parser');


export default function PdfComponent({text, header, owner}) {
  const componentRef = useRef();


  if (owner) {
    owner = owner.join(', ')
  }

  // handle printbutton
  function printDiv() {
    var x = document.getElementById("myPDF");
    x.style.display = "block"; 
    x.style.color = "black"; 

    handlePrint();
    x.style.display = "none"; 
  }

  // handle what to print
  const handlePrint = useReactToPrint({
    content:() => componentRef.current,
    documentTitle: header, 
    
  });

  return (
    <>
    <Button 
    color="button"
    sx={{ margin: "0 1em" }}
    className="btn-grad" 
    variant="contained"
    startIcon={ <PictureAsPdfIcon />}
    disabled={(text==='')} 
    onClick={printDiv} 
      >Spara som PDF
    </Button>
    <Box id="myPDF" ref={componentRef} sx={{ margin: "2em", color: "white", textAlign: "center", width: "100%", display: "none"}}>
      <Typography variant="body2">
        {header}
      </Typography>
      <Typography variant="caption">
        Ägare: {owner}
      </Typography>
      <Typography variant="caption">
        {parse(text)}
      </Typography>
    </Box>
    </>
  )
}
