import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite'

const App = () => {
  

  const [searchTerm, setsearchTerm] = useState('')
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('')

  const [trendingMovies, settrendingMovies] = useState([])

  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [errorMassesge, seterrorMassesge] = useState('')

  const [movieList, setMovieList] = useState([])
  const [isLoading, setisLoading] = useState(false)
  
  const API_OPTIONS = {
    method: 'GET',
    headers:{
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

useDebounce(()=>setDebounceSearchTerm(searchTerm),
1000,[searchTerm])

 



  const fetchMovies = async (query = '') =>{
    try{
      setisLoading(true)
      seterrorMassesge('')

      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok){
        throw new Error('Failed to fetch data')
      }
     
      const data = await response.json();


      if(data.Response=='false'){
        seterrorMassesge(data.Error || 'Failed to fetch data')
        setMovieList([])
        return;

      }

      setMovieList(data.results || [])

      if(query && data.results.length > 0){
        
        await updateSearchCount(query, data.results[0])
      }


    } catch(error){
      console.log(`Error fetching movies: ${error}`)
      seterrorMassesge('Error fetching movies. Please try again later.')
    } finally{
      setisLoading(false)
    }

  }


  const loadTrendingMovies = async()=>{
    try{

      const movies = await getTrendingMovies();

      settrendingMovies(movies)

    }catch(error){
      console.log(error)
    }
  }



  useEffect(() => {
    fetchMovies(debounceSearchTerm);
    }, [debounceSearchTerm])


  useEffect(()=>{
    loadTrendingMovies()

  },[])
  
  return (
    <>
      <div className='bg-hero-pattern w-screen h-screen bg-center bg-cover absolute z-0'/>
      <div className='px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10 items-center '>
        <header className=''> 
          <img src="src/assets/Movieposter.png" className='w-[500px] h-[600px] object-center' alt="Poster" />
          <h1 className='text-3xl font-bold text-white'>Find <span className='bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] bg-clip-text text-transparent'> Movies </span>You'll Enjoy Without Hassle.</h1> 

          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>

          </header>

          {trendingMovies.length>0 && (
            <section className='mt-20'>
              <h2 className='text-white'>Trending Movies</h2>
              <ul className='flex flex-row overflow-y-auto gap-5 -mt-10 w-full hide-scrollbar'>
                {trendingMovies.map((movie, index)=>(
                  <li key={movie.$id} className='min-w-[230px] flex flex-row items-center'>
                    <p className='fancy-text mt-[22px] text-nowrap'>
                      {index+1}
                    </p>
                    <img className='w-[127px] h-[163px] rounded-lg object-cover -ml-3.5' src={movie.posterURL} alt={movie.title} />

                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className='space-y-9 '>
            <h2 className='text-2xl text-white'>All Movies</h2>
           
           {isLoading? ( <Spinner/>) : errorMassesge? (<p className='text-red-400'> {errorMassesge} </p> ) : (<ul className='grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'> 
            {movieList.map((movie)=>(
              <MovieCard key={movie.id} movie={movie}/>
            ))}
           </ul>)}

          </section>
      </div>

    
     
    </>
  )
}

export default App