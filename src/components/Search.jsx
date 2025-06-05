import React from 'react'

const Search = ({searchTerm, setsearchTerm}) => {
  return (
    <div className='w-full bg-light-100/5 px-4 py-3 rounded-lg mt-10 max-w-3xl mx-auto relative flex items-center'>
  
  <img
    className='mr-10 h-5 w-5'
    src="src/assets/search.png"
    alt="search"
  />


  <input
    type="text"
    className='w-full bg-transparent py-2 pl-12 pr-4 text-base text-gray-200 placeholder-light-200 border border-[#522e92] focus:outline-none rounded-lg'
    placeholder='Search through thousands of movies.'
    value={searchTerm}
    onChange={(e) => setsearchTerm(e.target.value)}
  />
</div>

  )
}

export default Search