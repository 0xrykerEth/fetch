import React from 'react';
import {useState} from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading,setLoading] = useState(false);
  
  const fetchMoviesHandler = async () => {
    setLoading(true);
    const response = await fetch('https://swapi.info/api/films/');
    const data = await response.json();
    const transformedMovies = data.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        director: movieData.director,
        releaseDate: movieData.release_date
      }
    })
    setMovies(transformedMovies);
    setLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Movies'}
        </button>
      </section>
      <section>
        {loading && <OrbitProgress color="#ff2300" size="medium" text="" textColor="" />}
        {!loading && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
