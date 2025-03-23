import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBox from './search';
import TimerApp from './components/Timer/TimerApp';

const App = () => {
  const [movieData, setMovieData] = useState({
    movieID: '',
    original_title: '',
    tagline: '',
    overview: '',
    homepage: '',
    poster: '',
    production: [],
    production_countries: [],
    genre: [],
    release: '',
    vote: '',
    runtime: '',
    revenue: '',
    backdrop: '',
  });

  const fetchApi = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovieData({
        movieID: data.id,
        original_title: data.original_title,
        tagline: data.tagline,
        overview: data.overview,
        homepage: data.homepage,
        poster: data.poster_path,
        production: data.production_companies,
        production_countries: data.production_countries,
        genre: data.genres,
        release: data.release_date,
        vote: data.vote_average,
        runtime: data.runtime,
        revenue: data.revenue,
        backdrop: data.backdrop_path,
      });
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const fetchMovieID = (movieID) => {
    const url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`;
    fetchApi(url);
  };

  useEffect(() => {
    const initialMovieID = '550'; // Example movie ID (replace with your logic)
    const url = `https://api.themoviedb.org/3/movie/${initialMovieID}?&api_key=cfe422613b250f702980a3bbf9e90716`;
    fetchApi(url);
  }, []);

  return (
    <div>
      <SearchBox fetchMovieID={fetchMovieID} />
      {/* <Card data={movieData} /> */}
      <TimerApp></TimerApp>
    </div>
  );
};

export default App;



