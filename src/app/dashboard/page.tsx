"use client"

import React, { useState } from "react"
import { redirect } from "next/navigation"
import CreateClass from "./_components/CreateClass"
import DemoClassLink from "./_components/DemoClassLink"
import UsersClasses from "./_components/UsersClasses"
import EditClass from "@/app/dashboard/_components/editClass/EditClass"
import Nav from "@/components/Nav"
import WordOfTheDay from "@/components/WordOfTheDay"
import Preloader from "@/components/Preloader"
import ConditionalHeading from "./_components/ConditionalHeading"
import ConditionalText from "./_components/ConditionalText"
import PrivateRoute from "@/components/PrivateRoute"

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
	const [shouldFetchClassData, setShouldFetchClassData] = useState(true)
	const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false)
	const [selectedClass, setSelectedClass] = useState<SelectedUser | null>(null)

	// useEffect(() => {
	// 	if (loading) {
	// 		return
	// 	}

	// 	if (!user) {
	// 		router.push("/login")
	// 	}
	// }, [user, loading, router])

	// if (loading) return <Preloader />

	return (
		<>
			<header>
				<Nav />
			</header>
			<main className="py-40 px-8 min-h-screen w-full">
				<div className="flex flex-col justify-center items-center text-center">
					<ConditionalHeading />
					{/* <WordOfTheDay /> */}

					<div className="relative grid grid-cols-[repeat(auto-fit,minmax(230px,230px))] gap-10 w-full items-center justify-center mt-12">
						<div className="relative">
							<DemoClassLink />
							<ConditionalText />
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

export default PrivateRoute(Dashboard)
