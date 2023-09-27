import React from "react"
import Link from "next/link"
import CurrentDate from "./DateComponent"
import Options from "./options/Options"
import { HiMenuAlt4, HiChevronLeft } from "react-icons/hi"
import { FaHome } from "react-icons/fa"

type ClassNavProps = {
	toolbarMenu: boolean
	setToolbarMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const ClassNav = ({ toolbarMenu, setToolbarMenu }: ClassNavProps) => {
	const handleToolbar = () => {
		setToolbarMenu(!toolbarMenu)
	}

	return (
		<nav className="bg-white fixed z-[20] top-0 h-12 w-full px-8">
			<ul className="flex items-center gap-8">
				<li className="relative group">
					<button
						onClick={handleToolbar}
						aria-label="Toggle toolbar"
					>
						{toolbarMenu ? (
							<HiChevronLeft
								size={30}
								className="text-buttonClr mt-3"
								aria-label="Close toolbar"
							/>
						) : (
							<HiMenuAlt4
								size={30}
								className="text-buttonClr mt-3"
								aria-label="Open toolbar"
							/>
						)}
					</button>
					<span className="absolute w-auto p-2 mt-4 min-w-max left-0 top-10 rounded-md shadow-sm text-white bg-gray-600 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100">
						Toolbar
					</span>
				</li>
				<li className="relative group">
					<Link
						href={"/dashboard"}
						aria-label="Dashboard"
					>
						<FaHome
							size={30}
							className="text-buttonClr"
						/>
					</Link>
					<span className="absolute w-auto p-2 mt-2 min-w-max left-0 top-10 rounded-md shadow-sm text-white bg-gray-600 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100">
						Dashboard
					</span>
				</li>
				<li className="hidden sm:block">
					<CurrentDate />
				</li>
				<li className="ml-auto">
					<Options />
				</li>
			</ul>
		</nav>
	)
}

export default ClassNav
