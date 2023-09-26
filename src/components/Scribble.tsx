import React from "react"
import Image from "next/image"

type ScribbleProps = {
	src: string
	className: string
}

type ScribblesProps = {
	scribblesSvgs: ScribbleProps[]
}

const Scribble = ({ scribblesSvgs }: ScribblesProps) => {
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
