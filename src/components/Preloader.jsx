import React from 'react'
import Image from "next/image"
import loader from "../../public/assets/loadingring.svg"

const Preloader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <Image src={loader} alt="/" width={150} height={150} />
        <p className="sr-only">
          Preloader by <a href="https://loading.io/" target="_blank" rel="noopener noreferrer">loading.io</a>
        </p>
      </div>
  )
}

export default Preloader