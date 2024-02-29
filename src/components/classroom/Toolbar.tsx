"use client";

import React, { useState } from "react";
import Randomiser from "./toolbar/Randomiser";
import Instructions from "./toolbar/instructions/Instructions";
import Timer from "./toolbar/Timer";
import TaskList from "./toolbar/TaskList";
import { RiTimerFill } from "react-icons/ri";
import { GiCardRandom } from "react-icons/gi";
import { LuListChecks } from "react-icons/lu";
import { ImListNumbered } from "react-icons/im";

type ToolbarIconProps = {
  icon: React.ReactNode;
  text: string;
  tasks?: number;
  onClick: () => void;
};

type ToolbarProps = {
  toolbarMenu: boolean;
};

const ToolbarIcon = ({ icon, text, tasks, onClick }: ToolbarIconProps) => (
  <li className="z-[1000] relative flex items-center justify-center h-12 w-12 shadow-lg bg-gray-300 hover:bg-slate-400 rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear group">
    <button
      className="w-full h-full flex items-center justify-center"
      onClick={onClick}
    >
      {icon}
    </button>
    <span className="absolute w-auto p-2 m-2 min-w-max left-16 rounded-md shadow-sm text-white bg-gray-600 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
      {text}
    </span>
    {tasks > 0 && (
      <span className="flex justify-center items-center absolute top-[-1.5rem] left-7 w-6 h-6 bg-red-500 text-white text-sm rounded-full">
        {tasks}
      </span>
    )}
  </li>
);

const Toolbar = ({ toolbarMenu }: ToolbarProps) => {
  const [openRandomiser, setOpenRandomiser] = useState(false);
  const [openInstructions, setOpenInstructions] = useState(false);
  const [openTimer, setOpenTimer] = useState(false);
  const [openTaskList, setOpenTaskList] = useState(false);
  const [remainingTasks, setRemainingTasks] = useState(0);

  const handleTimerClick = () => {
    setOpenTimer(!openTimer);
  };

  const handleRandomStudentClick = () => {
    setOpenRandomiser(!openRandomiser);
  };

  const handleTaskListClick = () => {
    setOpenTaskList(!openTaskList);
  };

  const handleInstructionsClick = () => {
    setOpenInstructions(!openInstructions);
  };

  return (
    <aside className="z-[10]">
      <div
        className={
          toolbarMenu
            ? "z-10 fixed top-0 left-0 bottom-0 md:static min-h-screen h-full w-20 flex flex-col items-center bg-white ease-in-out duration-300"
            : "z-10 overflow-x-hidden fixed top-0 left-[-30%] md:static min-h-screen h-full w-0 flex flex-col items-center bg-white ease-in-out duration-300"
        }
      >
        <ul
          className={
            toolbarMenu
              ? "flex flex-col justify-evenly md:justify-normal items-center md:mt-48 md:gap-32 h-full w-full text-iconClr z-10 pb-6"
              : "flex flex-col justify-evenly md:justify-normal items-center md:mt-48 md:gap-32 h-full text-iconClr z-10 pb-6 w-0"
          }
        >
          <ToolbarIcon
            icon={<RiTimerFill size={26} />}
            text="Countdown Timer"
            onClick={handleTimerClick}
          />
          <ToolbarIcon
            icon={<LuListChecks size={35} />}
            text="Task-List"
            tasks={remainingTasks}
            onClick={handleTaskListClick}
          />
          <ToolbarIcon
            icon={<GiCardRandom size={26} />}
            text="Random Student"
            onClick={handleRandomStudentClick}
          />
          <ToolbarIcon
            icon={<ImListNumbered size={26} />}
            text="Instructions"
            onClick={handleInstructionsClick}
          />
        </ul>
      </div>

      <Timer openTimer={openTimer} setOpenTimer={setOpenTimer} />
      <Randomiser
        openRandomiser={openRandomiser}
        setOpenRandomiser={setOpenRandomiser}
      />
      <TaskList
        openTaskList={openTaskList}
        setOpenTaskList={setOpenTaskList}
        setRemainingTasks={setRemainingTasks}
      />
      <Instructions
        openInstructions={openInstructions}
        setOpenInstructions={setOpenInstructions}
      />
    </aside>
  );
};

export default Toolbar;
