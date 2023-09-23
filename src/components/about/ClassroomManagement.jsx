import React from "react"
import { TiTickOutline } from "react-icons/ti"
import Image from "next/image"
import teacher from "../../../public/assets/teacher-students.svg"

const ClassroomManagement = () => {
	return (
		<section className="bg-white w-full py-16 lg:py-40">
			<div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-32 px-8">
				<div className="flex flex-col">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-black capitalize py-4">
						<span className="bg-[linear-gradient(#FFF3A0,#FFEB79)] bg-[0_70%] bg-[size:100%_35%] bg-no-repeat">
							Classroom management
						</span>
					</h2>
					<p className="text-tertiaryTextClr font-medium leading-7 py-4">
						Effective classroom management is key to nurturing a productive and
						inclusive learning environment. Student Space provides a
						comprehensive suite of tools that are designed to simplify your
						daily tasks, saving you valuable time and energy, allowing you to
						focus on what truly matters - your students' education.
					</p>

					<div className="flex flex-col gap-6 pt-4 font-bold text-secondaryTextClr capitalize text-sm sm:text-base">
						<div className="flex items-center gap-2">
							<div className="border-2 border-yellow-500 rounded-full">
								<TiTickOutline
									size={20}
									className="text-yellow-500"
									role="presentation"
								/>
							</div>
							<p>Student randomiser</p>
						</div>
						<div className="flex items-center gap-2">
							<div className="border-2 border-yellow-500 rounded-full">
								<TiTickOutline
									size={20}
									className="text-yellow-500"
									role="presentation"
								/>
							</div>
							<p>Task-list</p>
						</div>
						<div className="flex items-center gap-2">
							<div className="border-2 border-yellow-500 rounded-full">
								<TiTickOutline
									size={20}
									className="text-yellow-500"
									role="presentation"
								/>
							</div>
							<p>Create Instructions</p>
						</div>
						<div className="flex items-center gap-2">
							<div className="border-2 border-yellow-500 rounded-full">
								<TiTickOutline
									size={20}
									className="text-yellow-500"
									role="presentation"
								/>
							</div>
							<p>And more!</p>
						</div>
					</div>
				</div>
				<div>
					<div className="flex justify-center items-center">
						<Image
							src={teacher}
							alt="Illustration of teacher with her students"
							className="w-full max-w-[600px] hover:scale-105 duration-300"
							style={{ objectFit: "cover" }}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ClassroomManagement
