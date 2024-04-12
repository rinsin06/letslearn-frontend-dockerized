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
import { useState } from 'react';
import YouTube from 'react-youtube';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function AccordionUsage(props) {

    const {lessonslisting,viewLessons} = useContext(AuthContext);

    const [lessons, setLessons] = useState(viewLessons.map(lesson => ({
      ...lesson,
      urlId: '', // Initialize urlId for each lesson
  })));

  const handleAccordionClick = (index, videoUrl) => {
    setLessons(prevLessons => {
        const updatedLessons = [...prevLessons];
        updatedLessons[index].urlId = videoUrl.split('/').pop().split('?')[0];;
        return updatedLessons;
    });
};

    const history = useHistory()


  

    useEffect(()=>{

        console.log();
    },[])

    const opts = {
      height: '300',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    
  

const[urlId,setUrlId] = useState('');

   
const videoId =  urlId.split('/').pop().split('?')[0];


  return (
    <div>

{lessons.map((lesson, index) => (

  
    <Accordion key={index}>
        <AccordionSummary
        onClick={()=>handleAccordionClick(index, lesson.videoUrl)}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
        >
          <Typography sx={{ fontWeight: "bold", fontFamily: "serif" }} >

          {lesson.title}
          </Typography>
           
           
        </AccordionSummary>
        <AccordionDetails>
        {lesson.urlId && <YouTube  origin="https://www.youtube.com"  videoId={lesson.urlId} opts={opts} />}

        <Typography sx={{ fontWeight: "bold", fontFamily: "serif" }} >
          Description: {lesson.description}
          </Typography>

        </AccordionDetails>
        <AccordionDetails>
          
        
          
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