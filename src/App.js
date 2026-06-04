import React from 'react';
import {useState,useEffect} from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null)
 
  useEffect( ()=> {
    const fetchMoviesHandler = async () => {
    setLoading(true);
    setError(null)
    try{

        const response = await fetch('https://swapi.info/api/films/');
        if(!response.ok){
          throw new Error('Something went wrong ....Retrying');
        }
        setTimeout(() => {
        setLoading(false);
        }, 5000);
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
    }catch(error){
      setError(error.message)
         setTimeout(() => {
          fetchMoviesHandler();
          console.log(1);
          }, 5000);
        console.log(error);
    }
    
  }
  fetchMoviesHandler();
  },[])

  
  

  const cancelHandler = () => {
    setError(null);
  }

  return (
    <React.Fragment>
      <section>
        <button >
          {loading ? 'Fetching...' : 'Fetched Movies'}
        </button>
      </section>
      <section>
        {loading && <OrbitProgress color="#ff2300" size="medium" text="" textColor="" />}
        {!loading &&  <MoviesList movies={movies} />}
        {!loading && error && (<><p>{error}</p><button onClick={cancelHandler}>Cancel</button></>)}
      </section>
    </React.Fragment>
  );
}

export default App;
