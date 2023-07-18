import React from 'react'
import Image from 'next/image'

const Scribble = ({ scribblesSvgs }) => {
  return (
    <>
      {scribblesSvgs.map((scribble, index) => (
        <Image
          key={index}
          src={scribble.src}
          alt={scribble.alt}
          className={scribble.className}
          width={40}
          height={40}
        />
      ))}
    </>
  )
}

export default Scribble