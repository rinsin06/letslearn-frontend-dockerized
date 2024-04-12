import React, { useEffect, useState } from 'react'
import './UserCourseViewBanner.css'
import { API_KEY, imageUrl } from '../../Constants/constants'
import axios from '../../axios'
import { trending } from '../../urls'
import { useContext } from 'react'
import { AuthContext } from '../../Context/Context'
import { loginUser } from '../../AuthService'
import { Breadcrumbs, Chip, Container, Rating, Stack, Typography } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language';
import UpdateIcon from '@mui/icons-material/Update';
import Dashboard from '@mui/icons-material/Dashboard'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

function UserCourseViewBanner() {

    const { viewCourse,viewLessons } = useContext(AuthContext);

    useEffect(() => {
        console.log(viewCourse);
    }, [])

    const creationDate = viewCourse.creationDate;
const dateObject = new Date(creationDate);

const year = dateObject.getFullYear();
const month = dateObject.getMonth() + 1; // Adding 1 because getMonth() returns a zero-based index
const day = dateObject.getDate();



    return (
        <div

            style={{ backgroundColor: 'black' }}

            className='banner'>

            <div className='content'>
                <Container>
                <Breadcrumbs sx={{ color:'#c0c4fc' }} separator={<NavigateNextIcon fontSize="large" />} aria-label="breadcrumb">

<Chip fontSize="large" sx={{ color:'#c0c4fc',fontSize:'large' }} onClick={() =>{} } label={viewCourse.category} />


<Chip  sx={{ color:'#c0c4fc',fontSize:'large' }} label={viewCourse.subcategory} />

</Breadcrumbs>
                    <Stack spacing={2}>


                       <Typography variant='h3' sx={{fontWeight:"bold"}}>{viewCourse.title}</Typography>

                        <Typography sx={{paddingTop:'4px'}}>{viewCourse.description}</Typography>
                        <div style={{  maxHeight: 50, overflowY: 'auto',color:'white'}} >
                        <Rating name="read-only" sx={{ paddingTop: '0' }} value={4} readOnly />(12,701) ratings 12,701 students
                        </div>
                        
                        <Typography>Created by:{viewCourse.authorName}</Typography>

                        <Typography>
                        <UpdateIcon/> Last updated {year}/{month}/{day}   <LanguageIcon />  English
                        </Typography>
                    </Stack>
                </Container>



            </div>
        </div>
    )
}

export default UserCourseViewBanner;