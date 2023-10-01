"use client"

import React, { useContext, createContext, useEffect, useState } from "react"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	sendPasswordResetEmail
} from "firebase/auth"
import { auth } from "../utils/firebase"
import {
	UserCredential,
	User,
	updateEmail,
	updatePassword
} from "firebase/auth"

type AuthContextType = {
	signup: (email: string, password: string) => Promise<UserCredential>
	login: (email: string, password: string) => Promise<UserCredential>
	googleLogin: () => Promise<UserCredential>
	logout: () => Promise<void>
	resetPassword: (email: string) => Promise<void>
	updateUserEmail: (email: string) => Promise<void>
	updateUserPassword: (password: string) => Promise<void>
	currentUser: User | null
}

const AuthContext = createContext<AuthContextType>(null)

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(true)
	const [currentUser, setCurrentUser] = useState<User | null>()

	const signup = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const googleLogin = () => {
		const googleProvider = new GoogleAuthProvider()
		return signInWithPopup(auth, googleProvider)
	}

	const logout = () => {
		return signOut(auth)
	}

	const resetPassword = (email: string) => {
		return sendPasswordResetEmail(auth, email)
	}

	const updateUserEmail = (email: string) => {
		return updateEmail(currentUser, email)
	}

	const updateUserPassword = (password: string) => {
		return updatePassword(currentUser, password)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setCurrentUser(currentUser)
			setLoading(false)
		})
		return unsubscribe
	}, [])

	return (
		<AuthContext.Provider
			value={{
				signup,
				login,
				googleLogin,
				logout,
				resetPassword,
				updateUserEmail,
				updateUserPassword,
				currentUser
			}}
		>
			{!loading && children}
		</AuthContext.Provider>
	)
}
