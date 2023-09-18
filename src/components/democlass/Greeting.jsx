import React, { useState, useEffect, useContext } from 'react'
import StudentDataContext from "@/StudentDataContext"
import { auth, db } from '../../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getDocs, collection } from 'firebase/firestore'

const Greeting = () => {
    const [user, loading] = useAuthState(auth)
    const { params } = useContext(StudentDataContext)
    const [greeting, setGreeting] = useState("")
    const currentTime = new Date().getHours()
    const [classData, setClassData] = useState([])

    const fetchClassName = async () => {
        const userClassesRef = collection(db, "users", user.uid, "classes")
        const querySnapshot = await getDocs(userClassesRef)
        const data = []

        querySnapshot.forEach((doc) => {
          // Assuming userClassName is a field in the classId document
          const classId = doc.id
          const className = doc.data().className

          // Store classId and userClassName as an object
          data.push({ classId, className })
        })

        setClassData(data)
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchClassName()
        }

        fetchData()
    }, [])

    useEffect(() => {
        // Check if classData has been populated
        if (classData.length > 0) {
            // Find the user's current class
            const currentUserClass = classData.find((classItem) => classItem.classId === params.id)

            if (currentUserClass) {
                // Set the greeting based on the className of the user's current class
                if (currentTime < 12) {
                    setGreeting(`Good Morning, ${currentUserClass.className}!`)
                } else {
                    setGreeting(`Good Afternoon, ${currentUserClass.className}!`)
                }
            } else {
                setGreeting(`Good ${currentTime < 12 ? 'Morning' : 'Afternoon'}!`)
            }
        }
    }, [classData, currentTime])

    return (
        <h1 className="text-5xl sm:text-6xl md:text-7xl text-center font-cabinSketch font-[700]">{greeting}</h1>
    )
}

export default Greeting
