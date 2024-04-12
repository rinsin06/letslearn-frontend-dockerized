import React,{useEffect,useState} from 'react'
import './Trending.css'
import { useSelector } from 'react-redux';

function TrendingCourse(props) {

  return (
    <div

    style={{backgroundImage:`url(${props.data ? props.data.coverImage : '/expandsbanner.png'})`}}
    className='banner'>

<div className='content'>
              
                <div className='banner-buttons'>
                    <button className='button'>Info</button>
                    <button className='button'>Add to Watchlist</button>
                </div>
             
                
            </div>
    </div>
  )
}

export default TrendingCourse;
