export type StudentData = {
	name: string
	dob: string
	points: number
	avatar: HTMLImageElement
	selected: boolean
	tableData: {
		tableName: string
		tablePoints: number
		isOnTable: boolean
		selected: boolean
	}
	uuid: string
}

// Intructions component
export type InstructionSetType = {
	title?: string
	instructions: string[]
}
