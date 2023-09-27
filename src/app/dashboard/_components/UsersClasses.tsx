import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "@/utils/firebase"
import { getDocs, collection } from "firebase/firestore"
import { IoMdSettings } from "react-icons/io"

type UsersClassesProps = {
	setSelectedClass: React.Dispatch<ClassData>
	setIsEditClassModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	isEditClassModalOpen: boolean
	shouldFetchClassData: boolean
	setShouldFetchClassData: React.Dispatch<React.SetStateAction<boolean>>
}

type ClassData = {
	classId: string
	className: string
	classAvatar: {
		height: number
		width: number
		blurWidth: number
		src: string
		blurHeight: number
	}
}

const UsersClasses = ({
	setSelectedClass,
	setIsEditClassModalOpen,
	isEditClassModalOpen,
	shouldFetchClassData,
	setShouldFetchClassData
}: UsersClassesProps) => {
	const [user] = useAuthState(auth)
	const [classData, setClassData] = useState<ClassData[] | null>(null)

	const fetchClassData = useCallback(async () => {
		try {
			if (user) {
				const userClassesRef = collection(db, "users", user.uid, "classes")
				const querySnapshot = await getDocs(userClassesRef)
				const data: ClassData[] = []

				querySnapshot.forEach((doc) => {
					const classId = doc.id
					const className = doc.data().className
					const classAvatar = doc.data().classAvatar

					// Store classId and userClassName as an object
					data.push({ classId, className, classAvatar })
				})

				setClassData(data)
				setShouldFetchClassData(false)
			}
		} catch (error) {
			console.error("Error fetching class data:", error)
		}
	}, [setShouldFetchClassData, user])

	useEffect(() => {
		fetchClassData()
	}, [user, isEditClassModalOpen, shouldFetchClassData, fetchClassData])

	const handleEditClass = (classData: ClassData) => {
		setSelectedClass(classData)
		setIsEditClassModalOpen(true)
	}

	return (
		<>
			{classData?.map((userClass) => (
				<div
					key={userClass.classId}
					className="relative w-[230px] h-[230px] bg-white border border-[#5065A8] shadow-lg rounded-2xl hover:scale-105 duration-300 ease-out"
				>
					<Link href={`/classrooms/${userClass.classId}`}>
						<div className="flex flex-col justify-center items-center h-full gap-4">
							<Image
								className="rounded-xl border-2 border-black bg-blue-100 p-2"
								src={userClass.classAvatar}
								alt="Class avatar"
								priority
								width={100}
								height={100}
							/>
							<h2 className="text-4xl font-cabinSketch font-[400]">
								{userClass.className.length > 12
									? `${userClass.className.slice(0, 12)}...`
									: userClass.className}
							</h2>
						</div>
					</Link>
					<button
						onClick={() => handleEditClass(userClass)}
						className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
						aria-label="Class settings"
					>
						<IoMdSettings
							size={30}
							aria-label="Class settings"
						/>
					</button>
				</div>
			))}
		</>
	)
}

export default UsersClasses
