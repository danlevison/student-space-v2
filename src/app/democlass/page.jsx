"use client"

import React, {useEffect, useState} from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { DemoStudentDataProvider } from "../../DemoStudentDataContext"
import Options from "../../components/democlass/options/Options"
import CurrentDate from "../../components/democlass/date"
import StudentGrid from "../../components/democlass/StudentGrid/StudentGrid"
import TableGrid from "../../components/democlass/TableGrid/TableGrid"
import Toolbar from "../../components/democlass/Toolbar"
import Weather from "../../components/democlass/Weather"
import { HiMenuAlt4 } from "react-icons/hi"
import { FaHome } from "react-icons/fa"

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

  return (
    <DemoStudentDataProvider>
      <main className="min-h-screen w-full bg-sky-200">

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
          <aside>
            <Toolbar toolbarMenu={toolbarMenu} setToolbarMenu={setToolbarMenu} />
          </aside>
          
          <div className="flex flex-col mx-auto w-full py-20">
            <div className="flex flex-col justify-center items-center pb-10 sm:pb-0">
              <h1 className="text-3xl md:text-4xl lg:text-6xl text-center">Good Morning, 4N!</h1>
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
    </DemoStudentDataProvider>
  )
}

export default DemoClass