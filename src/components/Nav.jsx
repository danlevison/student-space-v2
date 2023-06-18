"use client"

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../utils/firebase";
import Logo from "../../public/assets/student-space-logo.png"
import { FiMenu } from "react-icons/fi"
import { CgClose } from "react-icons/cg"


const Nav = () => {
  const [user, loading] = useAuthState(auth)
  const [nav, setNav] = useState(false)
  const [navBgColor, setNavBgColor] = useState("transparent");
  const [navLinkColor, setNavLinkColor] = useState("white")

  // Change background colour/nav link colour when user scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavBgColor("rgb(241 245 249)"); 
        setNavLinkColor("black")
      } else {
        setNavBgColor("transparent");
        setNavLinkColor("white")
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNav = () => {
    setNav(!nav)
  }

  const NavLink = ({href, title, className=""}) => {
    return (
      <Link onClick={() => setNav(false)} scroll={false} href={href} className={`${className}`} style={{ color: navLinkColor}}>
        {title}
      </Link>
    )
  }

  return (
      <nav className="fixed w-full h-[6rem] z-[100]" style={{ backgroundColor: navBgColor, transition: "background-color 0.4s ease", }}>
        <div className="flex justify-between items-center gap-4 w-full h-full px-2 2xl:px-16">
          <Link href={"/"} onClick={() => setNav(false)}>
            <Image src={Logo} alt="Student Space Logo" width={130} height={130} />
          </Link>
          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-16">
            <NavLink href={"/"} title={"Home"} className="text-sm text-primaryTextClr"/>
            <NavLink href={"/#about"} title={"About"} className="text-sm text-primaryTextClr"/>
            {!user && (
              <NavLink href={"/login"} title={"Sign in"} className="py-2 px-4 text-sm bg-buttonClr text-primaryTextClr rounded-lg" />
            )}
            {user && (
              <div className="flex items-center gap-16">
                <NavLink href={"/dashboard"} title={"Dashboard"} className="text-sm text-primaryTextClr"/>
                <button onClick={() => auth.signOut()} className="text-sm text-primaryTextClr" style={{ color: navLinkColor }}>Sign out</button>
              </div>
            )}
          </ul>
          <div onClick={handleNav} className="md:hidden cursor-pointer">
            {nav ? <CgClose size={30} className="text-primaryTextClr" /> : <FiMenu size={30} className="text-primaryTextClr" /> }
          </div>
        </div>

        {/* Mobile */}
        <div className={nav ? "md:hidden fixed left-0 top-24 w-full h-screen bg-black/70" : ""}>
          <div className={
            nav 
            ? "fixed left-0 top-24 w-full text-center sm:text-left sm:w-[60%] h-screen bg-orange-200 p-7 ease-in-out duration-700"
            : "fixed left-[-100%] top-24 p-10 ease-in-out duration-700 h-screen"}>
              <div className="">
                <ul className="flex flex-col items-center gap-32">
                  <NavLink href={"/"} title={"Home"} className="text-sm text-primaryTextClr" />
                  <NavLink href={"/#about"} title={"About"} className="text-sm text-primaryTextClr"/>
                  {!user && (
                    <NavLink href={"/login"} title={"Sign in"} className="py-2 px-4 text-sm bg-buttonClr text-primaryTextClr rounded-lg" />
                  )}
                  {user && (
                    <div className="flex flex-col gap-32">
                     <NavLink href={"/dashboard"} title={"Dashboard"} className="text-sm text-primaryTextClr"/>
                     <button onClick={() => {
                        auth.signOut()
                        setNav(false)
                        }}
                        className="text-sm text-primaryTextClr"
                        style={{ color: navLinkColor }}>
                        Sign out
                      </button>
                    </div>
                  )}
                </ul>
              </div>
          </div>
        </div>
      </nav>
  )
}

export default Nav