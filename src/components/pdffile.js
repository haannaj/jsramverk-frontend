import * as React from "react";
import { Button } from '@mui/material';


export default function PdfComponent({text, header, owner}) {
  console.log(text)

  function printDiv() {
    var left = (window.screen.width/2);
    var top = (window.screen.height/2);

    var width = window.screen.width * 0.5
    var height = window.screen.height * 0.8

    var a = window.open('', '', `height=${height}, width=${width}, top=${top-(height/2)} left=${left-(width/2)}]`);
    a.document.write(`<body style="text-align: center">`);
    a.document.write(`<h2> ${header} </h2>`);
    a.document.write(`<h5><i> Ägare: ${owner} </i></h5>`);
    a.document.write(`<div> ${text} </div>`);
    a.document.write(`</body>`);
    a.print();
    a.close();
  }

  return (
    <>
    <Button 
    color="button"
    sx={{ marginLeft: "1em" }}
    className="btn-grad" 
    variant="contained"
    disabled={(text==='')} 
    onClick={printDiv} 
      >Spara som PDF
    </Button>
    </>
  )
}
