import React, {useState, useContext, useEffect} from 'react'
import StudentDataContext from "@/StudentDataContext"
import { doc, collection, updateDoc } from 'firebase/firestore'
import { db } from "../../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import StudentInfoModal from "./StudentInfoModal"
import Image from "next/image"

const EditStudents = ({ isEditStudentsModalOpen, setIsEditStudentsModalOpen }) => {
    const { studentData, setStudentData, userUid, userClassName } = useContext(StudentDataContext)
    const [openStudentInfo, setOpenStudentInfo] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState({
        name: "",
        dob: ""
      })
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [newStudentAvatar, setNewStudentAvatar] = useState("")

    useEffect(() => {
      setAlert(false)
    }, [openStudentInfo])

    const handleStudentInfoModal = (student) => {
      // Format the student's dob to "yyyy-MM-dd"
      const studentDob = new Date(student.dob)
      const year = studentDob.toLocaleString("default", {year: "numeric" })
      const month = studentDob.toLocaleString("default", {month: "2-digit" })
      const day = studentDob.toLocaleString("default", {day: "2-digit" })
      const formattedDob = `${year}-${month}-${day}`
    
      setSelectedStudent({
        ...student,
        dob: formattedDob
      })
    
      setNewStudentAvatar(student.avatar)
      setOpenStudentInfo(true)
    }

    const updateStudentName = (e) => {
        setSelectedStudent((prevSelectedStudent) => ({
            ...prevSelectedStudent,
            name: e.target.value
          }))
    }

    const updateStudentDob = (e) => {
      setSelectedStudent((prevSelectedStudent) => ({
        ...prevSelectedStudent,
        dob: e.target.value
      }))
    }

    const handleStudentInfoSubmit = async (e) => {
      try {
        e.preventDefault()
        const updatedName = e.target.name.value.trim() // removes empty spaces
        const updatedCapitalisedName = updatedName.charAt(0).toUpperCase() + updatedName.slice(1)
        const updatedDob = e.target.dob.value

        const existingStudent = studentData.find((student) => student.name === updatedCapitalisedName)
        
        if (existingStudent && existingStudent.uuid !== selectedStudent.uuid) {
          setAlert(true)
          setAlertMessage("A student with this name already exists!")
          e.target.name.value = updatedCapitalisedName
          return
        }

        // Update the student name, dob and avatar in the demoClass
        const updatedStudentData = studentData.map((student) => {
          if (student.uuid === selectedStudent.uuid) {
            return { ...student, name: updatedCapitalisedName, dob: updatedDob, avatar:newStudentAvatar }
          }
          return student
        })
      
        setStudentData(updatedStudentData) // Update the local state with the updated student data
        
        if (userUid && userClassName) {
          // User is in their own class context (Firebase)
          const classCollectionRef = collection(db, 'users', userUid, userClassName)
          const classDocumentRef = doc(classCollectionRef, userUid)
        
          // Update the Firestore document with the updated studentData (Updates student name in users class)
          await updateDoc(classDocumentRef, {
            studentData: updatedStudentData,
          })
        }
        
        setOpenStudentInfo(false)
        } catch (error) {
            console.error('Error updating student information:', error)
        }
    }

    return (
      <Dialog
        open={isEditStudentsModalOpen}
        onClose={() => setIsEditStudentsModalOpen(false)}
        className="relative z-40"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
  
        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="p-5 w-full max-w-[800px] h-full max-h-[1000px] rounded-xl bg-modalBgClr overflow-auto">
            <div className="flex justify-between items-center gap-6">
              <Dialog.Title className="font-bold text-xl">Edit Students</Dialog.Title>
              <button onClick={() => setIsEditStudentsModalOpen(false)}>
                <AiOutlineClose
                  size={28}
                  className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                />
              </button>
            </div>
            {studentData.length === 0 ? (
              <div className="flex justify-center items-center text-center h-full">
                <p className="text-2xl">No student data available</p>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 mt-4 p-2">
                {studentData.map((student) => (
                  <button
                    key={student.uuid}
                    onClick={() => handleStudentInfoModal(student)}
                    className="flex flex-col justify-center items-center text-center text-lg font-bold bg-white p-3 shadow-lg rounded-xl hover:scale-105 duration-300 break-words"
                  >
                    <Image 
                      src={student.avatar} 
                      alt="Student Avatar: Sketched Animal"  
                      width={40}
                      height={40}
                      className="select-none" 
                    /> 
                    {student.name}
                  </button>
                ))}
              </div>
            )}
          </Dialog.Panel>
        </div>

        <StudentInfoModal 
          openStudentInfo={openStudentInfo}
          setOpenStudentInfo={setOpenStudentInfo}
          selectedStudent={selectedStudent}
          handleStudentInfoSubmit={handleStudentInfoSubmit}
          newStudentAvatar={newStudentAvatar}
          setNewStudentAvatar={setNewStudentAvatar}
          updateStudentName={updateStudentName}
          updateStudentDob={updateStudentDob}
          alertMessage={alertMessage}
          alert={alert}
        />
        
      </Dialog>
    )
}

export default EditStudents