import React from "react"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import arrowScribble from "@/../../public/assets/Scribbles/70.svg"

const ConditionalText = () => {
	const { currentUser } = useAuth()
	const creationTime = currentUser?.metadata.creationTime
	const lastSignInTime = currentUser?.metadata.lastSignInTime
	return (
		<>
			{creationTime === lastSignInTime && (
				<div className="flex flex-col gap-5 absolute top-[-40%] lg:top-[-30%] lg:left-[-100%] select-none">
					<p className="relative -rotate-[15deg] text-3xl lg:text-4xl font-cabinSketch text-green-900">
						Try the Demo Class!
					</p>
					<Image
						src={arrowScribble}
						alt=""
						role="presentation"
						className="absolute bottom-[-90%] lg:bottom-[-130%] left-[90%] translate-x-[-90%] scale-y-[-1] rotate-[55deg]"
					/>
				</div>
			)}
		</>
	)
}

export default ConditionalText
