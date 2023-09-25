import React from "react"
import Image from "next/image"

const Scribble = ({ scribblesSvgs }) => {
	return (
		<>
			{scribblesSvgs.map((scribble) => (
				<Image
					key={scribble.src}
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
