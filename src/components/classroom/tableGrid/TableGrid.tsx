"use client"

import React, { useState, useContext } from "react"
import StudentDataContext from "@/context/StudentDataContext"
import AddTable from "@/components/classroom/tableGrid/AddTable"
import { RiAddLine } from "react-icons/ri"
import TableCard from "./TableCard"
// Types
import { StudentData } from "../../../../types/types"

const TableGrid = () => {
	const { studentData } = useContext(StudentDataContext)
	const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false)

	const handleAddTableModal = () => {
		setIsAddTableModalOpen(true)
	}

	// Filter out students whos tableName property is truthy (i.e they have a tableName)
	const filteredStudents = studentData.filter(
		(student) => student.tableData?.tableName !== ""
	)

	const groupedStudentsByTable: Record<string, StudentData[]> =
		filteredStudents.reduce((groups, student) => {
			// 1. Get the tableName from student's tableData property, or use an empty string if it's not present.
			const tableName = student.tableData?.tableName || ""

			// 2. Check if the groups object already has a property with the tableName as its key.
			if (!groups[tableName]) {
				// 3. If the property doesn't exist, create an empty array as its value.
				groups[tableName] = []
			}

			// 4. Push the current student into the array corresponding to the tableName.
			groups[tableName].push(student)

			// 5. Return the updated groups object for the next iteration.
			return groups
		}, {})

	return (
		<>
			{Object.keys(groupedStudentsByTable).length === 0 ? (
				<div className="flex flex-col justify-center items-center h-full w-3/4 lg:w-1/2 mx-auto rounded-lg shadow-lg p-4 sm:mt-10 bg-[#f5f5f5]">
					<h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
						Add your classroom table groups!
					</h2>
					<p className="text-center py-8 sm:text-lg">
						Reward tables for showing collaboration and teamwork!
					</p>
					<button
						onClick={handleAddTableModal}
						className="bg-buttonClr disabled:bg-slate-300 disabled:hover:scale-100 disabled:duration-0 p-3 md:p-4 rounded-lg text-primaryTextClr hover:scale-105 duration-300"
						disabled={studentData.length === 0}
					>
						Add a table
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center px-10">
					<TableCard groupedStudentsByTable={groupedStudentsByTable} />
					<button
						onClick={handleAddTableModal}
						className="flex flex-col justify-center items-center h-[270px] shadow-lg rounded-md bg-[#f5f5f5] hover:scale-[1.025] duration-300"
					>
						<p className="text-xl font-bold">Add Table</p>
						<RiAddLine size={40} />
					</button>
				</div>
			)}
			{/* Add Table Modal */}
			{isAddTableModalOpen && (
				<AddTable
					isAddTableModalOpen={isAddTableModalOpen}
					setIsAddTableModalOpen={setIsAddTableModalOpen}
				/>
			)}
		</>
	)
}

export default TableGrid
