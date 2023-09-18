import React, {useContext, useState} from 'react'
import Image from "next/image"
import StudentDataContext from "@/StudentDataContext"
import { doc, collection, updateDoc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"
import { toast } from "react-toastify"
import ResetTablePoints from "./ResetTablePoints"

const ResetStudentPoints = ({ openResetStudentPointsModal, setOpenResetStudentPointsModal }) => {
    const { studentData, setStudentData, userUid, params } = useContext(StudentDataContext)
    const [areAllStudentsSelected, setAreAllStudentSelected] = useState(false)
    const [areAllTablesSelected, setAreAllTablesSelected] = useState(false)
    const [studentView, setStudentView] = useState(true)

    const toggleSelectedStudent = (e) => {
        const selectedStudent = e.target.name

        const updatedStudentData = studentData.map((student) => {
            if(student.name === selectedStudent) {
                return {...student, selected: !student.selected}
            }
            return student
        })
        setStudentData(updatedStudentData)
    }

    const resetSelectedStudentsPoints = async () => {
        try {
            const updatedStudentData = studentData.map((student) => {
                if(student.selected) {
                    return {...student, points: 0, selected: false}
                }
                return student
            })
            setStudentData(updatedStudentData)

            if (userUid && params.id) {
                const classDocumentRef = doc(db, "users", userUid, "classes", params.id)
            
                await updateDoc(classDocumentRef, {
                  studentData: updatedStudentData,
                })
              }

        } catch (error) {
            console.error("Error resetting student points", error)
        }

        setOpenResetStudentPointsModal(false)
        toast.success("Student points reset successfully!")
    }

    const selectAllStudents = () => {
        setStudentData((prevStudentData) => {
            return prevStudentData.map((student) => {
                return {...student, selected: true}
            })
        })
        setAreAllStudentSelected(true)
    }

    const deselectAllStudents = () => {
        setStudentData((prevStudentData) => {
            return prevStudentData.map((student) => {
                return {...student, selected: false}
            })
        })
        setAreAllStudentSelected(false)
    }

    // if student.selected === true and a user closes the resetPoints modal without resetting any points, student.selected will be reset to its default value of false.
    const resetStudents = () => {
        setStudentData((prevStudentData) => {
            return prevStudentData.map((student) => {
                return {...student, selected: false}
            })
        })
    }

    const resetTables = () => {
        setStudentData((prevStudentData) => {
            return prevStudentData.map((student) => {
                return {...student, tableData: {...student.tableData, selected: false}}
            }) 
        })
    }

  return ( 
        <Dialog
            open={openResetStudentPointsModal}
            onClose={() => {
                setOpenResetStudentPointsModal(false)
                resetStudents()
                resetTables()
            }}
            className="relative z-50"
            >
                {/* Backdrop */}
                <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
        
                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="flex flex-col justify-between p-5 w-full max-w-[800px] h-full max-h-[1000px] rounded-xl bg-modalBgClr">
                        <div className="flex justify-between items-center">
                            <Dialog.Title className="font-bold text-xl">Reset Points</Dialog.Title>
                            <button onClick={() => {
                                setOpenResetStudentPointsModal(false)
                                resetStudents()
                                resetTables()
                            }}>
                            <AiOutlineClose
                                size={28}
                                className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                            />
                            </button>
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-5">
                            <button 
                                onClick={() => setStudentView(true)}
                                className={studentView ? "text-lg text-buttonClr font-bold underline" : "text-lg font-bold hover:scale-105 duration-300"}
                            >
                                Students
                            </button>
                            <button 
                                onClick={() => setStudentView(false)}
                                disabled={studentData.every((student) => !student.tableData.isOnTable)}
                                className={!studentView ? "text-lg text-buttonClr font-bold underline" : "text-lg font-bold hover:scale-105 duration-300 disabled:text-gray-400 disabled:hover:scale-100 disabled:duration-0"}
                            >
                                Tables
                            </button>
                        </div>
                        <Dialog.Description className="text-center mt-2 font-bold text-red-400 py-5">
                                Warning: Resetting points is a permanent action and can't be undone.
                        </Dialog.Description>
                        {studentView ? 
                        <>
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] overflow-auto h-[600px]">
                                {studentData.map((student) => (
                                    <div key={student.uuid} className="mx-auto h-fit my-2">
                                        <input 
                                            onChange={toggleSelectedStudent} 
                                            type="checkbox" 
                                            id={student.name} 
                                            name={student.name} 
                                            checked={student.selected}
                                            className="hidden peer"
                                        />
                                        <label 
                                            htmlFor={student.name} 
                                            className="flex flex-col items-center w-28 cursor-pointer text-center bg-white p-4 shadow-lg rounded-xl peer-checked:bg-green-200 peer-hover:scale-105 duration-300 select-none"
                                        >
                                            <Image 
                                            src={student.avatar} 
                                            alt="/" 
                                            width={40} 
                                            height={40} 
                                            className="select-none"
                                            />
                                            <span className="font-bold mt-1 text-lg">{student.name}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-row justify-end items-center pt-2 text-sm">
                                {areAllStudentsSelected ? 
                                    <button 
                                        onClick={deselectAllStudents} 
                                        className="mr-auto bg-transparent hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold"
                                    >
                                        Select None
                                    </button>
                                    :
                                    <button 
                                    onClick={selectAllStudents}
                                    className="mr-auto bg-transparent hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold"
                                    >
                                        Select All
                                    </button>
                                }
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => {
                                        setOpenResetStudentPointsModal(false)
                                        resetStudents()
                                        resetTables()
                                    }}
                                        className="bg-transparent hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={resetSelectedStudentsPoints}
                                        disabled={!studentData.some((student) => student.selected )}
                                        className="font-bold bg-white hover:bg-green-200 rounded-2xl py-2 px-5 disabled:text-white disabled:bg-gray-400"
                                    >
                                        Reset Points
                                    </button>
                                </div>
                            </div>
                        </>
                        :
                        <ResetTablePoints
                            setOpenResetStudentPointsModal={setOpenResetStudentPointsModal}
                            areAllTablesSelected={areAllTablesSelected}
                            setAreAllTablesSelected={setAreAllTablesSelected}
                            resetStudents={resetStudents}
                            resetTables={resetTables}
                        />
                        }
                    </Dialog.Panel>           
                </div>
            </Dialog>
  )
}

export default ResetStudentPoints