"use client"

import React, { createContext, useState } from "react"
import { useParams } from "next/navigation"
import demoStudentData from "../demoStudentData"
// Types
import { StudentData } from "../../types/types"

type ParamsType = {
	classroom_id?: string
}

type StudentDataContextType = {
	studentData: StudentData[]
	setStudentData: React.Dispatch<React.SetStateAction<StudentData[]>>
	userClassName: string
	setUserClassName: React.Dispatch<React.SetStateAction<string>>
	params: ParamsType
}

type StudentDataProviderProps = {
	children: React.ReactNode
}

const StudentDataContext = createContext<StudentDataContextType | undefined>(
	undefined
)

export function StudentDataProvider({ children }: StudentDataProviderProps) {
	const [studentData, setStudentData] = useState<StudentData[]>(demoStudentData)
	const [userClassName, setUserClassName] = useState("")
	const params = useParams()

	return (
		<StudentDataContext.Provider
			value={{
				studentData,
				setStudentData,
				userClassName,
				setUserClassName,
				params
			}}
		>
			{children}
		</StudentDataContext.Provider>
	)
}

export default StudentDataContext
