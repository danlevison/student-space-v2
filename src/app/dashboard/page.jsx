"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../utils/firebase';
import { updateDoc, doc, getDoc } from "firebase/firestore"; 
import CreateClass from "@/components/CreateClass";
import Link from "next/link";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [className, setClassName] = useState(null)
  const [isClassMade, setIsClassMade] = useState(false)
  const router = useRouter();
  
  // Fetches the classname and isClassMade data from the Firestore db
  useEffect(() => {
    const fetchClassName = async () => {
      try {
        if (!user) return; // Check if user object is null
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setClassName(data.className || ""); // Fetch the existing classname value from Firestore
          setIsClassMade(data.isClassMade); // Fetches the existing isClassMade value from Firestore 
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchClassName();
  }, [user]);
   
// Updates the users document and adds the fields classname and isClassMade with state values.
  useEffect(() => {
    if (!user) return; // Check if user object is null
    if (className !== null) {
      const updateClassName = async () => {
        try {
          const docRef = doc(db, "users", user.uid)
          await updateDoc(docRef, { className: className, isClassMade: isClassMade});
          console.log("A new Document Field has been added to the user document");
        } catch (error) {
          console.log(error);
        }
      };

      updateClassName();
    }
  }, [className, isClassMade, user]);

  const handleInputChange = (e) => {
    setClassName(e.target.value);
  };

  if (loading) return <h1>Loading...</h1>;
  if (!user) router.push("/login");

  return (
    <main className="py-32">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl lg:text-5xl">Welcome</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-12 w-full h-full">
          <Link href={"/democlass"}>
            <div className="w-[192px] h-[192px] bg-white border border-[#5065A8] rounded-2xl hover:scale-105 duration-300 ease-out">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-lg">Demo Class</p>
                </div>
            </div>
          </Link>

          {isClassMade && 
          <Link href={"/classroom"}>
            <div className="w-[192px] h-[192px] bg-white border border-[#5065A8] rounded-2xl hover:scale-105 duration-300 ease-out">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-lg">{className}</p>
                </div>
            </div>
          </Link>
          }

          {!isClassMade &&
          <CreateClass handleInputChange={handleInputChange} setIsClassMade={setIsClassMade} />
          }
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
