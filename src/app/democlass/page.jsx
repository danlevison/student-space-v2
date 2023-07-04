"use client"

import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../utils/firebase';
import { IoIosOptions } from "react-icons/io";
import { RiTimerFill } from "react-icons/ri";
import { GiCardRandom } from "react-icons/gi";
import { GoTasklist } from "react-icons/go";
import CurrentDate from "../../components/democlass/date";
import StudentGrid from "../../components/democlass/StudentGrid";

const DemoClass = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <main className="min-h-screen w-full py-32 bg-blue-300">
      <div className="mx-auto w-full">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl text-center">Good Morning, 4N!</h1>
          <CurrentDate />
          <p className="text-lg py-4">Weather</p>
        </div>

        <div className="">
          <StudentGrid />
        </div>

        <div className="fixed bottom-0 w-full bg-white flex items-center h-14 border-t border-gray-400">
          <ul className="flex justify-evenly w-full">
            <li>
              <button>  
                <RiTimerFill size={30} className="text-iconClr"/>
              </button>
            </li>
            <li>
              <button>  
                <GiCardRandom size={30} className="text-iconClr"/>
              </button>
            </li>
            <li>
              <button>  
                <GoTasklist size={30} className="text-iconClr"/>
              </button>
            </li>
            <li>
              <button>  
                <IoIosOptions size={30} className="text-iconClr"/>
              </button>
            </li>
            <li>
              <button>  
                <RiTimerFill size={30} className="text-iconClr"/>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default DemoClass