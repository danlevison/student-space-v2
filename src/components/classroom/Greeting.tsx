"use client"

import React, { useState, useEffect, useContext, useCallback } from "react"
import { useAuth } from "@/context/AuthContext"
import StudentDataContext from "@/context/StudentDataContext"
import { db } from "@/utils/firebase"
import { getDocs, collection } from "firebase/firestore"

type ClassDataType = {
	classId: string
	className: string
}

const Greeting = () => {
	const { currentUser } = useAuth()
	const { params } = useContext(StudentDataContext)
	const [greeting, setGreeting] = useState("")
	const currentTime = new Date().getHours()
	const [classData, setClassData] = useState<ClassDataType[] | null>([])

	const fetchClass = useCallback(async () => {
		try {
			const currentUserClassesRef = collection(
				db,
				"users",
				currentUser.uid,
				"classes"
			)
			const querySnapshot = await getDocs(currentUserClassesRef)
			const data: ClassDataType[] = []

			querySnapshot.forEach((doc) => {
				const classId = doc.id
				const className: string = doc.data().className

				// Store classId and currentUserClassName as an object
				data.push({ classId, className })
			})

			setClassData(data)
		} catch (error) {
			console.error("Error fetching class data:", error)
		}
	}, [currentUser.uid])

	const getCurrentUsersClass = useCallback(() => {
		if (classData && params.classroom_id) {
			return classData.find(
				(classInfo) => classInfo.classId === params.classroom_id
			)
		}
	}, [classData, params.classroom_id])

	useEffect(() => {
		const fetchData = async () => {
			await fetchClass()
		}
		fetchData()
	}, [fetchClass])

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
