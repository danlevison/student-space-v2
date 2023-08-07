"use client"

import React, { createContext, useState } from "react"
import demoStudentData from "./demoStudentData"

const StudentDataContext = createContext()

export function StudentDataProvider({children}) {
    const [studentData, setStudentData] = useState(demoStudentData)
    const [userClassName, setUserClassName] = useState("")
    const [userUid, setUserUid] = useState("")
    
    return (
        <StudentDataContext.Provider value={{ studentData, setStudentData, userClassName, setUserClassName, userUid, setUserUid }}>
            {children}
        </StudentDataContext.Provider>
    )
}

export default StudentDataContext