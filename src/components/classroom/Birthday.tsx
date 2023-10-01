"use client"

import React, { useState, useContext, useEffect } from "react"
import StudentDataContext from "@/context/StudentDataContext"
// Types
import { StudentData } from "../../../types/types"

const Birthday = () => {
	const { studentData } = useContext(StudentDataContext)
	const [bdayMessage, setBdayMessage] = useState("")

	const todayDate = new Date()
	const currentMonth = todayDate.getMonth() + 1
	const date = todayDate.getDate()

	function formatDateOfBirth(dob: string) {
		const birthday = dob.split("-")
		const birthMonth = parseInt(birthday[1])
		const birthDate = parseInt(birthday[2])
		return { birthMonth, birthDate }
	}

	function formatNames(names: string[]) {
		if (names.length === 0) {
			return ""
		} else if (names.length === 1) {
			return names[0]
		} else {
			const last = names.pop()
			return names.join(", ") + " and " + last
		}
	}

	function buildBirthdayMessage(students: StudentData[]) {
		if (students.length > 0) {
			const names = students.map((student) => student.name)
			const formattedNames = formatNames(names)
			return `Happy Birthday, ${formattedNames}! 🎂`
		} else {
			return ""
		}
	}

	useEffect(() => {
		const studentsWithSameBday = studentData.filter((student) => {
			const { birthMonth, birthDate } = formatDateOfBirth(student.dob)
			return currentMonth === birthMonth && date === birthDate
		})

		const bdayMessage = buildBirthdayMessage(studentsWithSameBday)
		setBdayMessage(bdayMessage)
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
