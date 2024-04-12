import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/Context';
import { useEffect } from 'react';

export default function AccordionUsage(props) {

    const {lessonslisting} = useContext(AuthContext);

    useEffect(()=>{

        console.log(lessonslisting);
    },[])


  return (
    <div>

{lessonslisting.map((lesson, index) => (
    <Accordion key={index}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
        >
            {lesson.title}
        </AccordionSummary>
        <AccordionDetails>
          Description: {lesson.description}
          Video:{lesson.videoUrl}

        </AccordionDetails>
        <AccordionDetails>
          
          Video:{lesson.videoUrl}
          
        </AccordionDetails>
    </Accordion>
))}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Accordion 2
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Accordion Actions
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion> */}
    </div>
  );
}