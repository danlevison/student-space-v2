"use client"

import React, { useState, useContext, useEffect } from "react"
import StudentDataContext from "@/context/StudentDataContext"

const Birthday = () => {
	const { studentData } = useContext(StudentDataContext)
	const [bdayMessage, setBdayMessage] = useState("")

	const todayDate = new Date()
	const currentMonth = todayDate.getMonth() + 1
	const date = todayDate.getDate()

	function formatNames(names) {
		if (names.length === 0) {
			return ""
		} else if (names.length === 1) {
			return names[0]
		} else {
			const last = names.pop()
			return names.join(", ") + " and " + last
		}
	}

	useEffect(() => {
		const studentsWithSameBday = studentData.filter((student) => {
			const birthday = new Date(student.dob.split(".").reverse())
			const birthMonth = birthday.getMonth() + 1
			const birthDate = birthday.getDate()
			return currentMonth === birthMonth && date === birthDate
		})

		if (studentsWithSameBday.length > 0) {
			const names = studentsWithSameBday.map((student) => student.name)
			const formattedNames = formatNames(names)
			setBdayMessage(`Happy Birthday, ${formattedNames}! 🎂`)
		} else {
			setBdayMessage("")
		}
	}, [studentData, currentMonth, date])

	return (
		<div>
			<h3 className="font-bold text-2xl sm:text-3xl text-center mt-4">
				{bdayMessage}
			</h3>
		</div>
	)
}

export default Birthday
