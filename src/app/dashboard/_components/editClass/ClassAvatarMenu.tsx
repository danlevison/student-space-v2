import React, { Fragment } from "react"
import Image from "next/image"
import { Menu, Transition } from "@headlessui/react"
import { AiFillCaretDown } from "react-icons/ai"
// Avatars
import bagAvatar from "@/../../public/assets/avatars/bag.svg"
import origamiAvatar from "@/../../public/assets/avatars/origami.svg"
import bookBagAvatar from "@/../../public/assets/avatars/bookbag.svg"
import glueAvatar from "@/../../public/assets/avatars/glue.svg"
import rulerAvatar from "@/../../public/assets/avatars/ruler.svg"
import scissorsAvatar from "@/../../public/assets/avatars/scissors.svg"
import sketchbookAvatar from "@/../..//public/assets/avatars/sketchbook.svg"
import compassAvatar from "@/../../public/assets/avatars/compass.svg"
import footballAvatar from "@/../../public/assets/avatars/football.svg"
import photosynthesisAvatar from "@/../../public/assets/avatars/photosynthesis.svg"
import hourglassAvatar from "@/../../public/assets/avatars/hourglass.svg"
import solarSystemAvatar from "@/../..//public/assets/avatars/solar-system.svg"

type ClassAvatarMenuProps = {
	userClassAvatar:
		| string
		| {
				height: number
				width: number
				blurWidth: number
				src: string
				blurHeight: number
		  }
	setUserClassAvatar: React.Dispatch<
		React.SetStateAction<
			| string
			| {
					height: number
					width: number
					blurWidth: number
					src: string
					blurHeight: number
			  }
		>
	>
}

type MenuItemDataProps = {
	imageSrc: string
	alt: string
	onClick: () => void
}

const ClassAvatarMenu = ({
	userClassAvatar,
	setUserClassAvatar
}: ClassAvatarMenuProps) => {
	const menuItemData: MenuItemDataProps[] = [
		{
			imageSrc: origamiAvatar,
			alt: "Origami Avatar",
			onClick: () => setUserClassAvatar(origamiAvatar)
		},
		{
			imageSrc: bagAvatar,
			alt: "Bag Avatar",
			onClick: () => setUserClassAvatar(bagAvatar)
		},
		{
			imageSrc: glueAvatar,
			alt: "Glue Avatar",
			onClick: () => setUserClassAvatar(glueAvatar)
		},
		{
			imageSrc: scissorsAvatar,
			alt: "Scissors Avatar",
			onClick: () => setUserClassAvatar(scissorsAvatar)
		},
		{
			imageSrc: rulerAvatar,
			alt: "Ruler Avatar",
			onClick: () => setUserClassAvatar(rulerAvatar)
		},
		{
			imageSrc: bookBagAvatar,
			alt: "Book Bag Avatar",
			onClick: () => setUserClassAvatar(bookBagAvatar)
		},
		{
			imageSrc: sketchbookAvatar,
			alt: "Sketchbook Avatar",
			onClick: () => setUserClassAvatar(sketchbookAvatar)
		},
		{
			imageSrc: compassAvatar,
			alt: "Compass Avatar",
			onClick: () => setUserClassAvatar(compassAvatar)
		},
		{
			imageSrc: footballAvatar,
			alt: "Football Avatar",
			onClick: () => setUserClassAvatar(footballAvatar)
		},
		{
			imageSrc: photosynthesisAvatar,
			alt: "Photosynthesis Avatar",
			onClick: () => setUserClassAvatar(photosynthesisAvatar)
		},
		{
			imageSrc: hourglassAvatar,
			alt: "Hourglass Avatar",
			onClick: () => setUserClassAvatar(hourglassAvatar)
		},
		{
			imageSrc: solarSystemAvatar,
			alt: "Solar System Avatar",
			onClick: () => setUserClassAvatar(solarSystemAvatar)
		}
	]

	return (
		<Menu
			as="div"
			className="inline-block mt-[-2em]"
		>
			<div>
				<Menu.Button
					type="button"
					className="relative inline-flex w-full items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				>
					{userClassAvatar && (
						<Image
							className="rounded-xl border-2 border-black bg-white p-3"
							src={userClassAvatar}
							alt={"Class avatar"}
							width={90}
							height={90}
						/>
					)}
					<AiFillCaretDown
						className="absolute bottom-[-1em] text-iconClr"
						size={15}
						aria-hidden="true"
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute overflow-auto h-full max-h-[310px] min-h-[30vh] w-[80%] max-w-[420px] left-[50%] translate-x-[-50%] grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4 mt-2 p-4 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					{menuItemData.map((menuItem, index) => (
						<Menu.Item
							as="a"
							key={index}
							className="w-full"
						>
							<button
								onClick={menuItem.onClick}
								type="button"
								className="group flex justify-center items-center rounded-xl border-2 border-black p-2 hover:scale-105 duration-300"
							>
								<Image
									src={menuItem.imageSrc}
									alt={menuItem.alt}
									width={60}
									height={60}
									aria-hidden="true"
								/>
							</button>
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default ClassAvatarMenu
