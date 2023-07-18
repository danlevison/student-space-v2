"use client"

import React, {useEffect} from 'react'
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from "../../utils/firebase"
import { setDoc, doc, getDoc } from "firebase/firestore"
import Nav from "../../components/Nav"
import Scribble from "../../components/Scribble"

const Login = () => {
    const [user, loading] = useAuthState(auth)
    const router = useRouter()

    // Sign in with Google
    const googleProvider = new GoogleAuthProvider()
    const googleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider)
        const userDocRef = doc(db, "users", result.user.uid)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
          // User data already exists, handle accordingly
          console.log("User already exists")
          router.push("/dashboard") // Redirect user to the dashboard
          return;
        }

        // User data does not exist, create new user document
        await setDoc(userDocRef, {
          name: result.user.displayName,
          className: "",
          isClassMade: false,
        })
    
        if(loading) <h1>Loading...</h1> //TODO: Check if this works.
        router.push("/dashboard") // Redirect user to the dashboard
        } catch (error) {
          console.error(error)
        }
    }

    // Redirect user to dashboard if user is already logged in and tries to go to login page.
    useEffect(() => {
        if(user) {
            router.push("/dashboard")
        } else {
            console.log("login")
        }
    }, [user])

    const scribblesSvgs = [
      { src: '/assets/Scribbles/67.svg', alt: 'Bolt scribble', className: 'absolute top-32 left-10 w-[75px] md:w-[150px]' },
      { src: '/assets/Scribbles/37.svg', alt: 'Circle scribble', className: 'absolute bottom-1 right-20 w-[75px] md:w-[150px] rotate-12' },
      { src: '/assets/Scribbles/66.svg', alt: 'Yellow flower scribble', className: 'absolute top-60 right-16 md:right-80 w-[50px] md:w-[100px]' },
      { src: '/assets/Scribbles/5.svg', alt: 'Scribble', className: "absolute bottom-16 left-2 w-[150px] md:w-[200px]" },
      { src: '/assets/Scribbles/55.svg', alt: 'Star scribble', className: "absolute bottom-72 right-2 sm:right-7 md:right-32 lg:right-56 w-[40px] md:w-[75px]" },
      { src: '/assets/Scribbles/39.svg', alt: 'Triangle scribble', className: "absolute top-72 left-24 md:top-72 md:left-72 w-[30px] md:w-[40px]" },
      { src: '/assets/Scribbles/27.svg', alt: 'Pink circles scribble', className: "absolute top-10 right-5 w-[75px] md:w-[100px]" },
      { src: '/assets/Scribbles/9.svg', alt: 'Yellow, pink and red scribble', className: "hidden md:block absolute top-10 w-[150px] rotate-180" },
      { src: '/assets/Scribbles/48.svg', alt: 'Black cirlce scribble', className: "hidden md:block absolute bottom-32 w-[25px] rotate-180" },
      { src: '/assets/Scribbles/34.svg', alt: 'Black triangle scribble', className: "hidden md:block absolute left-24 lg:left-80 xl:left-96 w-[25px] rotate-180" },
      { src: '/assets/Scribbles/28.svg', alt: 'Black squiggle scribble', className: "hidden md:block absolute right-24 lg:right-80 xl:right-96 w-[50px] rotate-180" },
    ]

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="py-16 px-10 min-h-screen flex flex-col items-center justify-center relative">
          <Scribble scribblesSvgs={scribblesSvgs} />
          <div className="text-center shadow-xl text-secondaryTextClr mt-24 py-8 px-5 sm:p-10 rounded-lg bg-[#fbe8de] z-50">
              <h1 className="text-3xl md:text-4xl font-bold">Sign in</h1>
              <div className="py-4">
                  <h3 className="md:text-lg">Sign in with your Google account</h3>
              </div>
              <div>
                  <button onClick={googleLogin} className="flex justify-center items-center gap-4 w-full text-primaryTextClr bg-gray-600 p-4 font-medium rounded-lg">
                      <FcGoogle size={30}/> 
                      Sign in with Google
                  </button>
              </div>
            </div>
      </main>
    </>
  )
}

export default Login