"use client"

import React, {useEffect, useState, createContext} from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../utils/firebase'
import studentData from "../studentData"
import CurrentDate from "../../components/democlass/date"
import StudentGrid from "../../components/democlass/StudentGrid"
import Toolbar from "../../components/democlass/Toolbar"

const DemoStudentDataContext = createContext()

const DemoClass = () => {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const [demoStudentData, setDemoStudentData] = useState(studentData)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user])

  if (loading) return <h1>Loading...</h1>

  return (
    <DemoStudentDataContext.Provider value={{ demoStudentData, setDemoStudentData }}>
      <main className="min-h-screen w-full py-32 bg-sky-200">
        <div className="mx-auto w-full">
          <div className="flex flex-col justify-center items-center pb-10 sm:pb-0">
            <h1 className="text-3xl md:text-4xl lg:text-6xl text-center">Good Morning, 4N!</h1>
            <CurrentDate />
            <p className="text-lg py-4">Weather</p>
          </div>

          <StudentGrid />
          <Toolbar />
        </div>
      </main>
    </DemoStudentDataContext.Provider>
  )
}
export { DemoStudentDataContext }
export default DemoClass