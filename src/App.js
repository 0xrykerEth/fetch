import React from 'react';
import {useState,useEffect} from 'react';
import { OrbitProgress } from 'react-loading-indicators';
import MoviesList from './components/MoviesList';
import Form from './components/Form';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null)

   const fetchMoviesHandler = async () => {
    setLoading(true);
    setError(null)
    try{

        const response = await fetch('https://react-https-b20a5-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',{
          method : 'GET',
        });
        if(!response.ok){
          throw new Error('Something went wrong ....Retrying');
        }
        setTimeout(() => {
        setLoading(false);
        }, 5000);
        const data = await response.json();
        console.log(data)
        const loadedMovies = [];

        for(const key in data){
          loadedMovies.push({
            id : key,
            title : data[key].title,
            director : data[key].director,
            releaseDate : data[key].date
          });
        }
    setMovies(loadedMovies);
    
    }catch(error){
      setError(error.message)
         setTimeout(() => {
          setLoading(false)
          console.log(1);
          }, 1000);
        console.log(error);
    }
    
  }
 
  useEffect( ()=> {
  fetchMoviesHandler();
  },[])


 async function movieHandler(item){
   const response = await fetch('https://react-https-b20a5-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',{
      method : 'POST',
      body : JSON.stringify(item),
      headers : {
        'Content-type' : 'application/json'
      }
    })

    const data = response.json();
    fetchMoviesHandler();
    console.log(data)
    console.log(item);
  }
  

 

  return (
    <React.Fragment>
      <Form onAddMovie={movieHandler}/>
      <section>
        <h1 >
          {loading ? 'Fetching...' : 'Fetched Movies'}
        </h1>
      </section>
      <section>
        {loading && <OrbitProgress color="#ff2300" size="medium" text="GOY RAUL" textColor="" />}
        {!loading &&  <MoviesList movies={movies} />}
        {!loading && error && (<><p>{error}</p><button>Cancel</button></>)}
      </section>
    </React.Fragment>
  );
}

export default App;
