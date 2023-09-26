"use client"

import React from "react"

type SwitchGridViewProps = {
	showTableGrid: boolean
	setShowTableGrid: React.Dispatch<React.SetStateAction<boolean>>
}

const SwitchGridView = ({
	showTableGrid,
	setShowTableGrid
}: SwitchGridViewProps) => {
	// const [showTableGrid, setShowTableGrid] = useState(false)

	const handleShowTableGrid = () => {
		setShowTableGrid(true)
	}

	const handleShowStudentGrid = () => {
		setShowTableGrid(false)
	}

	return (
		<div className="flex items-center gap-10 pb-4">
			<button
				onClick={handleShowStudentGrid}
				className={
					showTableGrid === false
						? "text-lg text-buttonClr font-bold underline"
						: "text-lg font-bold hover:scale-105 duration-300"
				}
			>
				Students
			</button>
			<button
				onClick={handleShowTableGrid}
				className={
					showTableGrid
						? "text-lg text-buttonClr font-bold underline"
						: "text-lg font-bold hover:scale-105 duration-300"
				}
			>
				Tables
			</button>
		</div>
	)
}

export default SwitchGridView
