import React, { createContext, useState } from "react"
import studentData from "./studentData"

const DemoStudentDataContext = createContext()

export function DemoStudentDataProvider({children}) {
    const [demoStudentData, setDemoStudentData] = useState(studentData)
    
    return (
        <DemoStudentDataContext.Provider value={{ demoStudentData, setDemoStudentData }}>
            {children}
        </DemoStudentDataContext.Provider>
    )
}

export default DemoStudentDataContext