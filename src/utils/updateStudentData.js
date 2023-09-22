import { db } from "./firebase"
import { doc, updateDoc } from "firebase/firestore"

export async function updateStudentDataInClass(userUid, classroomId, updatedStudentData) {
    if(userUid && classroomId) {
        const classDocumentRef = doc(db, "users", userUid, "classes", classroomId)

        await updateDoc(classDocumentRef, {
            studentData: updatedStudentData
        })
    }
}