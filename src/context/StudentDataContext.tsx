"use client"

import React, { createContext, useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/firebase"
import { useParams } from "next/navigation"
import demoStudentData from "../demoStudentData"
import { StudentData } from "../../types/types"

type ParamsType = {
	classroom_id?: string
}

type StudentDataContextType = {
	studentData: StudentData[]
	setStudentData: React.Dispatch<React.SetStateAction<StudentData[]>>
	userClassName: string
	setUserClassName: React.Dispatch<React.SetStateAction<string>>
	userUid: string
	params: ParamsType
	showConfetti: boolean
	setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>
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
	const [showConfetti, setShowConfetti] = useState(false)
	const [user] = useAuthState(auth)
	const [userUid, setUserUid] = useState("")
	const params = useParams()

	useEffect(() => {
		// Check if the user object is available and has a UID
		if (user && user.uid) {
			setUserUid(user.uid)
		}
	}, [user])

	return (
		<StudentDataContext.Provider
			value={{
				studentData,
				setStudentData,
				userClassName,
				setUserClassName,
				userUid,
				params,
				showConfetti,
				setShowConfetti
			}}
		>
			{children}
		</StudentDataContext.Provider>
	)
}

export default StudentDataContext
