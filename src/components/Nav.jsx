"use client"

import React, { useState, useEffect } from 'react'
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../../utils/firebase"
import Logo from "../../public/assets/student-space-logo.png"
import LogoWhite from "../../public/assets/student-space-logo-white.png"
import { FiMenu } from "react-icons/fi"
import { CgClose } from "react-icons/cg"

const Nav = () => {
  const [user, loading] = useAuthState(auth)
  const [nav, setNav] = useState(false)
  const [navBgColor, setNavBgColor] = useState("transparent")
  const [navLinkColor, setNavLinkColor] = useState("white")
  const [scrollY, setScrollY] = useState(0)
  const [logo, setLogo] = useState(LogoWhite)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleNavigation = () => {
      if (scrollY > 0 && pathname === "/") {
        setNavBgColor("white")
        setNavLinkColor("#5f5f7f")
        setLogo(Logo)
      } else if (scrollY === 0 && pathname === "/") {
        setNavBgColor("transparent")
        setNavLinkColor("white")
        setLogo(LogoWhite)
      } else if (pathname !== "/") {
        setNavBgColor("white")
        setNavLinkColor("#5f5f7f")
        setLogo(Logo)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleNavigation() // Handle navigation immediately when component mounts

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname, scrollY])


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
      <nav className={pathname === "/" ? "shadow-xl fixed w-full h-[6rem] z-[10] px-8" : "shadow-xl fixed w-full h-[6rem] z-[10] px-8"} style={{ backgroundColor: navBgColor, transition: "background-color 0.4s ease"}}>
        <div className="flex justify-between items-center gap-4 w-full h-full px-2 2xl:px-16">
          <Link href={"/"} onClick={() => setNav(false)}>
            <Image src={logo} alt="Student Space Logo" width={130} height={130} />
          </Link>
          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-16 font-bold text-primaryTextClr" style={{ color: navLinkColor}}>
            <NavLink href={"/"} title={"Home"} />
            <NavLink href={"/#about"} title={"About"} />
            {!user && (
              <NavLink href={"/login"} title={"Sign in"} />
            )}
            {user && (
              <div className="flex items-center gap-16">
                <NavLink href={"/dashboard"} title={"Dashboard"} />
                <button onClick={() => auth.signOut()}>Sign out</button>
              </div>
            )}
          </ul>
          <div onClick={handleNav} className="md:hidden cursor-pointer">
            <FiMenu size={30} className="text-primaryTextClr" style={{ color: navLinkColor}} />
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
                  <Link href={"/"} onClick={() => setNav(false)}>
                    <Image src={Logo} alt="Student Space Logo" width={130} height={130} />
                  </Link>
                  <div onClick={handleNav}>
                    <CgClose size={30} className="text-secondaryTextClr" />
                  </div>
                </div>
              
                <ul className="flex flex-col items-center gap-32 font-bold text-secondaryTextClr">
                  <NavLink href={"/"} title={"Home"} />
                  <NavLink href={"/#about"} title={"About"} />
                  {user ? (
                    <div className="flex flex-col gap-32">
                      <NavLink href={"/dashboard"} title={"Dashboard"} />
                      <button
                        onClick={() => {
                          auth.signOut();
                          setNav(false);
                        }}
                        className="text-sm text-primaryTextClr"
                        style={{ color: navLinkColor }}
                      >
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <NavLink href={"/login"} title={"Sign in"} />
                  )}
                </ul>

              </div>
          </div>
        </div>
      </nav>
  )
}

export default Nav