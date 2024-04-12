import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';

export default function MouseOverPopover(props) {

    
   

  const open = Boolean(props.anchorEl);

  return (
    <div>
      <Popover
      elevation={4}
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={props.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
       
        disableRestoreFocus
      >
        <Card  sx={{ width: 275, marginBottom: 4 }} elevation={3}>
        <Typography >Yes, you're correct. I apologize for the oversight. Upon reviewing the code again, it seems very similar to what you provided earlier. It appears that you're already passing the anchor prop to the MouseOverPopover component in the UserCourseList component, and the MouseOverPopover component is correctly using this prop to control the popover's open state based on mouse events.

If you're encountering any issues with this implementation or if there's a specific aspect you'd like to modify or improve, please let me know, and I'll be happy to assist further!


</Typography>

        </Card>
       

      </Popover>
    </div>
  );
}
