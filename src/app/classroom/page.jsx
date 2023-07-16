"use client"

import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../utils/firebase';
import { doc, getDoc } from "firebase/firestore"; 

const Classroom = () => {
  const [user, loading] = useAuthState(auth);
  const [classname, setClassname] = useState('');
  const router = useRouter();

    // Fetches the classname data from the Firestore db
    useEffect(() => {
      const fetchClassName = async () => {
        try {
          if (!user) return; // Check if user object is null
          const docRef = doc(db, "users", user.uid)
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setClassname(data.className || '');
          } else {
            console.log("Document does not exist");
          }
        } catch (error) {
          console.log(error);
        }
    }
    fetchClassName();
    }, [user])

  if (loading) return <h1>Loading...</h1>;
  if (!user) router.push("/login");

  return (
    <main>
         <h1>{classname ? `Welcome ${classname}` : 'Welcome'}</h1>
    </main>
  )
}

export default Classroom;