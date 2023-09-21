"use client"

import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/firebase'
import { StudentDataProvider } from "@/context/StudentDataContext"
import ClassNav from "@/components/classroom/ClassNav"
import CurrentDate from "@/components/classroom/DateComponent"
import StudentGrid from "@/components/classroom/studentGrid/StudentGrid"
import TableGrid from "@/components/classroom/tableGrid/TableGrid"
import Toolbar from "@/components/classroom/Toolbar"
import Greeting from "@/components/classroom/Greeting"
import Weather from "@/components/WeatherData"
import Birthday from "@/components/classroom/Birthday"
import Scribble from "@/components/Scribble"
import Preloader from "@/components/Preloader"
import SwitchGridView from "@/components/classroom/SwitchGridView"
import paperBg from "../../../public/assets/paperbg.jpg"

const DemoClass = () => {
  const [user, loading] = useAuthState(auth)
  const [toolbarMenu, setToolbarMenu] = useState(false)
  const [showTableGrid, setShowTableGrid] = useState(false)
  const router = useRouter()


  const handleToolbar = () => {
    setToolbarMenu(!toolbarMenu)
  }

  const scribblesSvgs = [
    { src: '/assets/Scribbles/4.svg', className: 'hidden md:block absolute top-36 left-10 w-[50px] md:w-[120px] rotate-45' },
    { src: '/assets/Scribbles/51.svg', className: 'absolute bottom-10 right-20 w-[75px] md:w-[150px] rotate-12' },
    { src: '/assets/Scribbles/37.svg', className: 'absolute hidden lg:block top-60 right-16 md:right-80 w-[50px] md:w-[100px]' },
    { src: '/assets/Scribbles/9.svg', className: "absolute bottom-16 left-2 w-[150px] md:w-[200px]" },
    { src: '/assets/Scribbles/67.svg', className: "absolute top-72 sm:top-56 left-10 md:left-64 w-[50px] md:w-[75px]" },
    { src: '/assets/Scribbles/25.svg', className: "absolute top-10 right-5 w-[50px] md:w-[100px]" },
    { src: '/assets/Scribbles/2.svg', className: "hidden md:block absolute top-0 left-96 w-[160px] rotate-45" },
  ]

  useEffect(() => {
    if (loading) {
      // Handle loading state
      return // Don't proceed until loading is complete
    }

    if (!user) {
      router.push("/auth/login")
    }
  }, [user, loading])

  if (loading) return <Preloader />

  return (
    <StudentDataProvider>
      <header>
        <ClassNav handleToolbar={handleToolbar} />
      </header>
      <main className="relative min-h-screen w-full bg-blue-100" style={{ backgroundImage: `url(${paperBg.src})`, backgroundSize: "auto" }}>
        <Scribble scribblesSvgs={scribblesSvgs} />
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
              <SwitchGridView showTableGrid={showTableGrid} setShowTableGrid={setShowTableGrid} />
            </div>
            {showTableGrid ? <TableGrid /> : <StudentGrid />}
          </div>
        </div>
      </main>
    </StudentDataProvider>
  )
}

export default DemoClass