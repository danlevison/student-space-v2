import React, {useContext, useState} from 'react'
import DemoStudentDataContext from "../../../DemoStudentDataContext"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"
import Image from "next/image"

const AddTable = ({ isAddTableModalOpen, setIsAddTableModalOpen, demoTableData, setDemoTableData }) => {
    const { demoStudentData, setDemoStudentData } = useContext(DemoStudentDataContext) 
    const [selectedStudent, setSelectedStudent] = useState([])

    const getSelectedStudent = (e) => {
        // Gets the name of the selected students and saves it in state
        if(e.target.checked) {
            setSelectedStudent((prevSelectedStudent) => {
                return [...prevSelectedStudent, e.target.name]
            })
        }
    }

    const handleAddTableSubmit = (e) => {
        e.preventDefault()
        const tableName = e.target.tableName.value
        const uuid = crypto.randomUUID()
        const existingTable = demoTableData.find(table => table.tableName === tableName)
        
        if(existingTable) {
          alert("A table with this name already exists!")
          e.target.reset()
          return
        }

        const newTable = {
          tableName: tableName,
          students: selectedStudent,
          points: 0,
          avatar: "",
          uuid: uuid
        }

        {/* Update demoStudentData tableName property of selected students with table name inputted in modal */}
        setDemoStudentData((prevStudentData) => {
            return prevStudentData.map((student) => {
              if (selectedStudent.includes(student.name)) {
                return { ...student, tableName: tableName }
              }
              return student
            })
          })

        setDemoTableData((prevTable) => {
            return [...prevTable, newTable]
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
                
                <Dialog.Panel className="p-5 w-[80%] h-[620px] overflow-auto rounded-xl bg-blue-100">
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
                                        type="checkbox" id={student.name} 
                                        name={student.name} 
                                        className="hidden peer"
                                        disabled={student.tableName ? true : false}
                                    />
                                    <label 
                                        htmlFor={student.name} 
                                        className="flex flex-col items-center w-28 cursor-pointer bg-white p-4 shadow-lg rounded-xl peer-disabled:bg-gray-200 peer-checked:bg-green-200 peer-hover:scale-105 duration-300"
                                    >
                                        <Image src={student.avatar} alt="/" width={25} height={25} className="select-none"/>
                                        <p className="select-none mt-1 text-lg">{student.name}</p>
                                        <p>{student.tableName}</p>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-10">
                            <button onClick={() => setIsAddTableModalOpen(false)} type="button" className="w-full sm:w-32 bg-buttonClr p-3 rounded-lg text-primaryTextClr hover:scale-105 duration-300" aria-label="Cancel">Cancel</button>
                            <button type="submit" className="w-full sm:w-32 bg-buttonClr p-3 rounded-lg text-primaryTextClr hover:scale-105 duration-300" aria-label="Submit add student form">Add Table</button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    </>
  )
}

export default AddTable