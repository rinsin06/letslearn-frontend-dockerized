import React,{useEffect,useState} from 'react'
import './Banner.css'
import{API_KEY,imageUrl} from '../../Constants/constants'
import axios from '../../axios'
import { trending } from '../../urls'
function Banner() {

    const [movie,setMovie] = useState()

       useEffect(()=>{
        axios.get(trending).then((response)=>{
        
            const randomIndex = Math.floor(Math.random() * response.data.results.length);
            const randomMovie = response.data.results[randomIndex];
        
            console.log(randomMovie);
        
            setMovie(randomMovie);
        
         } )

       },[])

  return (
    <div

    style={{backgroundImage:`url(/expandsbanner.png)`}}
    
    className='banner'>

        <div className='content'>
            <h1 className='title'></h1>
                <div className='banner-buttons'>
                    
                </div>
                <h1 className='description'></h1>
      
            
                
        </div>
    </div>
  )
}

export default Banner
