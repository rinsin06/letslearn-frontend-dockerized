import React, { useEffect, useState } from 'react'
import './UserLearningsBanner.css'
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

function UserLearnigsBanner() {

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

            className='bannerLearning'>

            <div className='contentLearning'>
                <Container>

   <Typography variant='h3' sx={{fontWeight:"bold",fontFamily: "serif"}}>My Learnings</Typography>

                </Container>



            </div>
        </div>
    )
}

export default UserLearnigsBanner;