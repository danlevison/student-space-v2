"use client"

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "./firebase"

export const googleLogin = async (router) => {
	try {
		const googleProvider = new GoogleAuthProvider()
		const result = await signInWithPopup(auth, googleProvider)
		const userDocRef = doc(db, "users", result.user.uid)
		const docSnap = await getDoc(userDocRef)

		if (docSnap.exists()) {
			router.push("/dashboard") // Redirect user to the dashboard
			return
		}

		// User data does not exist, create a new user document
		await setDoc(userDocRef, {
			name: result.user.displayName,
			createdAt: serverTimestamp()
		})
	} catch (error) {
		console.error(error)
	}
}
