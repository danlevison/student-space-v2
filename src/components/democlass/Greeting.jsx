import React, {useState, useEffect, useContext} from 'react'
import DemoStudentDataContext from '../../DemoStudentDataContext'

const Greeting = () => {
    const { userUid, classname } = useContext(DemoStudentDataContext)
    const [greeting, setGreeting] = useState("")
    const currentTime = new Date().getHours()

    useEffect(() => {
        if (currentTime < 12) {
            // if in users class include classname in greeting
           userUid && classname ? setGreeting(`Good Morning, ${classname}!`) : setGreeting("Good Morning!")
        } else {
            // if in users class include classname in greeting
            userUid && classname ? setGreeting(`Good Afternoon, ${classname}!`) : setGreeting("Good Afternoon!")
        }
    }, [currentTime])
    
  return (
    <h1 className="text-3xl md:text-4xl lg:text-6xl text-center">{greeting}</h1>
  )
}

export default Greeting