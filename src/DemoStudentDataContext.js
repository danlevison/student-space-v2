import React, { createContext, useState } from "react"
import studentData from "./studentData"
import tableData from "./TableData"

const DemoStudentDataContext = createContext()

export function DemoStudentDataProvider({children}) {
    const [demoStudentData, setDemoStudentData] = useState(studentData)
    const [demoTableData, setDemoTableData] = useState(tableData)
    const [classname, setClassname] = useState("")
    const [userUid, setUserUid] = useState("")
    
    return (
        <DemoStudentDataContext.Provider value={{ demoStudentData, setDemoStudentData, demoTableData, setDemoTableData, classname, setClassname, userUid, setUserUid }}>
            {children}
        </DemoStudentDataContext.Provider>
    )
}

export default DemoStudentDataContext