import * as React from 'react';
import { Box, Typography } from '@mui/material';


export default function Comments({ comments }) {

    // If comments empty 
    ((comments == null) || (Object.keys(comments).length == 0))  ? 
    comments = []
    : comments = comments;

    return (
          <Box id="myDIV" sx={{ background: "#fff", marginLeft: "1em", width: "27em", display: "none" }}>
            <Typography gutterBottom variant="button" sx={{ margin: "0 1em"  }}  >
              Kommentarer
            </Typography>
            <Box sx={{ height: "25em", overflow: "auto" }} >
            { (comments.length == 0) ? 
              <Box sx={{  margin: "1em" }}>
                <Typography variant="caption" sx={{ fontStyle: "italic" }} >
                  Finns inga kommentarer.
                </Typography>
              </Box>
            : null }
            {comments?.map((com, index) => 
              <Box sx={{  margin: "1em", marginRight: "0.2em", position: "relative" }}>
               <Card sx={{ padding: "1em", background: "#f6f6f6", }}>
               <Typography variant="caption" sx={{ fontStyle: "italic", color: "#6b6b6b", fontSize:"10px" }} >
                  {com.owner} {com.time}
                </Typography>
               <Typography variant="caption" display="block" sx={{ background: "#f6f6f6",fontWeight: "bold" }} >
                 "{com.frase}"
                </Typography>
                <Typography variant="body2" display="block" gutterBottom>
                  {com.comment}
                </Typography>
              </Card>
              </Box>
              )} 
          </Box>
      </Box>
    );
}
