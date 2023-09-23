import React from "react"
import Link from "next/link"
import CurrentDate from "./DateComponent"
import Options from "./options/Options"
import { HiMenuAlt4 } from "react-icons/hi"
import { FaHome } from "react-icons/fa"

const ClassNav = ({ handleToolbar, paramId }) => {
	return (
		<nav className="bg-white fixed z-[20] top-0 h-12 w-full px-8">
			<ul className="flex items-center gap-8">
				<li className="relative group">
					<button onClick={handleToolbar}>
						<HiMenuAlt4
							size={30}
							className="text-buttonClr mt-3"
						/>
					</button>
					<span className="absolute w-auto p-2 mt-4 min-w-max left-0 top-10 rounded-md shadow-sm text-white bg-gray-600 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100">
						Toolbar
					</span>
				</li>
				<li className="relative group">
					<Link href={"/dashboard"}>
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
					<Options paramId={paramId} />
				</li>
			</ul>
		</nav>
	)
}

export default ClassNav
