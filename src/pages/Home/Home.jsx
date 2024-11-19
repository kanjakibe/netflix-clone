import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';


const Home = () => {
  const [apiData, setapiData] =useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_FIREBASE_BEARER_TOKEN,
    }
  };

  const randomMovie =
  apiData.length > 0
    ? apiData[Math.floor(Math.random() * apiData.length)]
    : null;

  // Get the image URL and title from the random movie
  const randomImage = randomMovie ? `https://image.tmdb.org/t/p/w1280${randomMovie.backdrop_path}` : '';

  const randomOverview = randomMovie ? randomMovie.overview : '';
  const shortOverview = randomOverview
    ? randomOverview.split(' ').slice(0, 50).join(' ') + (randomOverview.split(' ').length > 100 ? '...' : '')
    : '';

  const randomTitle = randomMovie ? randomMovie.original_title : '';
  const randomId = randomMovie ? randomMovie.id : '';

  useEffect(() => {
    // From Movie API 
    fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setapiData(res.results))
    .catch(err => console.error(err));

    // cardsRef.current.addEventListener('wheel', handleWheel);
  }, [])

  return (
    <div className='home'>
        <Navbar />
        <div className="hero">
          {/* <img src={hero_banner} alt="" className='banner-img' /> */}
          {randomImage && (
          <img src={randomImage} alt="Random Movie Banner" className="banner-img" />
        )}

          <div className="hero-caption">
            {/* <img src={hero_title} alt="" className='caption-img' /> */}
            <h1>{randomTitle}</h1>
            <p>{shortOverview}</p>
            <div className="hero-btns">
              
              <Link to={`/player/${randomId}`} className="card">
                <button className='btn'><img src={play_icon} alt="" />Play</button>
              </Link> 
              
              <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
            </div>
            <TitleCards />
          </div>
        </div>
        <div className="more-cards">
          <TitleCards title={"Blockbuster Movie"} category={"top_rated"} />
          <TitleCards title={"Only on Netflix"} category={"popular"} />
          <TitleCards title={"Upcoming"} category={"upcoming"} />
          <TitleCards title={"Top picks for you"} category={"now_playing"} />
        </div>
        <Footer />
    </div>
  )
}

export default Home