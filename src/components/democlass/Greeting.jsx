import React, { useState, useEffect, useContext } from 'react'
import StudentDataContext from "@/StudentDataContext"
import { auth, db } from '../../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, getDoc } from 'firebase/firestore'

const Greeting = () => {
    const [user, loading] = useAuthState(auth)
    const { userUid, userClassName } = useContext(StudentDataContext)
    const [greeting, setGreeting] = useState("")
    const currentTime = new Date().getHours()
    const [dbClassName, setDbClassName] = useState("")

    const fetchClassName = async () => {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const data = docSnap.data()
            setDbClassName(data.className) // Fetch the existing classname value from Firestore
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchClassName()
        }

        fetchData()

        if (currentTime < 12) {
            userUid && userClassName ? setGreeting(`Good Morning, ${dbClassName}!`) : setGreeting("Good Morning!")
        } else {
            userUid && userClassName ? setGreeting(`Good Afternoon, ${dbClassName}!`) : setGreeting("Good Afternoon!")
        }
    }, [dbClassName])

    return (
        <h1 className="text-3xl md:text-4xl lg:text-6xl text-center">{greeting}</h1>
    )
}

export default Greeting
