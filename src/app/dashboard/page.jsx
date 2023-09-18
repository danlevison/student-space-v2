"use client"

import React, { useState, useEffect, useContext } from 'react'
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../utils/firebase'
import { getDocs, collection } from "firebase/firestore"
import CreateClass from "../../components/CreateClass"
import { IoMdSettings } from 'react-icons/io'
import Nav from "@/components/Nav"
import EditClass from "@/components/democlass/options/editClass/EditClass"
import WordOfTheDay from "@/components/WordOfTheDay"
import Preloader from "@/components/Preloader"
import bagAvatar from "../../../public/assets/avatars/bag.svg"
import arrowScribble from "@/../../public/assets/Scribbles/70.svg"

const Dashboard = () => {
  const [user, loading] = useAuthState(auth)
  const [classData, setClassData] = useState([])
  const [shouldFetchClassData, setShouldFetchClassData] = useState(true)
  const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)
  const router = useRouter()
  const creationTime = user?.metadata.creationTime
  const lastSignInTime = user?.metadata.lastSignInTime

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        if(user) {
          const userClassesRef = collection(db, "users", user.uid, "classes")
          const querySnapshot = await getDocs(userClassesRef)
          const data = []
  
          querySnapshot.forEach((doc) => {
            const classId = doc.id
            const className = doc.data().className
            const classAvatar = doc.data().classAvatar

            // Store classId and userClassName as an object
            data.push({ classId, className, classAvatar})
          })
  
          setClassData(data)
          setShouldFetchClassData(false)
        }
      } catch (error) {
        console.error("Error fetching class data:", error)
      }
    }

    fetchClassData()
  }, [user, isEditClassModalOpen, shouldFetchClassData])

  const handleEditClass = (classData) => {
    setSelectedClass(classData)
    setIsEditClassModalOpen(true)
  }

  useEffect(() => {
    if (loading) {
      // Handle loading state
      return // Don't proceed until loading is complete
    }

    if (!user) {
      router.push("/login")
    }
  }, [user, loading])

  if (loading) return <Preloader />

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="py-40 px-8 min-h-screen">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl sm:text-7xl font-cabinSketch font-[700] mb-12">
            {creationTime === lastSignInTime ? "Welcome!" : "Welcome Back!"}
          </h1>
          {/* <WordOfTheDay /> */}
            <div className="relative grid grid-cols-[repeat(auto-fit,minmax(230px,230px))] gap-10 w-full items-center justify-center mt-12">
                <div className="relative w-[230px] h-[230px] bg-white border border-[#5065A8] shadow-lg rounded-2xl hover:scale-105 duration-300 ease-out">
                  <Link href={"/democlass"}>
                    <div className="flex flex-col justify-center items-center h-full gap-4">
                      <Image
                        className="rounded-xl border-2 border-black bg-orange-100 p-2" 
                        src={bagAvatar}
                        alt="Class avatar"
                        priority
                        width={100}
                        height={100}
                      />
                      <h2 className="text-4xl font-cabinSketch font-[400]">Demo Class</h2>
                    </div>
                  </Link>
                </div>
                {creationTime === lastSignInTime && (
                  <div className="hidden md:flex flex-col gap-5 absolute bottom-[-65%] md:left-[-55%] select-none">
                    <Image src={arrowScribble} alt="" role="presentation" className="scale-y-[-1] -rotate-45" />
                    <p className="-rotate-[15deg] md:text-3xl lg:text-4xl font-cabinSketch text-green-900">Try the Demo Class!</p>
                  </div>
                )}

                {classData.map((userClass) => (
                  <div key={userClass.classId} className="relative w-[230px] h-[230px] bg-white border border-[#5065A8] shadow-lg rounded-2xl hover:scale-105 duration-300 ease-out">
                    <Link href={`/classroom/${userClass.classId}`}>
                      <div className="flex flex-col justify-center items-center h-full gap-4">
                        <Image
                          className="rounded-xl border-2 border-black bg-blue-100 p-2"
                          src={userClass.classAvatar}
                          alt="Class avatar"
                          priority
                          width={100}
                          height={100}
                        />
                        <h2 className="text-4xl font-cabinSketch font-[400]">
                          {userClass.className.length > 12
                            ? `${userClass.className.slice(0, 12)}...`
                            : userClass.className}
                        </h2>
                      </div>
                    </Link>
                    <button onClick={() => handleEditClass(userClass)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                      <IoMdSettings size={30} />
                    </button>
                  </div>
                ))}

                <EditClass 
                  isEditClassModalOpen={isEditClassModalOpen} 
                  setIsEditClassModalOpen={setIsEditClassModalOpen} 
                  classData={selectedClass}
                />
              <CreateClass setShouldFetchClassData={setShouldFetchClassData} />
            </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard
