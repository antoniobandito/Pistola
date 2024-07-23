import React from 'react'
import '/Users/casha/Desktop/pistola/pistola/client/src/styles/Home.css'
import Navigation from '../layout/Navigation'
import { Link } from 'react-router-dom'


const Home: React.FC = () => {
  return (
    <div className='home'>
        <h1 className='home-title'>PISTOLA</h1>
        <video className='desperado-video' autoPlay loop muted>
            <source src='/videos/pistola-loading-screen.mp4'
            type='video/mp4' />
        </video>
    
    <div className='home-quote'>
        <p>guns don't kill people I do</p>
    </div>
    
    <div className='home-enter'>
        <Link to='/shop' className='enter-link'>enter</Link>
    </div>
    </div>
  )
}

export default Home