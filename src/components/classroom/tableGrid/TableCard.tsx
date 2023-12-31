"use client"

import React, { useContext } from "react"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import StudentDataContext from "@/context/StudentDataContext"
import { FaAward } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import pointsSound from "../../../../public/audio/points.mp3"
// Types
import { StudentData } from "../../../types/types"
import { updateStudentDataInClass } from "@/utils/updateStudentData"

type TableCardProps = {
	groupedStudentsByTable: Record<string, StudentData[]>
}

const TableCard = ({ groupedStudentsByTable }: TableCardProps) => {
	const { studentData, setStudentData, params } = useContext(StudentDataContext)
	const { currentUser } = useAuth()

	const handlePointClick = async (tableName: string) => {
		try {
			// Update tablePoints in demoClass
			const updatedStudentData = studentData.map((student) => {
				if (student.tableData?.tableName === tableName) {
					return {
						...student,
						tableData: {
							...student.tableData,
							tablePoints: (student.tableData.tablePoints || 0) + 1
						}
					}
				}
				return student
			})

			// Increment/update student points in demoClass
			setStudentData(updatedStudentData)

			// Increment/update student points in current users class
			await updateStudentDataInClass(
				currentUser.uid,
				params.classroom_id,
				studentData
			)

			// plays a sound when the points are incremented
			playPointsSound()
		} catch (error) {
			console.error("Error updating student information:", error)
		}
	}

	const playPointsSound = () => {
		const pointsAudio = new Audio(pointsSound)
		pointsAudio.volume = 0.2
		pointsAudio.play()
	}

	return (
		<>
			{Object.entries(groupedStudentsByTable).map(([tableName, students]) => (
				<div
					key={tableName}
					className="relative flex flex-col justify-between items-center text-center h-[270px] p-8 shadow-lg rounded-md bg-[#f5f5f5]"
				>
					<p className="font-bold tracking-wide text-2xl w-full break-words md:w-auto">
						{tableName.length > 18 ? tableName.slice(0, 18) + "..." : tableName}
					</p>
					<p className="text-center text-primaryTextClr text-xl w-[50px] p-2 bg-iconClr rounded-lg mx-auto my-1">
						{/* assume that all students in the same table have the same number of points, so render points of the first student only */}
						{students[0].tableData?.tablePoints || 0}
					</p>
					<div className="flex flex-wrap justify-center items-center gap-2 font-bold tracking-wide py-2 h-full overflow-auto">
						{students.reduce((displayedStudents, student) => {
							if (displayedStudents.length < 4 && student.tableData.isOnTable) {
								displayedStudents.push(
									<div
										key={student.uuid}
										className="flex flex-col justify-center bg-white shadow-lg rounded-lg text-center w-[90px] h-[100px]"
									>
										<Image
											src={student.avatar}
											alt="Student Avatar: Sketched Animal"
											width={60}
											height={60}
											className="mx-auto"
										/>
									</div>
								)
							}
							return displayedStudents
						}, [])}
					</div>
					<button onClick={() => handlePointClick(tableName)}>
						<FaAward
							size={30}
							className="absolute top-2 right-1 text-iconClr hover:text-yellow-500 hover:scale-110 duration-300 ease-in"
						/>
					</button>
					{/* <button className="absolute bottom-2 right-2">
						<IoMdSettings
							size={20}
							className="text-gray-400"
						/>
					</button> */}
				</div>
			))}
		</>
	)
}

export default TableCard
