"use client"

import React, { useState, useEffect, useContext, useCallback } from "react"
import StudentDataContext from "@/context/StudentDataContext"
import { auth, db } from "@/utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { getDocs, collection } from "firebase/firestore"

type ClassDataType = {
	classId: string
	className: string
}

const Greeting = () => {
	const [user, loading] = useAuthState(auth)
	const { params } = useContext(StudentDataContext)
	const [greeting, setGreeting] = useState("")
	const currentTime = new Date().getHours()
	const [classData, setClassData] = useState<ClassDataType[] | null>([])

	const fetchClass = useCallback(async () => {
		try {
			const userClassesRef = collection(db, "users", user.uid, "classes")
			const querySnapshot = await getDocs(userClassesRef)
			const data: ClassDataType[] = []

			querySnapshot.forEach((doc) => {
				const classId = doc.id
				const className: string = doc.data().className

				// Store classId and userClassName as an object
				data.push({ classId, className })
			})

			setClassData(data)
		} catch (error) {
			console.error("Error fetching class data:", error)
		}
	}, [user.uid])

	useEffect(() => {
		const fetchData = async () => {
			await fetchClass()
		}
		fetchData()
	}, [fetchClass])

	useEffect(() => {
		if (classData && params.classroom_id) {
			// Find the user's current class
			const currentUserClass = classData.find(
				(classItem) => classItem.classId === params.classroom_id
			)

			if (currentUserClass) {
				// Set the greeting based on the className of the user's current class
				setGreeting(
					`Good ${currentTime < 12 ? "Morning" : "Afternoon"}, ${
						currentUserClass.className
					}!`
				)
			} else {
				setGreeting(`Good ${currentTime < 12 ? "Morning" : "Afternoon"}!`)
			}
		} else {
			setGreeting(`Good ${currentTime < 12 ? "Morning" : "Afternoon"}!`)
		}
	}, [classData, params.classroom_id, currentTime])

	return (
		<h1 className="text-5xl sm:text-6xl md:text-7xl text-center font-cabinSketch font-[700]">
			{greeting}
		</h1>
	)
}

export default Greeting