"use client"

import React, {useEffect, useState} from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { StudentDataProvider } from "@/StudentDataContext"
import Options from "@/components/democlass/options/Options"
import CurrentDate from "@/components/democlass/DateComponent"
import StudentGrid from "@/components/democlass/student/StudentGrid"
import TableGrid from "@/components/democlass/table/TableGrid"
import Toolbar from "@/components/democlass/Toolbar"
import Greeting from "@/components/democlass/Greeting"
import Weather from "@/components/democlass/Weather"
import Birthday from "@/components/democlass/Birthday"
import { HiMenuAlt4 } from "react-icons/hi"
import { FaHome } from "react-icons/fa"
import paperBg from "../../../public/assets/paperbg.jpg"
import Scribble from "../../components/Scribble"

const DemoClass = () => {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const [toolbarMenu, setToolbarMenu] = useState(false)
  const [showTableGrid, setShowTableGrid] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user])

  const handleToolbar = () => {
    setToolbarMenu(!toolbarMenu)
  }

  const handleShowTableGrid = () => {
    setShowTableGrid(true)
  }

  const handleShowStudentGrid = () => {
    setShowTableGrid(false)
  }

  if (loading) return <h1>Loading...</h1>

  const scribblesSvgs = [
    { src: '/assets/Scribbles/4.svg', alt: 'Red and white dot scribble', className: 'hidden md:block absolute top-36 left-10 w-[50px] md:w-[120px] rotate-45' },
    { src: '/assets/Scribbles/51.svg', alt: 'Black triangles scribble', className: 'absolute bottom-10 right-20 w-[75px] md:w-[150px] rotate-12' },
    { src: '/assets/Scribbles/37.svg', alt: 'Yellow, white and red circle scribble', className: 'absolute hidden lg:block top-60 right-16 md:right-80 w-[50px] md:w-[100px]' },
    { src: '/assets/Scribbles/9.svg', alt: 'Yellow, pink and red arch scribble', className: "absolute bottom-16 left-2 w-[150px] md:w-[200px]" },
    { src: '/assets/Scribbles/67.svg', alt: 'Bolt scribble', className: "absolute top-52 left-10 md:left-72 w-[50px] md:w-[75px]" },
    { src: '/assets/Scribbles/25.svg', alt: 'Blue and black scribble', className: "absolute top-10 right-5 w-[50px] md:w-[100px]" },
    { src: '/assets/Scribbles/2.svg', alt: 'Yellow and black scribble', className: "hidden md:block absolute top-0 left-96 w-[160px] rotate-45" },
  ]

  return (
    <StudentDataProvider>
      <main className="relative min-h-screen w-full bg-blue-100" style={{ backgroundImage: `url(${paperBg.src})`, backgroundSize: "auto" }}>
        <Scribble scribblesSvgs={scribblesSvgs} />
        <nav className="bg-white fixed z-[20] top-0 h-12 w-full px-8">
          <ul className="flex items-center gap-8">
            <li className="relative group">
              <button onClick={handleToolbar}>
                <HiMenuAlt4 size={30} className="text-buttonClr mt-3" />
              </button>
              <span className="absolute w-auto p-2 mt-4 min-w-max left-0 top-10 rounded-md shadow-sm text-white bg-gray-600 text-xs font-bold transition-all duration-100 scale-0 group-hover:scale-100">
                Toolbar
              </span>
            </li>
            <li className="relative group">
              <Link href={"/dashboard"}>
                <FaHome size={30} className="text-buttonClr"/>
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

        <div className="flex">
          <aside className="z-[10]">
            <Toolbar toolbarMenu={toolbarMenu} setToolbarMenu={setToolbarMenu} />
          </aside>
          
          <div className="flex flex-col mx-auto w-full py-20 z-0">
            <div className="flex flex-col justify-center items-center pb-10 sm:pb-0 px-8">
              <Greeting />
              <Birthday />
              <CurrentDate />
              <Weather />
              <div className="flex items-center gap-10 pb-4">
                <button 
                onClick={handleShowStudentGrid}
                className={showTableGrid === false ? "text-lg text-buttonClr font-bold underline" : "text-lg font-bold hover:scale-105 duration-300"}
                >
                  Students
                </button>
                <button 
                onClick={handleShowTableGrid}
                className={showTableGrid ? "text-lg text-buttonClr font-bold underline" : "text-lg font-bold hover:scale-105 duration-300"}
                >
                  Tables
                </button>
              </div>
            </div>
            {showTableGrid ? <TableGrid /> : <StudentGrid />}
          </div>
        </div>
      </main>
    </StudentDataProvider>
  )
}

export default DemoClass