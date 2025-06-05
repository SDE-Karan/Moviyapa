import React from 'react'

const MovieCard = ({movie: {title, vote_average, poster_path, release_date, original_language }}) => {
  return (
    <div className='bg-[#260c41b0] p-5 rounded-2xl shadow-inner shadow-light-100/20'>
        <img className='rounded-lg h-auto w-full' src={poster_path? `https://image.tmdb.org/t/p/w300/${poster_path}`: 'src/assets/No Movie.png'} alt="{title}" />

        <div className='mt-4'>
            <h3 className='text-white text-xl font-medium line-clamp-1'>{title}</h3>
            <div className='mt-2 flex flex-row items-center flex-wrap gap-2'>
                <div className='flex flex-row items-center gap-1'>
                    <img className='w-4 h-4' src="src/assets/star.png" alt="star-icon" />
                    <p>{vote_average? vote_average.toFixed(1):'N/A'}</p>

                    <span> • </span>

                    <p className='capitalize text-gray-100 font-medium text-base'> {original_language? original_language : 'N/A'}</p>
                    
                    <span> • </span>
                    <p className='text-gray-100 font-medium text-base'> 
                        {release_date? release_date.split('-')[0] : 'N/A'}
                    </p>

                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieCard