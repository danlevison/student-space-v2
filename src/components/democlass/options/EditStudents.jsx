import React, {useState, useContext} from 'react'
import StudentDataContext from "@/StudentDataContext"
import { doc, collection, updateDoc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"

const EditStudents = ({ isEditStudentsModalOpen, setIsEditStudentsModalOpen }) => {
    const [openStudentInfo, setOpenStudentInfo] = useState(false) 
    const [selectedStudent, setSelectedStudent] = useState({
        name: ''
      })

    const { studentData, setStudentData, userUid, userClassName } = useContext(StudentDataContext)  

    const handleStudentModal = (student) => {
        setSelectedStudent(student)
        setOpenStudentInfo(true)
    }

    const updateStudentName = (e) => {
        setSelectedStudent((prevSelectedStudent) => ({
            ...prevSelectedStudent,
            name: e.target.value
          }))
        }

        const handleStudentInfoSubmit = async (e) => {
          try {
            e.preventDefault()
            const updatedName = e.target.name.value
        
            const existingStudent = studentData.find((student) => student.name === updatedName)
        
            if (existingStudent) {
              alert("A student with this name already exists!")
              e.target.name.value = updatedName
              return
            }
        
            // Update the student name in the demoClass
            const updatedStudentData = studentData.map((student) => {
              if (student.uuid === selectedStudent.uuid) {
                return { ...student, name: updatedName }
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

          const removeStudent = async () => {
            try {
              // Filter out the student with the same UUID as the selectedStudent
              const updatedDemoStudentData = studentData.filter((student) => student.uuid !== selectedStudent.uuid)
              // Removes student from demoClass
              setStudentData(updatedDemoStudentData)
          
              if (userUid && userClassName) {
                // User is in their own class context (Firebase)
                const classCollectionRef = collection(db, 'users', userUid, userClassName)
                const classDocumentRef = doc(classCollectionRef, userUid)
          
                // Update the Firestore document with the updated studentData (Removes student from users class)
                await updateDoc(classDocumentRef, {
                  studentData: updatedDemoStudentData,
                })
              }
          
              setOpenStudentInfo(false)
            } catch (error) {
              console.error('Error removing student:', error)
            }
          }

    return (
        <>
          <Dialog
            open={isEditStudentsModalOpen}
            onClose={() => setIsEditStudentsModalOpen(false)}
            className="relative z-40"
          >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
      
            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="p-5 w-[80%] max-w-[500px] h-[365px] rounded-xl bg-modalBgClr">
                <div className="flex justify-between items-center">
                  <Dialog.Title className="font-bold text-xl">Edit Students</Dialog.Title>
                  <button onClick={() => setIsEditStudentsModalOpen(false)}>
                    <AiOutlineClose
                      size={28}
                      className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                    />
                  </button>
                </div>
                {studentData.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-xl">No student data available</p>
                  </div>
                ) : (
                  <div className="overflow-auto h-5/6 mt-4">
                    {studentData.map((student) => (
                      <button
                        key={student.uuid}
                        onClick={() => handleStudentModal(student)}
                        className="block w-full bg-gray-100 hover:bg-gray-400 border-b border-gray-400 py-2"
                      >
                        {student.name}
                      </button>
                    ))}
                  </div>
                )}
              </Dialog.Panel>
            </div>

            {/* Student Info Modal */}
            {openStudentInfo && (
                <Dialog
                open={openStudentInfo}
                onClose={() => setOpenStudentInfo(false)}
                className="relative z-50"
                >
                {/* Backdrop */}
                <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
        
                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="flex flex-col justify-between p-5 w-[80%] max-w-[500px] h-[260px] md:h-[200px] rounded-xl bg-modalBgClr">
                    <div className="flex justify-between items-center">
                        <Dialog.Title className="font-bold text-xl">{selectedStudent.name}</Dialog.Title>
                        <button onClick={() => setOpenStudentInfo(false)}>
                        <AiOutlineClose
                            size={28}
                            className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                        />
                        </button>
                    </div>
                    <form onSubmit={handleStudentInfoSubmit} className="flex flex-col py-4">
                        <label htmlFor="name">First name</label>
                        {selectedStudent && (
                            <input
                                className="w-full rounded-lg p-2 outline-inputOutlineClr"
                                id="name"
                                name="name"
                                required
                                value={selectedStudent.name}
                                onChange={updateStudentName}
                            />
                            )}
                        <div className="flex flex-col md:flex-row items-center mt-5">
                            <button onClick={removeStudent} type="button" className="md:mr-auto bg-red-500 hover:bg-red-700 rounded-2xl p-2 text-sm text-primaryTextClr font-bold">Remove student from class</button>
                            <div className="flex items-center justify-center gap-2 mt-3 md:mt-0">
                                <button onClick={() => setOpenStudentInfo(false)} type="button" className="bg-modalBgClr hover:bg-white rounded-2xl p-2 text-buttonClr font-bold text-sm">Cancel</button>
                                <button className="text-sm font-bold bg-white hover:bg-green-200 rounded-2xl py-2 px-3">Save</button>
                            </div>
                        </div>
                    </form>
                    </Dialog.Panel>
                </div>
                </Dialog>
            )}
          </Dialog>
      
        </>
      )
      
}

export default EditStudents