"use client"

import React, { useState, useEffect, useContext, useCallback } from "react"
import StudentDataContext from "@/context/StudentDataContext"

type ClassDataType = {
	classId: string
	className: string
}

type GreetingProps = {
	classData?: ClassDataType[]
}

const Greeting = ({ classData }: GreetingProps) => {
	const { params } = useContext(StudentDataContext)
	const [greeting, setGreeting] = useState("")
	const currentTime = new Date().getHours()

	const getCurrentUsersClass = useCallback(() => {
		if (classData && params.classroom_id) {
			return classData.find(
				(classInfo) => classInfo.classId === params.classroom_id
			)
		}
	}, [classData, params.classroom_id])

	useEffect(() => {
		if (getCurrentUsersClass()) {
			// Set the greeting based on the className of the currentUser's current class
			setGreeting(
				`Good ${currentTime < 12 ? "Morning" : "Afternoon"}, ${
					getCurrentUsersClass().className
				}!`
			)
		} else {
			setGreeting(`Good ${currentTime < 12 ? "Morning" : "Afternoon"}!`)
		}
	}, [classData, params.classroom_id, currentTime, getCurrentUsersClass])

	return (
		<h1 className="text-5xl sm:text-6xl md:text-7xl text-center font-cabinSketch font-[700]">
			{greeting}
		</h1>
	)
}

export default Greeting
