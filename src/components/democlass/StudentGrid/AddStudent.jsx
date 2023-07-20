import React, {useContext} from 'react'
import DemoStudentDataContext from "../../../DemoStudentDataContext"
import { collection, getDoc, setDoc, doc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai"
import defaultAvatar from "../../../../public/assets/avatars/user.svg"

const AddStudent = ({ isAddStudentModalOpen, setIsAddStudentModalOpen }) => {

    const { demoStudentData, setDemoStudentData, userUid, classname } = useContext(DemoStudentDataContext) 
    
    const handleAddStudentSubmit = async (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const dob = e.target.dob.value
    const uuid = crypto.randomUUID()
    const existingStudent = demoStudentData.find((student) => student.name === name)

    if (existingStudent) {
      alert("A student with this name already exists!");
      e.target.reset()
      return
    }

    const newStudent = {
      name: name,
      dob: dob,
      points: 0,
      avatar: defaultAvatar,
      tableName: "",
      uuid: uuid,
    };

    try {
      if (classname) {
        // Get a reference to the document in the className subcollection
        const classDocumentRef = doc(collection(db, 'users', userUid, classname), userUid)

        // Fetch the current data from the document
        const classDocumentSnapshot = await getDoc(classDocumentRef)
        const classDocumentData = classDocumentSnapshot.data()

        // Update the studentData array in the document
        const updatedStudentData = [...(classDocumentData?.studentData || []), newStudent]

        // Add new student to users firebase studentData
        await setDoc(classDocumentRef, { studentData: updatedStudentData })
      }
    } catch (error) {
      console.error('Error adding student to user class collection:', error)
    }

    // Update demoStudentData and display added students in the demoClass
    setDemoStudentData((prevStudents) => {
      return [...prevStudents, newStudent]
    })

    e.target.reset() // Reset the form fields
  }

  return (
    <>
        <Dialog
            open={isAddStudentModalOpen}
            onClose={() => setIsAddStudentModalOpen(false)}
            className="relative z-50"
        >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
    
            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                
                <Dialog.Panel className="p-5 w-[400px] h-[300px] rounded-xl bg-blue-100">
                    <div className="flex justify-between items-center">
                        <Dialog.Title className="font-bold text-xl">Add student</Dialog.Title>
                        <button onClick={() => setIsAddStudentModalOpen(false)}>
                            <AiOutlineClose size={28} className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"/>
                        </button>
                    </div>
                    <form onSubmit={handleAddStudentSubmit} className="flex flex-col py-4">
                        <label htmlFor="name">First name</label>
                        <input className="w-full rounded-lg p-2" type="text" id="name" name="name" required />

                        <div className="flex items-center gap-2 pt-4 relative">
                          <label htmlFor="dob">Date of birth</label>
                          <AiOutlineInfoCircle size={20} className="peer mb-1"/>
                          <span className="absolute w-auto p-2 min-w-max left-[-18px] sm:left-0 top-[-22px] rounded-md shadow-sm text-white bg-gray-600 text-xs font-bold transition-all duration-100 scale-0 origin-left peer-hover:scale-100">
                            We use DOB to display students birthdays
                          </span>
                        </div>
                        <input className="w-full rounded-lg p-2" type="date" id="dob" name="dob" required />
                    
                        <button className="bg-buttonClr p-3 mt-4 rounded-lg text-primaryTextClr w-full hover:scale-105 duration-300" type="submit" aria-label="Submit add student form">Add Student</button>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    </>
  )
}

export default AddStudent