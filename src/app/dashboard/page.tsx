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
import Scribble from "@/components/Scribble"
import CurrentDate from "@/components/classroom/DateComponent"

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

	const scribblesSvgs = [
		{
			src: "/assets/Scribbles/24.svg",
			className: "absolute top-16 left-0 w-[75px] md:w-[100px] 2xl:w-[150px]"
		},
		{
			src: "/assets/Scribbles/72.svg",
			className:
				"absolute bottom-20 md:bottom-5 right-20 w-[75px] md:w-[100px] 2xl:w-[150px] rotate-12"
		},
		{
			src: "/assets/Scribbles/1.svg",
			className: "absolute top-32 right-6 w-[50px] md:w-[75px] 2xl:w-[130px]"
		},
		{
			src: "/assets/Scribbles/21.svg",
			className: "absolute bottom-32 left-16 w-[50px] md:w-[75px]"
		},
		{
			src: "/assets/Scribbles/63.svg",
			className:
				"absolute bottom-[30%] md:bottom-44 2xl:bottom-96 right-7 md:right-56 2xl:right-56 w-[40px] md:w-[50px] 2xl:w-[75px]"
		},
		{
			src: "/assets/Scribbles/6.svg",
			className:
				"absolute bottom-[50%] lg:bottom-72 left-10 md:left-24 w-[30px] md:w-[40px]"
		},
		{
			src: "/assets/Scribbles/45.svg",
			className:
				"hidden 2xl:block absolute top-72 left-72 w-[30px] 2xl:w-[40px]"
		},
		{
			src: "/assets/Scribbles/35.svg",
			className: "hidden lg:block absolute bottom-10 w-[75px] 2xl:w-[100px]"
		}
	]

	if (loading) return <Preloader />

	return (
		<>
			<header className="relative">
				<Nav />
			</header>
			<main className="relative py-40 min-h-screen w-full">
				<div className="fixed top-[5.5rem] flex justify-between items-center px-8 bg-white w-full h-12 border-b border-gray-300 z-10">
					<ProfileMenu />
					<CurrentDate />
				</div>
				<div className="flex flex-col justify-center items-center text-center px-8 py-10">
					<Scribble scribblesSvgs={scribblesSvgs} />
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
