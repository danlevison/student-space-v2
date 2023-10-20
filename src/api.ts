import { db } from "./utils/firebase"
import { getDocs, collection, getDoc, doc } from "firebase/firestore"
import { User } from "firebase/auth"
import { InstructionSetType } from "./types/types"

type ClassDataType = {
	classId: string
	className: string
	classAvatar: ClassAvatarType
	createdAt: CreatedAtType
}

type CreatedAtType = {
	nanoseconds: number
	seconds: number
}

type ClassAvatarType = {
	height: number
	width: number
	blurWidth: number
	src: string
	blurHeight: number
}

type TasksType = {
	id: string
	title: string
	completed: boolean
}

export async function fetchClassData(currentUser: User) {
	const userClassesCollectionRef = collection(
		db,
		"users",
		currentUser.uid,
		"classes"
	)
	const querySnapshot = await getDocs(userClassesCollectionRef)
	const data: ClassDataType[] = []

	querySnapshot.forEach((doc) => {
		const classId = doc.id
		const className: string = doc.data().className
		const classAvatar: ClassAvatarType = doc.data().classAvatar
		const createdAt: CreatedAtType = doc.data().createdAt

		// Store classId and userClassName as an object
		data.push({ classId, className, classAvatar, createdAt })
	})
	return data
}

export async function fetchStudentData(currentUser: User, classroomId: string) {
	const classDocumentRef = doc(
		db,
		"users",
		currentUser.uid,
		"classes",
		classroomId
	)

	const classDocSnapshot = await getDoc(classDocumentRef)
	if (classDocSnapshot.exists()) {
		const classData = classDocSnapshot.data()
		return classData
	}
}

export async function fetchTaskListData(
	currentUser: User,
	classroomId: string
) {
	const classDocumentRef = doc(
		db,
		"users",
		currentUser.uid,
		"classes",
		classroomId
	)
	const classDocSnapshot = await getDoc(classDocumentRef)
	const taskListData: TasksType[] = classDocSnapshot.data()?.taskListData || []

	return taskListData
}

export async function fetchIntructionData(
	currentUser: User,
	classroomId: string
) {
	const classDocumentRef = doc(
		db,
		"users",
		currentUser.uid,
		"classes",
		classroomId
	)
	const classSnapshot = await getDoc(classDocumentRef)
	const instructionsData: InstructionSetType[] =
		classSnapshot.data()?.instructionsData || []

	return instructionsData
}
