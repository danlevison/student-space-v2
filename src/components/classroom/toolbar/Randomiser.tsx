import React, { useContext, useState, useEffect } from "react"
import Image from "next/image"
import { Dialog } from "@headlessui/react"
import { useAuth } from "@/context/AuthContext"
import StudentDataContext from "@/context/StudentDataContext"
import { updateStudentDataInClass } from "@/utils/updateStudentData"
import { AiOutlineClose } from "react-icons/ai"
import { FaAward } from "react-icons/fa"
import pointsSound from "../../../../public/audio/points.mp3"
import Confetti from "react-confetti"
import { useWindowSize } from "@reactuses/core"
// Types
import { StudentData } from "../../../types/types"

type RandomiserProps = {
	openRandomiser: boolean
	setOpenRandomiser: React.Dispatch<React.SetStateAction<boolean>>
}

const Randomiser = ({ openRandomiser, setOpenRandomiser }: RandomiserProps) => {
	const { studentData, setStudentData, params } = useContext(StudentDataContext)
	const { currentUser } = useAuth()
	const [randomStudent, setRandomStudent] = useState<StudentData | null>(null)
	const [showConfetti, setShowConfetti] = useState(false)
	const { width, height } = useWindowSize()

	const getRandomStudent = () => {
		const randomIndex = Math.floor(Math.random() * studentData.length)
		const student = studentData.map((student) => student)
		const selectedStudent = student[randomIndex]
		setRandomStudent(selectedStudent)
	}

	useEffect(() => {
		getRandomStudent()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [openRandomiser])

	const handlePointClick = async () => {
		try {
			if (randomStudent && randomStudent.name) {
				// Increment the students points in the studentData state
				const updatedStudentData = studentData.map((student) => {
					if (student.name === randomStudent.name) {
						return { ...student, points: student.points + 1 }
					}
					return student
				})

				// Update the randomStudent state with the updated points to match students points in studentData
				setRandomStudent((prevRandomStudent) => {
					return { ...prevRandomStudent, points: prevRandomStudent.points + 1 }
				})

				// Update studentData and add points to the random student in the demoClass
				setStudentData(updatedStudentData)

				// Update studentData and add points to the random student in the active users class
				await updateStudentDataInClass(
					currentUser.uid,
					params.classroom_id,
					updatedStudentData
				)

				// plays a sound when the points are incremented
				playPointsSound()

				// Check if the student now has 50 points
				if (randomStudent.points + 1 === 50) {
					// Show confetti for 5 seconds
					showConfettiForDuration(5000)
				}
			}
		} catch (error) {
			console.error("Error updating student points:", error)
		}
	}

	const playPointsSound = () => {
		const pointsAudio = new Audio(pointsSound)
		pointsAudio.volume = 0.2
		pointsAudio.play()
	}

	const showConfettiForDuration = (duration: number) => {
		setShowConfetti(true)

		// After the specified duration, hide the confetti
		setTimeout(() => {
			setShowConfetti(false)
		}, duration)
	}

	return (
		<>
			{showConfetti && (
				<Confetti
					width={width}
					height={height}
					gravity={0.05}
					numberOfPieces={300}
					className="w-full"
				/>
			)}
			<Dialog
				open={openRandomiser}
				onClose={() => setOpenRandomiser(false)}
				className="relative z-[50]"
			>
				{/* Backdrop */}
				<div
					className="fixed inset-0 bg-modalBackdropClr"
					aria-hidden="true"
				/>

				{/* Full-screen container to center the panel */}
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<Dialog.Panel className="w-full max-w-[600px] h-full max-h-[450px] rounded-xl bg-modalBgClr border-2 border-modalBorderClr">
						<div className="p-5 flex justify-between items-center border-b-2 border-gray-300">
							<Dialog.Title className="font-bold text-xl">
								Random Student
							</Dialog.Title>
							<button onClick={() => setOpenRandomiser(false)}>
								<AiOutlineClose
									size={28}
									className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
								/>
							</button>
						</div>

						<div className="flex flex-col justify-center items-center gap-6 h-full p-5">
							<div
								key={randomStudent?.uuid}
								className="relative flex flex-col justify-center items-center p-8 shadow-lg rounded-md bg-[#f5f5f5] border w-full max-w-[400px] h-[250px]"
							>
								{randomStudent ? (
									<>
										<p className="font-bold text-3xl tracking-wide">
											{randomStudent.name}
										</p>
										<p className="text-center text-primaryTextClr text-2xl w-[60px] p-2 bg-iconClr rounded-lg mx-auto my-1">
											{randomStudent.points}
										</p>
										<button onClick={handlePointClick}>
											<FaAward
												size={40}
												className="absolute top-2 right-1 text-iconClr hover:text-yellow-500 hover:scale-110 duration-300 ease-in"
											/>
										</button>
										<Image
											src={randomStudent.avatar}
											alt="/"
											width={80}
											height={80}
											className="absolute top-1 left-1"
											style={{
												objectFit: "cover"
											}}
										/>
									</>
								) : (
									<p>No student data available</p>
								)}
							</div>
							<button
								onClick={getRandomStudent}
								className="pb-8"
							>
								Choose again
							</button>
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
		</>
	)
}

export default Randomiser
