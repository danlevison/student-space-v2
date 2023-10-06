"use client"

import React, { useState, useEffect } from "react"
import { db } from "@/utils/firebase"
import { getDocs, collection } from "firebase/firestore"
import { useAuth } from "@/context/AuthContext"
import CreateClass from "./_components/CreateClass"
import DemoClassLink from "./_components/DemoClassLink"
import UsersClasses from "./_components/UsersClasses"
import EditClass from "@/app/dashboard/_components/editClass/EditClass"
import Nav from "@/components/Nav"
import Preloader from "@/components/Preloader"
import ConditionalHeading from "./_components/ConditionalHeading"
import PrivateRoute from "@/components/PrivateRoute"
import ProfileMenu from "@/app/dashboard/_components/account/ProfileMenu"

type SelectedUser = {
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

const Dashboard = () => {
	const { currentUser } = useAuth()
	const [shouldFetchClassData, setShouldFetchClassData] = useState(true)
	const [loading, setLoading] = useState(true)
	const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false)
	const [selectedClass, setSelectedClass] = useState<SelectedUser | null>(null)
	const [classData, setClassData] = useState<ClassDataType[] | null>(null)

	useEffect(() => {
		const fetchClassData = async () => {
			try {
				if (currentUser) {
					const userClassesRef = collection(
						db,
						"users",
						currentUser.uid,
						"classes"
					)
					const querySnapshot = await getDocs(userClassesRef)
					const data: ClassDataType[] = []

					querySnapshot.forEach((doc) => {
						const classId = doc.id
						const className: string = doc.data().className
						const classAvatar: ClassAvatarType = doc.data().classAvatar
						const createdAt: CreatedAtType = doc.data().createdAt

						// Store classId and userClassName as an object
						data.push({ classId, className, classAvatar, createdAt })
					})

					setClassData(data)
					orderClassesByCreationTime(data)
					setShouldFetchClassData(false)
				}
			} catch (error) {
				console.error("Error fetching class data:", error)
			}
			setLoading(false)
		}
		fetchClassData()
	}, [currentUser, isEditClassModalOpen, shouldFetchClassData, setLoading])

	const orderClassesByCreationTime = (data: ClassDataType[]) => {
		if (data) {
			const sortedData = [...data].sort((a, b) => {
				return b.createdAt.seconds - a.createdAt.seconds
			})
			setClassData(sortedData)
		}
	}

	if (loading) return <Preloader />

	return (
		<>
			<header className="relative">
				<Nav />
			</header>
			<main className="relative py-40 min-h-screen w-full">
				<div className="fixed top-[5.5rem] flex justify-end items-center px-8 bg-white w-full h-12 border-b border-gray-300 z-10">
					<ProfileMenu />
				</div>
				<div className="flex flex-col justify-center items-center text-center px-8">
					<ConditionalHeading />

					<div className="relative grid grid-cols-[repeat(auto-fit,minmax(230px,230px))] gap-10 w-full items-center justify-center mt-12">
						<DemoClassLink />

						<UsersClasses
							classData={classData}
							setSelectedClass={setSelectedClass}
							setIsEditClassModalOpen={setIsEditClassModalOpen}
						/>

						<EditClass
							isEditClassModalOpen={isEditClassModalOpen}
							setIsEditClassModalOpen={setIsEditClassModalOpen}
							classData={selectedClass}
						/>

						<CreateClass setShouldFetchClassData={setShouldFetchClassData} />
					</div>
				</div>
			</main>
		</>
	)
}

export default PrivateRoute(Dashboard)
