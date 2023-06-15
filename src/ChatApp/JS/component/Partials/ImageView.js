import React from 'react'

const ImageView = ({link,callback}) => {

  function verify(){
    callback()
  }
  return (
    <div className='relative'>
      <div className='absolute top-0 right-0 h-20 w-8 '>
        <button onClick={()=>verify()}>
          X
        </button>
      </div>
    <div className='my-12 mx-12 hover:cursor-pointer' onClick={()=>verify()}>
    <img src={link} alt=""/>
    </div>
    </div>
    
  )
}

export default ImageView