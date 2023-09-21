"use client"

import React, { createContext, useState, useEffect } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "@/utils/firebase"
import { useParams } from 'next/navigation'
import demoStudentData from "../demoStudentData"

const StudentDataContext = createContext()

export function StudentDataProvider({children}) {
    const [studentData, setStudentData] = useState(demoStudentData)
    const [userClassName, setUserClassName] = useState("")
    const [showConfetti, setShowConfetti] = useState(false)
    const [user, loading] = useAuthState(auth)
    const [userUid, setUserUid] = useState("")
    const params = useParams()

    useEffect(() => {
        // Check if the user object is available and has a UID
        if (user && user.uid) {
            setUserUid(user.uid)
        }
    }, [user])

    return (
        <StudentDataContext.Provider value={{ studentData, setStudentData, userClassName, setUserClassName, userUid, params, showConfetti, setShowConfetti }}>
            {children}
        </StudentDataContext.Provider>
    )
}

export default StudentDataContext