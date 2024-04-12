import React, { useState, useEffect, useContext } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../Constants/constants'
import Youtube from 'react-youtube'
import RowPostPopUp from './RowPostPopUp.js'
import { AppContext } from '../../AppContext.js'
import { Button, Card, CardContent, CardMedia, Fab, Popover, Popper, Typography } from '@mui/material'
import { useRef } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MouseOverPopover from '../CoursePopeover/CoursePopeover.js'
import InfoIcon from '@mui/icons-material/Info'; // Assuming you have an InfoIcon component
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../Context/Context.js'
import { getLessons } from '../../AdminService.js'


function RowPost(props) {


  const [movies, setMovies] = useState([])

  const [anchorEl, setAnchorEl] = useState(null);
  const popoverRef = useRef(null); // Ref for the popover element

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    setMovies(props.data)

  })

  const opts = {
    height: '300',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const containerRef = useRef(null);

  const scroll = (scrollOffset) => {
    containerRef.current.scrollLeft += scrollOffset;
  };


  const options = {
    modifiers: [
     
      {
        name: 'preventOverflow',
        options: {
          boundariesElement: window, // Prevent popover from overflowing viewport
        },
      },
      {
        name: 'arrow',
        options: {
          element: popoverRef.current, // Reference the popover element for arrow positioning
        },
      },
    ],
  };

  const popoverContent = (
    <div className="popover-content">
      <Typography variant="body2">{props.course?.description || 'No description available'}</Typography>
      <div className="button-container">
        <Button variant="contained" size="small">
          {/* Button 1 Text */}
          Watch Now
        </Button>
        <Button variant="outlined" size="small">
          {/* Button 2 Text */}
          Learn More
        </Button>
      </div>
    </div>
  );

  const {viewLessons ,viewCourse, setViewCourse,setViewLessons } = useContext(AuthContext);

  const history = useHistory();

  const handleViewCourse = async (item)=>{

    const lessonsResponse = await getLessons(item.courseId);

    setViewLessons(lessonsResponse.data);


 setViewCourse({
     courseId:item.courseId,
     title: item.title,
     description: item.description,
     category: item.category.name,
    subcategory: item.subcategory.name,
     price: item.price,
     duration: item.duration,
    imageUrl: item.coverImage,
    authorName: item.authorName,
    creationDate: item.creationDate
   });
console.log(viewCourse);

history.push('/user-courseView')

 }
  return (
    <div className='rowPost'  ref={popoverRef} >
      <h1 >{props.title}</h1>

      <div className='posters'>



        {movies ? movies.map((item =>

          <div>


            <div  onClick={() => {
                                handleViewCourse(item);
                                
                               

                                //  console.log(viewCourse);
                               
                            }} className='smallposter'>


              <Card  onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} sx={{height:300, width: 275, marginBottom: 4 }} elevation={3}>
                <CardMedia

                  component="img"
                  alt="green iguana"
                  height="140"
                  image={item.coverImage}
                />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </CardContent>
                
              
              </Card>
              
            </div>
           

            </div>
            )
            ) : <h1>Not found!!</h1>


        
        }

          </div>

    </div>
      )
}

export default React.forwardRef((props, ref) => <RowPost {...props} forwardedRef={ref} />);
