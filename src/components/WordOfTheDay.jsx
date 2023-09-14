import React from 'react'
import useSWR from "swr"

const fetcher = async () => {
  const apiKey = process.env.NEXT_PUBLIC_WORD_API_KEY
  const url = `http://api.wordnik.com:80/v4/words.json/wordOfTheDay?api_key=${apiKey}`
  
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  const result = await response.json()
  return result
}

const WordOfTheDay = () => {
    const { data, error } = useSWR("word-of-the-day", fetcher)

    if (error) {
        return <p>Error: {error.message}</p>
    }

    if (!data) {
        return <p>Loading word of the day...</p>
    }

    console.log(data)

    return (
        <div className="flex flex-col justify-center items-center text-center font-cabinSketch font-[400]">
            <h2 className="text-3xl mb-4">Word of the day:</h2> 
            <p className="text-xl sm:text-2xl w-full md:w-[500px]"><span className="font-[700] text-green-600 tracking-wide">{data.word}</span> - {data.definitions[0].text}</p> 
         </div>
    )
}

export default WordOfTheDay
