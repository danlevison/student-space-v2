"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/firebase"
import CreateClass from "./_components/CreateClass"
import DemoClassLink from "./_components/DemoClassLink"
import UsersClasses from "./_components/UsersClasses"
import EditClass from "@/app/dashboard/_components/editClass/EditClass"
import Nav from "@/components/Nav"
import WordOfTheDay from "@/components/WordOfTheDay"
import Preloader from "@/components/Preloader"
import arrowScribble from "@/../../public/assets/Scribbles/70.svg"

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

const Dashboard = () => {
	const [user, loading] = useAuthState(auth)
	const [shouldFetchClassData, setShouldFetchClassData] = useState(true)
	const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false)
	const [selectedClass, setSelectedClass] = useState<SelectedUser | null>(null)
	const router = useRouter()
	const creationTime = user?.metadata.creationTime
	const lastSignInTime = user?.metadata.lastSignInTime

	useEffect(() => {
		if (loading) {
			return
		}

		if (!user) {
			router.push("/auth/login")
		}
	}, [user, loading, router])

	if (loading) return <Preloader />

	return (
		<>
			<header>
				<Nav />
			</header>
			<main className="py-40 px-8 min-h-screen w-full">
				<div className="flex flex-col justify-center items-center text-center">
					<h1 className="text-5xl sm:text-7xl font-cabinSketch font-[700] mb-24">
						{creationTime === lastSignInTime ? "Welcome!" : "Welcome Back!"}
					</h1>
					{/* <WordOfTheDay /> */}

					<div className="relative grid grid-cols-[repeat(auto-fit,minmax(230px,230px))] gap-10 w-full items-center justify-center mt-12">
						<div className="relative">
							<DemoClassLink />
							{creationTime === lastSignInTime && (
								<div className="flex flex-col gap-5 absolute top-[-40%] lg:top-[-60%] select-none">
									<p className="relative -rotate-[15deg] text-3xl lg:text-4xl font-cabinSketch text-green-900">
										Try the Demo Class!
									</p>
									<Image
										src={arrowScribble}
										alt=""
										role="presentation"
										className="absolute bottom-[-90%] left-[90%] translate-x-[-90%] scale-y-[-1] rotate-[55deg]"
									/>
								</div>
							)}
						</div>

						<UsersClasses
							setSelectedClass={setSelectedClass}
							setIsEditClassModalOpen={setIsEditClassModalOpen}
							isEditClassModalOpen={isEditClassModalOpen}
							shouldFetchClassData={shouldFetchClassData}
							setShouldFetchClassData={setShouldFetchClassData}
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

export default Dashboard
