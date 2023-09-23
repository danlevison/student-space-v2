"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/firebase"
import ClassNav from "@/components/classroom/ClassNav"
import CurrentDate from "@/components/classroom/DateComponent"
import StudentGrid from "@/components/classroom/studentGrid/StudentGrid"
import TableGrid from "@/components/classroom/tableGrid/TableGrid"
import Toolbar from "@/components/classroom/Toolbar"
import Greeting from "@/components/classroom/Greeting"
import Weather from "@/components/WeatherData"
import Birthday from "@/components/classroom/Birthday"
import Scribble from "@/components/Scribble"
import Preloader from "@/components/Preloader"
import paperBg from "@/../../public/assets/paperbg.jpg"

const Classroom = () => {
	const [user, loading] = useAuthState(auth)
	const router = useRouter()
	const [toolbarMenu, setToolbarMenu] = useState(false)
	const [showTableGrid, setShowTableGrid] = useState(false)

	const handleToolbar = () => {
		setToolbarMenu(!toolbarMenu)
	}

	const handleShowTableGrid = () => {
		setShowTableGrid(true)
	}

	const handleShowStudentGrid = () => {
		setShowTableGrid(false)
	}

	useEffect(() => {
		if (loading) {
			// Handle loading state
			return // Don't proceed until loading is complete
		}

		if (!user) {
			router.push("/auth/login")
		}
	}, [user, loading])

	if (loading) return <Preloader />

	const scribblesSvgs = [
		{
			src: "/assets/Scribbles/58.svg",
			className:
				"absolute hidden sm:block sm:top-64 md:top-44 left-10 w-[50px] md:w-[100px] 2xl:w-[150px]"
		},
		{
			src: "/assets/Scribbles/65.svg",
			className: "absolute bottom-10 right-20 w-[75px] md:w-[150px] rotate-12"
		},
		{
			src: "/assets/Scribbles/66.svg",
			className:
				"absolute hidden lg:block top-60 right-16 md:right-80 w-[50px] md:w-[100px]"
		},
		{
			src: "/assets/Scribbles/26.svg",
			className: "absolute bottom-16 left-2 w-[150px] md:w-[200px]"
		},
		{
			src: "/assets/Scribbles/43.svg",
			className:
				"absolute hidden lg:block top-64 left-24 md:left-72 w-[30px] md:w-[75px] rotate-180"
		},
		{
			src: "/assets/Scribbles/3.svg",
			className: "absolute top-10 right-5 w-[50px] md:w-[100px]"
		},
		{
			src: "/assets/Scribbles/61.svg",
			className: "hidden md:block absolute top-2 left-96 w-[200px] rotate-45"
		}
	]

	return (
		<>
			<header>
				<ClassNav handleToolbar={handleToolbar} />
			</header>
			<main
				className="relative min-h-screen w-full bg-[#fbe8de] top"
				style={{
					backgroundImage: `url(${paperBg.src})`,
					backgroundSize: "auto"
				}}
			>
				<Scribble scribblesSvgs={scribblesSvgs} />
				<div className="flex">
					<aside className="z-[10]">
						<Toolbar
							toolbarMenu={toolbarMenu}
							setToolbarMenu={setToolbarMenu}
						/>
					</aside>

					<div className="flex flex-col mx-auto w-full py-20 z-0">
						<div className="flex flex-col justify-center items-center pb-10 sm:pb-0 px-8">
							<Greeting />
							<Birthday />
							<CurrentDate />
							<Weather />
							<div className="flex items-center gap-10 pb-4">
								<button
									onClick={handleShowStudentGrid}
									className={
										!showTableGrid
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
						</div>
						{showTableGrid ? <TableGrid /> : <StudentGrid />}
					</div>
				</div>
			</main>
		</>
	)
}

export default Classroom
