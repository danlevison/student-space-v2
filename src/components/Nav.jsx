"use client"

import React, { useState} from 'react'
import Link from "next/link"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../utils/firebase"
import Logo from "../components/Logo"
import { FiMenu } from "react-icons/fi"
import { CgClose } from "react-icons/cg"

const Nav = () => {
  const [user, loading] = useAuthState(auth)
  const [nav, setNav] = useState(false)

  const handleNav = () => {
    setNav(!nav)
  }

  const NavLink = ({href, title, className=""}) => {
    return (
      <Link onClick={() => setNav(false)} scroll={false} href={href} className={`${className}`}>
        {title}
      </Link>
    )
  }

  return (
      <nav className="bg-white shadow-xl fixed top-0 w-full h-[6rem] z-[10] px-8">
        <div className="flex justify-between items-center gap-4 w-full h-full px-2 2xl:px-16">
          <Logo />
          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-16 font-bold text-[#5f5f7f]">
            <li>
              <NavLink href={"/"} title={"Home"} />
            </li>
            <li>
              <NavLink href={"/#about"} title={"About"} />
            </li>
            <li>
              {!user ?
                <NavLink href={"/login"} title={"Sign in"} />
                :
                <NavLink href={"/dashboard"} title={"Dashboard"} />
              }
            </li>
            {user && (
              <button onClick={() => auth.signOut()}>Sign out</button>
            )}
          </ul>
          <div onClick={handleNav} className="md:hidden cursor-pointer">
            <FiMenu size={30} className="text-[#5f5f7f]" />
          </div>
        </div>

        {/* Mobile */}
        <div className={nav ? "md:hidden fixed left-0 top-24 w-full h-screen bg-black/70" : ""}>
          <div className={
            nav 
            ? "fixed left-0 top-0 w-full text-center sm:text-left h-screen bg-white p-10 ease-in-out duration-700"
            : "fixed left-[-100%] top-0 p-10 ease-in-out duration-700 h-screen"}>
              <div>
                <div className="flex justify-between items-center pb-24">
                  <Logo closeNav={() => setNav(false)} />
                  <div onClick={handleNav}>
                    <CgClose size={30} className="text-[#5f5f7f]" />
                  </div>
                </div>
              
                <ul className="flex flex-col items-center gap-32 font-bold text-[#5f5f7f]">
                  <li>
                    <NavLink href={"/"} title={"Home"} />
                  </li>
                  <li>
                    <NavLink href={"/#about"} title={"About"} />
                  </li>
                  {user ?
                    <li>
                      <NavLink href={"/dashboard"} title={"Dashboard"} />
                    </li>
                    :
                    <li>
                      <NavLink href={"/login"} title={"Sign in"} />
                    </li>
                    }
                    {user && (
                      <button
                        onClick={() => {
                          auth.signOut()
                          setNav(false)
                        }}
                      >
                        Sign out
                      </button>
                    )}
                </ul>
              </div>
          </div>
        </div>
      </nav>
  )
}

export default Nav