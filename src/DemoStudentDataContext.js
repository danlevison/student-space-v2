import React, { createContext, useState } from "react"
import studentData from "./studentData"

const DemoStudentDataContext = createContext()

export function DemoStudentDataProvider({children}) {
    const [demoStudentData, setDemoStudentData] = useState(studentData)
    const [classname, setClassname] = useState("")
    const [userUid, setUserUid] = useState("")
    
    return (
        <DemoStudentDataContext.Provider value={{ demoStudentData, setDemoStudentData, classname, setClassname, userUid, setUserUid }}>
            {children}
        </DemoStudentDataContext.Provider>
    )
}

export default DemoStudentDataContext