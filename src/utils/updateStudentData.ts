import { db } from "./firebase"
import { doc, updateDoc } from "firebase/firestore"
import { StudentData } from "../types/types"

export async function updateStudentDataInClass(
	currentUserId: string,
	classroomId: string,
	updatedStudentData: StudentData[]
) {
	if (currentUserId && classroomId) {
		const classDocumentRef = doc(
			db,
			"users",
			currentUserId,
			"classes",
			classroomId
		)

		await updateDoc(classDocumentRef, {
			studentData: updatedStudentData
		})
	}
}
