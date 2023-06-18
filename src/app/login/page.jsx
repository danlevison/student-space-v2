"use client"

import React, {useEffect} from 'react';
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../../../utils/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore"; 

const page = () => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    // Sign in with Google
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const userDocRef = doc(db, "users", result.user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          // User data already exists, handle accordingly
          console.log("User already exists");
          router.push("/dashboard"); // Redirect user to the dashboard
          return;
        }

        // User data does not exist, create new user document
        await setDoc(userDocRef, {
          name: result.user.displayName,
          className: "",
          isClassMade: false,
        });
    
    console.log("New user document created");
    if(loading) <h1>Loading...</h1> //TODO: Check if this works.
    router.push("/dashboard"); // Redirect user to the dashboard
  } catch (error) {
    console.error(error);
  }
};
    
    // Redirect user to dashboard if user is already logged in and tries to go to login page.
    useEffect(() => {
        if(user) {
            router.push("/dashboard")
        } else {
            console.log("login")
        }
    }, [user]);

  return (
    <main className="py-16">
      <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
          <h2 className="text-3xl font-medium">Sign in</h2>
          <div className="py-4">
              <h3 className="py-4">Sign in with your Google account</h3>
          </div>
          <div className="">
              <button onClick={googleLogin} className="flex align-middle gap-4 text-white bg-gray-600 p-4 w-full font-medium rounded-lg">
                  <FcGoogle className="text-2xl "/> Sign in with Google
              </button>
          </div>
      </div>
    </main>
  )
}

export default page