import React from 'react'
import { RiTimerFill } from "react-icons/ri"
import { GiCardRandom } from "react-icons/gi"
import { GoTasklist } from "react-icons/go"
import { IoIosOptions } from "react-icons/io"

const Toolbar = () => {
  return (
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
  )
}

export default Toolbar