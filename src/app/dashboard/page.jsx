"use client"

import React, { useState, useEffect } from 'react'
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../utils/firebase'
import { updateDoc, doc, getDoc } from "firebase/firestore"
import CreateClass from "../../components/CreateClass"
import { IoMdSettings } from 'react-icons/io'
import Nav from "@/components/Nav"
import EditClass from "@/components/democlass/options/EditClass"
import Preloader from "@/components/Preloader"
import bagAvatar from "../../../public/assets/avatars/bag.svg"

const Dashboard = () => {
  const [user, loading] = useAuthState(auth)
  const [userClassName, setUserClassName] = useState(null)
  const [isClassMade, setIsClassMade] = useState(false)
  const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false)
  const [classAvatar, setClassAvatar] = useState("")
  const router = useRouter()

  // Fetches the classname and isClassMade data from the Firestore db
  useEffect(() => {
    const fetchClassName = async () => {
      try {
        if (!user) return // Check if user object is null
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setUserClassName(data.className) // Fetch the existing classname value from Firestore
          setIsClassMade(data.isClassMade) // Fetches the existing isClassMade value from Firestore
          setClassAvatar(data.classAvatar) //Fetches the existing classavatar image from Firestore
        } else {
          console.log("Document does not exist")
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    fetchClassName()
  }, [user])
   
// Updates the users document and adds the fields classname and isClassMade with state values.
  useEffect(() => {
    if (!user) return // Check if user object is null
    if (userClassName !== null) {
      const updateClassName = async () => {
        try {
          const docRef = doc(db, "users", user.uid)
          await updateDoc(docRef, { className: userClassName, isClassMade: isClassMade})
        } catch (error) {
          console.log(error)
        }
      }

      updateClassName()
    }
  }, [isClassMade, user])

  const handleInputChange = (e) => {
    setUserClassName(e.target.value.trim())
  }

  const ClassSettingsButton = () => {
    const handleButtonClick = () => {
      setIsEditClassModalOpen(!isEditClassModalOpen)
    }

  return (
    <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={handleButtonClick}>
      <IoMdSettings size={30} />
    </button>
  )
}

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else {
      router.push("/dashboard")
    }
  }, [user])

  if (loading) return <Preloader />

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="py-40 min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl sm:text-5xl">Welcome!</h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-12 w-full h-full">
            
              <div className="relative w-[230px] h-[230px] bg-white border border-[#5065A8] shadow-lg rounded-2xl hover:scale-105 duration-300 ease-out">
                <Link href={"/democlass"}>
                  <div className="flex flex-col justify-center items-center h-full gap-4">
                    <Image
                      className="rounded-xl border-2 border-black bg-orange-100 p-2" 
                      src={bagAvatar}
                      alt="/"
                      width={100}
                      height={100}
                    />
                    <h2 className="text-2xl">Demo Class</h2>
                  </div>
                </Link>
              </div>

            {isClassMade && 
              <div className="relative w-[230px] h-[230px] bg-white border border-[#5065A8] shadow-lg rounded-2xl hover:scale-105 duration-300 ease-out">
                <Link href={"/classroom"}>
                  <div className="flex flex-col justify-center items-center h-full gap-4">
                    <Image
                      className="rounded-xl border-2 border-black bg-blue-100 p-2" 
                      src={classAvatar}
                      alt="/"
                      width={100}
                      height={100}
                    />
                    <h2 className="text-2xl">{userClassName}</h2>
                  </div>
                </Link>
                <ClassSettingsButton  />
                <EditClass 
                  isEditClassModalOpen={isEditClassModalOpen} 
                  setIsEditClassModalOpen={setIsEditClassModalOpen} 
                  dbUserClassName={userClassName}
                  setDbUserClassName={setUserClassName}
                  classAvatar={classAvatar}
                  setClassAvatar={setClassAvatar} 
                  setIsClassMade={setIsClassMade} 
                />
              </div>
            }

            {!isClassMade &&
            <CreateClass 
              handleInputChange={handleInputChange} 
              setIsClassMade={setIsClassMade} 
              userClassName={userClassName} 
            />
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard
