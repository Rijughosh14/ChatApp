import React from 'react'
import {Input} from "@material-tailwind/react"

function SearchBar({callback}) {

  const handleChange=(e)=>{
    callback(e.target.value)
  }
  return (
    <>
      <div className='w-72 bg-gray-200 h-auto border rounded mx-auto my-3' >
        <Input size="md" color='teal' placeholder='Search or Start a new chat' onChange={(e)=>handleChange(e)}/>
      </div>
    </>
  )
}

export default SearchBar