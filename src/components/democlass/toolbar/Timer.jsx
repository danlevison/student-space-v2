import React, {useState, useEffect} from 'react'
import Draggable from 'react-draggable'
import { AiOutlineClose } from "react-icons/ai"
import { BsPlayFill, BsFillPauseFill } from "react-icons/bs"
import { LuTimerReset } from "react-icons/lu"

const Timer = ( {openTimer, setOpenTimer} ) => {
    const [minutes, setMinutes] = useState(2)
    const [seconds, setSeconds] = useState(50)
    const [start, setStart] = useState(false)
    const [inputtedMinutes, setInputtedMinutes] = useState(2)
    const [inputtedSeconds, setInputtedSeconds] = useState(50)

    const handleMinutes = (e) => {
        const inputMinutes = parseInt(e.target.value)
        setInputtedMinutes(inputMinutes)
    
        // Remove leading zero when inputMinutes is a valid number
        const formattedInput = isNaN(inputMinutes) ? "" : String(inputMinutes)
    
        // If the input is an empty string or not a number, set minutes to 0
        if (formattedInput === "" || isNaN(inputMinutes)) {
            setMinutes(0)
        } else if (inputMinutes >= 0 && inputMinutes <= 999) {
            setMinutes(formattedInput)
        }
    }

    const handleSeconds = (e) => {
        const inputSeconds = parseInt(e.target.value)
        setInputtedSeconds(inputSeconds)
    
        const formattedInput = isNaN(inputSeconds) ? "" : String(inputSeconds)
    
        if (formattedInput === "" || isNaN(inputSeconds)) {
            setSeconds(0)
        } else if (inputSeconds >= 0 && inputSeconds <= 59) {
            if (inputSeconds === 0 && minutes > 0) {
                setSeconds(0) // Set seconds to 0 if input is '0' and there are remaining minutes (prevents seconds going into negative)
            } else {
                setSeconds(formattedInput)
            }
        }
    }
    
    const resetTime = () => {
        setMinutes(inputtedMinutes || 0)
        setSeconds(inputtedSeconds || 0)
        setStart(false)
    }

    //  prevents the click and mouse events from propagating (bubbling up) to the parent elements, which includes the Draggable component. This ensures that dragging isn't triggered while interacting with the input fields. 
    const stopPropagation = (e) => {
        e.stopPropagation()
    }

    useEffect(() => {
        let countdownInterval

        if (start && (minutes > 0 || seconds > 0)) {
            countdownInterval = setInterval(() => {
              if (seconds === 0) {
                if (minutes === 0) {
                    setStart(false)  
                    clearInterval(countdownInterval)
                } else {
                  setMinutes(prevMinutes => prevMinutes - 1)
                  setSeconds(59)
                }
              } else {
                setSeconds(prevSeconds => prevSeconds - 1)
              }
            }, 1000)
          }
        return () => clearInterval(countdownInterval)
    }, [start ,minutes, seconds])

  return openTimer && (
    <div className="fixed inset-0 z-[-100]">
        <Draggable bounds="parent">
            <div className="absolute top-[30%] mx-4 sm:top-[60%] sm:right-[3%] p-5 w-auto sm:w-[450px] h-auto sm:h-[250px] rounded-xl bg-slate-600 z-[-10] cursor-move text-white">
                <div className="flex justify-between items-center pb-4 sm:pb-0">
                    <h2 className="font-bold text-xl">Countdown timer</h2>
                    <button onClick={() => setOpenTimer(false)}>
                        <AiOutlineClose size={28} className="bg-white text-secondaryTextClr rounded-full p-1 hover:bg-slate-800 hover:text-white"/>
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center h-full">
                    {!start && (
                        <div className="flex justify-center items-center gap-2 text-black">
                            <input
                                onClick={stopPropagation}
                                onMouseDown={stopPropagation}
                                onMouseUp={stopPropagation}
                                type="number"
                                value={minutes}
                                onChange={handleMinutes}
                                className="text-center w-full max-w-[130px] h-20 rounded-xl text-6xl border-2 border-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="text-7xl text-white">:</span>
                            <input
                                onClick={stopPropagation}
                                onMouseDown={stopPropagation}
                                onMouseUp={stopPropagation}
                                type="number"
                                value={seconds.toString().padStart(2, '0')}
                                onChange={handleSeconds}
                                className="text-center w-auto max-w-[130px] h-20 rounded-xl text-6xl border-2 border-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>   
                    )}
                    {start && (
                        <div className="flex justify-center items-center gap-2 select-none">
                            <p className="flex items-center justify-center text-center w-full max-w-[130px] h-20 rounded-xl text-7xl">{minutes.toString()}</p>
                            <span className="text-7xl">:</span>
                            <p className="flex items-center justify-center text-center w-full max-w-[130px] h-20 rounded-xl text-7xl">{seconds.toString().padStart(2, '0')}</p>
                        </div>
                    )}
                    <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-10 pt-4">
                        {(minutes > 0 || seconds > 0) && (
                            <div className="flex justify-center items-center gap-10">
                                {!start ? 
                                    <button onClick={() => setStart(true)} className="flex items-center gap-2 px-10 py-2 border-2 border-white rounded-full hover:bg-slate-500">
                                        <BsPlayFill size={25} />
                                        <span className="font-bold">Start</span> 
                                    </button>
                                    :
                                    <button onClick={() => setStart(false)} className="flex items-center gap-2 px-10 py-2 border-2 border-white rounded-full hover:bg-slate-500">
                                        <BsFillPauseFill size={25} />
                                        <span className="font-bold">Pause</span>
                                    </button>
                                }
                            </div>
                        )}
                        <button onClick={resetTime} className="flex items-center gap-2 px-10 py-2 border-2 border-white rounded-full hover:bg-slate-500">
                            <LuTimerReset size={20} />
                            <span className="font-bold">Reset</span>
                        </button>
                    </div>
                </div>
            </div>
        </Draggable>
    </div>
  )
}

export default Timer