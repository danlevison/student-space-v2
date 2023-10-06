import React from "react"
import Image from "next/image"
import Link from "next/link"
import { IoMdSettings } from "react-icons/io"

type UsersClassesProps = {
	setSelectedClass: React.Dispatch<ClassDataType>
	setIsEditClassModalOpen: React.Dispatch<React.SetStateAction<boolean>>
	classData: ClassDataType[]
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

const UsersClasses = ({
	setSelectedClass,
	setIsEditClassModalOpen,
	classData
}: UsersClassesProps) => {
	const handleEditClass = (classData: ClassDataType) => {
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
								src={userClass.classAvatar.src}
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
