import React, {useState, useEffect, useContext} from 'react'
import StudentDataContext from "@/StudentDataContext"

const Greeting = () => {
    const { userUid, userClassName } = useContext(StudentDataContext)
    const [greeting, setGreeting] = useState("")
    const currentTime = new Date().getHours()

    useEffect(() => {
        if (currentTime < 12) {
            // if in users class include classname in greeting
           userUid && userClassName ? setGreeting(`Good Morning, ${userClassName}!`) : setGreeting("Good Morning!")
        } else {
            // if in users class include classname in greeting
            userUid && userClassName ? setGreeting(`Good Afternoon, ${userClassName}!`) : setGreeting("Good Afternoon!")
        }
    }, [])
    
  return (
    <h1 className="text-3xl md:text-4xl lg:text-6xl text-center">{greeting}</h1>
  )
}

export default Greeting