"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../utils/firebase'
import { updateDoc, doc, getDoc } from "firebase/firestore"
import CreateClass from "../../components/CreateClass"
import Link from "next/link"
import Nav from "@/components/Nav"

const Dashboard = () => {
  const [user, loading] = useAuthState(auth)
  const [userClassName, setUserClassName] = useState(null)
  const [isClassMade, setIsClassMade] = useState(false)
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
          console.log("A new Document Field has been added to the user document")
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

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user])

  if (loading) return <h1>Loading...</h1>

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="py-40 min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl lg:text-5xl">Welcome!</h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-12 w-full h-full">
            <Link href={"/democlass"}>
              <div className="w-[192px] h-[192px] bg-white border border-[#5065A8] shadow-lg rounded-2xl hover:scale-105 duration-300 ease-out">
                  <div className="flex flex-col justify-center items-center h-full">
                    <p className="text-lg">Demo Class</p>
                  </div>
              </div>
            </Link>

            {isClassMade && 
            <Link href={"/classroom"}>
              <div className="w-[192px] h-[192px] bg-white border border-[#5065A8] shadow-lg rounded-2xl hover:scale-105 duration-300 ease-out">
                  <div className="flex flex-col justify-center items-center h-full">
                    <p className="text-lg">{userClassName}</p>
                  </div>
              </div>
            </Link>
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
