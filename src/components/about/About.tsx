import React from "react"
import Image from "next/image"
import { TiTickOutline } from "react-icons/ti"
import RewardManagement from "./RewardManagement"
import ClassroomManagement from "./ClassroomManagement"
import UserInterface from "./UserInterface"
import studentRewardImg from "../../../public/assets/student-reward.svg"

const About = () => {
	return (
		<>
			<section
				id="about"
				className="bg-white w-full flex flex-col justify-center items-center py-16 lg:py-20"
			>
				<div className="max-w-[1440px] w-full flex justify-center items-center">
					<div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-0 px-8">
						<div className="text-secondaryTextClr">
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-black py-4">
								<span className="bg-[linear-gradient(#FFF3A0,#FFEB79)] bg-[0_70%] bg-[size:100%_35%] bg-no-repeat">
									What is Student Space?
								</span>
							</h2>
							<p className="leading-7 font-medium text-tertiaryTextClr py-4">
								Welcome to Student Space, the ultimate platform designed
								specifically for primary school teachers by a passionate
								educator. As an ex-primary school teacher, I understand the
								importance of an organised and efficient classroom environment
								that fosters student growth and success. That&apos;s why I
								created{" "}
								<span className="font-bold text-yellow-500">Student Space</span>{" "}
								- your one-stop solution for managing student rewards and
								facilitating daily classroom management through a single,
								comprehensive toolkit.
							</p>
							<div className="font-bold text-secondaryTextClr capitalize pt-3 text-sm sm:text-base">
								<div className="flex items-center gap-2">
									<div className="border-2 border-yellow-500 rounded-full">
										<TiTickOutline
											size={20}
											className="text-yellow-500"
											role="presentation"
										/>
									</div>
									<p>Manage rewards</p>
								</div>
								<div className="flex items-center py-6 gap-2">
									<div className="border-2 border-yellow-500 rounded-full">
										<TiTickOutline
											size={20}
											className="text-yellow-500"
											role="presentation"
										/>
									</div>
									<p>Daily management tools</p>
								</div>
								<div className="flex items-center gap-2">
									<div className="border-2 border-yellow-500 rounded-full">
										<TiTickOutline
											size={20}
											className="text-yellow-500"
											role="presentation"
										/>
									</div>
									<p>User-friendly interface</p>
								</div>
							</div>
						</div>

						<div className="flex justify-center items-center">
							<Image
								src={studentRewardImg}
								alt="Illustration of student holding a trophy "
								className="w-[200px] md:w-[300px] hover:scale-105 duration-300"
								style={{ objectFit: "cover" }}
							/>
						</div>
					</div>
				</div>
			</section>
			<RewardManagement />
			<ClassroomManagement />
			<UserInterface />
		</>
	)
}

export default About
