import React from "react"
import Image from "next/image"

const Scribble = ({ scribblesSvgs }) => {
	return (
		<>
			{scribblesSvgs.map((scribble, index) => (
				<Image
					key={index}
					src={scribble.src}
					alt={""}
					role="presentation"
					className={`${scribble.className} select-none`}
					width={40}
					height={40}
					priority
				/>
			))}
		</>
	)
}

export default Scribble
