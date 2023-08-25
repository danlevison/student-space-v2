import React, {useState} from 'react'
import Randomiser from "./toolbar/Randomiser"
import Instructions from "./toolbar/instructions/Instructions"
import Timer from "./toolbar/Timer"
import { RiTimerFill } from 'react-icons/ri'
import { GiCardRandom } from 'react-icons/gi'
import { GoTasklist } from 'react-icons/go'
import { AiOutlineUnorderedList } from 'react-icons/ai'

const ToolbarIcon = ({ icon, text, onClick }) => (
  <li className="z-[1000] relative flex items-center justify-center h-12 w-12 shadow-lg bg-gray-300 hover:bg-slate-400 rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear group">
    <button className="w-full h-full flex items-center justify-center" onClick={onClick}>
      {icon}
    </button>
    <span className="absolute w-auto p-2 m-2 min-w-max left-16 rounded-md shadow-sm text-white bg-gray-600 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
      {text}
    </span>
  </li>
)

const Toolbar = ({ toolbarMenu }) => {
  const [openRandomiser, setOpenRandomiser] = useState(false)
  const [openInstructions, setOpenInstructions] = useState(false)
  const [openTimer, setOpenTimer] = useState(false)

  const handleTimerClick = () => {
    // Handle Timer button click logic here
    setOpenTimer(!openTimer)
  }

  const handleRandomStudentClick = () => {
    setOpenRandomiser(!openRandomiser)
  }

  const handleTaskListClick = () => {
    // Handle Task List button click logic here
    console.log('Task List button clicked')
  }

  const handleInstructionsClick = () => {
    // Handle Instructions button click logic here
    setOpenInstructions(!openInstructions)
  }

  return (
    <>
      <div
        className={
          toolbarMenu
            ? 'z-10 fixed top-0 left-0 md:static min-h-screen h-full w-20 flex flex-col items-center bg-white ease-in-out duration-300'
            : 'z-10 overflow-x-hidden fixed top-0 left-[-30%] md:static min-h-screen h-full w-0 flex flex-col items-center bg-white ease-in-out duration-300'
        }
      >
        {/* <button onClick={() => setToolbarMenu(false)} className="pt-3">
          <RiArrowLeftSLine size={30} className="text-buttonClr"/>
        </button> */}
        <ul className="flex flex-col justify-evenly md:justify-normal items-center md:mt-48 md:gap-32 h-full text-iconClr z-10">
          <ToolbarIcon icon={<RiTimerFill size={26} />} text="Timer" onClick={handleTimerClick} />
          <ToolbarIcon
            icon={<GiCardRandom size={26} />}
            text="Random Student"
            onClick={handleRandomStudentClick}
          />
          <ToolbarIcon icon={<GoTasklist size={26} />} text="Task-List" onClick={handleTaskListClick} />
          <ToolbarIcon
            icon={<AiOutlineUnorderedList size={26} />}
            text="Instructions"
            onClick={handleInstructionsClick}
          />
        </ul>
      </div>
      
      <Timer openTimer={openTimer} setOpenTimer={setOpenTimer} />
      <Randomiser openRandomiser={openRandomiser} setOpenRandomiser={setOpenRandomiser} />
      <Instructions openInstructions={openInstructions} setOpenInstructions={setOpenInstructions} />
    </>
  )
}

export default Toolbar
