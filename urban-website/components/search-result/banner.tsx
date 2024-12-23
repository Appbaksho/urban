import React from 'react'

interface SeachResultProps{
    query: string
}

const SearchResultBanner = (props:SeachResultProps) => {
  return (
    <div>
        <p className='font-medium text-lg'>Search Result For: <span className='font-bold'>{props.query}</span></p>
    </div>
  )
}

export default SearchResultBanner