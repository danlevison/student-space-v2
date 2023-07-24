import React, {useContext, useState} from 'react'
import DemoStudentDataContext from "../../../DemoStudentDataContext"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"
import Image from "next/image"

const AddTable = ({ isAddTableModalOpen, setIsAddTableModalOpen }) => {
    const { demoStudentData, setDemoStudentData } = useContext(DemoStudentDataContext) 
    
    const getSelectedStudent = (e) => {
        const studentName = e.target.name

        setDemoStudentData((prevDemoStudentData) => {
            return prevDemoStudentData.map((student) => {
                if (student.name === studentName) {
                    return { ...student, tableData: { ...student.tableData, selected:!student.tableData?.selected || false } }
                }
                return student
            })
        })
    }

    const handleAddTableSubmit = (e) => {
        e.preventDefault()
        const tableName = e.target.tableName.value
        const existingTable = demoStudentData.find(student => student.tableData.tableName === tableName)
        
        if(existingTable) {
          alert("A table with this name already exists!")
          e.target.reset()
          return
        }

        {/* Update demoStudentData tableData */}
        setDemoStudentData((prevStudentData) => {
            return prevStudentData.map((student) => {
              if (student.tableData.selected) {
                return { ...student, tableData: {tableName: tableName, isOnTable: true, selected: false} }
              }
              return student
            })
          })

        e.target.reset() // Reset the form fields
        setIsAddTableModalOpen(false)
      }

  return (
    <>
        <Dialog
            open={isAddTableModalOpen}
            onClose={() => setIsAddTableModalOpen(false)}
            className="relative z-50"
        >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
    
            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                
                <Dialog.Panel className="p-5 w-full sm:w-[80%] h-full sm:h-[80%] overflow-auto rounded-xl bg-blue-100">
                    <div className="flex justify-between items-center">
                        <Dialog.Title className="font-bold text-xl">Add Table</Dialog.Title>
                        <button onClick={() => setIsAddTableModalOpen(false)}>
                            <AiOutlineClose size={28} className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"/>
                        </button>
                    </div>
                    <form onSubmit={handleAddTableSubmit} className="flex flex-col py-4">
                        <div className="flex flex-col items-center">
                            <label htmlFor="tableName" className="font-bold text-xl">Table name</label>
                            <input className="w-full sm:w-[400px] rounded-lg p-2" type="text" id="tableName" name="tableName" required />
                        </div>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 items-center py-4">
                            {demoStudentData.map((student) => (
                                <div key={student.uuid} className="flex flex-col items-center gap-2">
                                    <input 
                                        onChange={getSelectedStudent} 
                                        type="checkbox" 
                                        id={student.name} 
                                        name={student.name} 
                                        checked={student.tableData.selected}
                                        className="hidden peer"
                                        disabled={student.tableData.tableName ? true : false}
                                    />
                                    <label 
                                        htmlFor={student.name} 
                                        className="flex flex-col items-center w-28 cursor-pointer bg-white p-4 shadow-lg rounded-xl peer-disabled:bg-gray-200 peer-checked:bg-green-200 peer-hover:scale-105 duration-300 select-none"
                                    >
                                        <Image src={student.avatar} alt="/" width={30} height={30} className="select-none"/>
                                        <span className="font-bold mt-1 text-lg">{student.name}</span>
                                        <span>{student.tableData.tableName}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-10">
                            <button 
                                onClick={() => setIsAddTableModalOpen(false)} 
                                type="button" 
                                className="w-full sm:w-32 bg-buttonClr p-3 rounded-lg text-primaryTextClr hover:scale-105 duration-300" 
                                aria-label="Cancel"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                className="w-full sm:w-32 bg-buttonClr p-3 rounded-lg text-primaryTextClr hover:scale-105 duration-300 disabled:bg-gray-400 disabled:hover:scale-100 disabled:duration-0" 
                                aria-label="Submit add student form"
                                disabled={!demoStudentData.some((student) => student.tableData.selected)}
                            >
                                Add Table
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    </>
  )
}

export default AddTable