import React from 'react'
import { RiTimerFill } from "react-icons/ri"
import { GiCardRandom } from "react-icons/gi"
import { GoTasklist } from "react-icons/go"
import { RiArrowLeftSLine } from "react-icons/ri"
import { AiOutlineUnorderedList } from "react-icons/ai"

const ToolbarIcon = ({ icon, text }) => (
  <li className="z-[1000] relative flex items-center justify-center h-12 w-12 shadow-lg bg-gray-300 hover:bg-slate-400 rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear group">
    <button className="w-full h-full flex items-center justify-center">
      {icon}
    </button>
    <span className="absolute w-auto p-2 m-2 min-w-max left-16 rounded-md shadow-sm text-white bg-gray-600 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
      {text}
    </span>
  </li>
)

const Toolbar = ({ toolbarMenu, setToolbarMenu }) => {
  return (
      <div
        className={toolbarMenu ? 
          "z-[1000] fixed top-0 left-0 md:static h-full w-20 flex flex-col items-center bg-white ease-in-out duration-300"
        : "overflow-x-hidden z-[1000] fixed top-0 left-[-30%] md:static h-full w-0 flex flex-col items-center bg-white ease-in-out duration-300"}
      >
        <button onClick={() => setToolbarMenu(false)} className="pt-3 sm:hidden z-[1000]">
          <RiArrowLeftSLine size={30} className="text-buttonClr"/>
        </button>
        <ul className="flex flex-col justify-evenly items-center h-full text-iconClr z-10">
          <ToolbarIcon icon={<RiTimerFill size={26} />} text="Timer" />
          <ToolbarIcon icon={<GiCardRandom size={26} />} text="Random Student" />
          <ToolbarIcon icon={<GoTasklist size={26} />} text="Task-List" />
          <ToolbarIcon icon={<AiOutlineUnorderedList size={26} />} text="Instructions" />
        </ul>
      </div>
  )
}

export default Toolbar