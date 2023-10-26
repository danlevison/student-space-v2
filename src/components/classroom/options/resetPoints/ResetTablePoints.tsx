import React, { useContext } from "react"
import { useAuth } from "@/context/AuthContext"
import StudentDataContext from "@/context/StudentDataContext"
import { updateStudentDataInClass } from "@/utils/updateStudentData"
import { toast } from "react-toastify"

type ResetStudentPointsProps = {
	setOpenResetStudentPointsModal: React.Dispatch<React.SetStateAction<boolean>>
	areAllTablesSelected: boolean
	setAreAllTablesSelected: React.Dispatch<React.SetStateAction<boolean>>
	resetStudents: () => void
	resetTables: () => void
}

type TableNamesMapType = {
	selected: boolean
	tableName: string
}

const ResetTablePoints = ({
	setOpenResetStudentPointsModal,
	areAllTablesSelected,
	setAreAllTablesSelected,
	resetStudents,
	resetTables
}: ResetStudentPointsProps) => {
	const { studentData, setStudentData, params } = useContext(StudentDataContext)
	const { currentUser } = useAuth()
	const tableNamesMap: { [key: string]: TableNamesMapType } = {}

	studentData.forEach((student) => {
		if (student.tableData?.tableName) {
			const tableName = student.tableData.tableName
			if (!tableNamesMap[tableName]) {
				// If the tableName is not already in the map, add it with the corresponding object
				tableNamesMap[tableName] = {
					tableName: tableName,
					selected: student.tableData.selected
				}
			}
		}
	})

	const tables: TableNamesMapType[] = Object.values(tableNamesMap)

	const toggleSelectedTable = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedTable = e.target.name

		const updatedStudentData = studentData.map((student) => {
			if (student.tableData?.tableName === selectedTable) {
				return {
					...student,
					tableData: {
						...student.tableData,
						selected: !student.tableData.selected
					}
				}
			}
			return student
		})

		setStudentData(updatedStudentData)
	}

	const resetSelectedTablesPoints = async () => {
		try {
			const updatedStudentData = studentData.map((student) => {
				if (student.tableData.selected) {
					return {
						...student,
						tableData: { ...student.tableData, tablePoints: 0, selected: false }
					}
				}
				return student
			})

			// reset table points in demoClass
			setStudentData(updatedStudentData)

			// Update studentData and reset table points in the active users class
			await updateStudentDataInClass(
				currentUser.uid,
				params.classroom_id,
				updatedStudentData
			)
		} catch (error) {
			console.error("Error resetting table points", error)
		}
		setOpenResetStudentPointsModal(false)
		resetStudents()
		resetTables()
		toast.success("Table points reset successfully!")
	}

	const selectAllTables = () => {
		setStudentData((prevStudentData) => {
			return prevStudentData.map((student) => {
				return {
					...student,
					tableData: { ...student.tableData, selected: true }
				}
			})
		})
		setAreAllTablesSelected(true)
	}

	const deselectAllTables = () => {
		setStudentData((prevStudentData) => {
			return prevStudentData.map((student) => {
				return {
					...student,
					tableData: { ...student.tableData, selected: false }
				}
			})
		})
		setAreAllTablesSelected(false)
	}

	return (
		<>
			<div className="h-full overflow-auto">
				<div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] p-5">
					{tables.map((table) => (
						<div
							key={table.tableName}
							className="mx-auto h-fit my-2"
						>
							<input
								onChange={toggleSelectedTable}
								checked={table.selected}
								type="checkbox"
								id={table.tableName}
								name={table.tableName}
								className="hidden peer"
							/>
							<label
								htmlFor={table.tableName}
								className="flex flex-col justify-center items-center h-20 w-32 cursor-pointer text-center font-bold text-lg bg-white p-4 border border-buttonClr rounded-xl peer-checked:bg-green-200 peer-hover:scale-105 duration-300 select-none"
							>
								{table.tableName.length > 9
									? table.tableName.slice(0, 9) + "..."
									: table.tableName}
							</label>
						</div>
					))}
				</div>
			</div>
			<div className="flex justify-end items-center text-sm border-t-2 border-gray-300 px-5 py-3">
				{areAllTablesSelected ? (
					<button
						onClick={deselectAllTables}
						className="mr-auto bg-transparent hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold"
					>
						Select None
					</button>
				) : (
					<button
						onClick={selectAllTables}
						className="mr-auto bg-transparent hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold"
					>
						Select All
					</button>
				)}
				<div className="flex gap-2">
					<button
						onClick={() => {
							setOpenResetStudentPointsModal(false)
							resetStudents()
							resetTables()
						}}
						className="bg-transparent hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold"
					>
						Cancel
					</button>
					<button
						onClick={resetSelectedTablesPoints}
						disabled={
							!studentData.some((student) => student.tableData.selected)
						}
						className="font-bold bg-white hover:bg-green-200 rounded-2xl py-2 px-5 disabled:text-white disabled:bg-gray-400"
					>
						Reset Points
					</button>
				</div>
			</div>
		</>
	)
}

export default ResetTablePoints
