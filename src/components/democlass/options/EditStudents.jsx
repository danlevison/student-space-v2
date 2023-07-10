import React, {useState, useContext} from 'react'
import DemoStudentDataContext from "../../../DemoStudentDataContext"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"

const EditStudents = ({ isEditStudentsModalOpen, setIsEditStudentsModalOpen }) => {
    const [openStudentInfo, setOpenStudentInfo] = useState(false) 
    const [selectedStudent, setSelectedStudent] = useState({
        name: ''
      });

    const { demoStudentData, setDemoStudentData } = useContext(DemoStudentDataContext)  

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

        const handleStudentInfoSubmit = (e) => {
            e.preventDefault()
            const updatedName = e.target.name.value

            const existingStudent = demoStudentData.find(student => student.name === updatedName)
        
            if(existingStudent) {
            alert("A student with this name already exists!")
            e.target.name.value = ""
            return
            }
            
            setDemoStudentData((prevStudents) => {
              return prevStudents.map((student) => {
                if (student.uuid === selectedStudent.uuid) {
                  return { ...student, name: updatedName }
                }
                return student
              })
            })
            setOpenStudentInfo(false)
          }

          const removeStudent = () => {
            setDemoStudentData((prevStudents) => {
                // Ensures that only students with a different UUID than the UUID of the selectedStudent will be included in the new array.
              return prevStudents.filter((student) => student.uuid !== selectedStudent.uuid)
            })
            setOpenStudentInfo(false)
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
              <Dialog.Panel className="p-5 w-[80%] max-w-[500px] h-[40%] rounded-xl bg-blue-100">
                <div className="flex justify-between items-center">
                  <Dialog.Title className="font-bold text-xl">Edit Students</Dialog.Title>
                  <button onClick={() => setIsEditStudentsModalOpen(false)}>
                    <AiOutlineClose
                      size={28}
                      className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                    />
                  </button>
                </div>
                <div className="overflow-auto h-5/6 mt-4">
                  {demoStudentData.map((student) => (
                    <button
                      key={student.uuid}
                      onClick={() => handleStudentModal(student)}
                      className="block w-full bg-gray-100 border-b border-gray-400 py-2"
                    >
                      {student.name}
                    </button>
                  ))}
                </div>
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
                    <Dialog.Panel className="flex flex-col justify-between p-5 w-[80%] max-w-[500px] h-[35%] md:h-[24%] rounded-xl bg-blue-100">
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
                                className="w-full rounded-lg p-2"
                                id="name"
                                name="name"
                                required
                                value={selectedStudent.name}
                                onChange={updateStudentName}
                            />
                            )}
                        <div className="flex flex-col md:flex-row items-center mt-7">
                            <button onClick={removeStudent} type="button" className="md:mr-auto bg-red-400 hover:bg-red-800 rounded-2xl p-2 text-sm text-primaryTextClr font-bold">Remove student from class</button>
                            <div className="flex items-center justify-center mt-3 md:mt-0">
                                <button onClick={() => setOpenStudentInfo(false)} type="button" className="md:mx-10 bg-blue-100 hover:bg-white rounded-2xl p-2 text-buttonClr font-bold text-sm">Cancel</button>
                                <button className="text-sm font-bold bg-white hover:bg-slate-100 rounded-2xl py-2 px-3">Save</button>
                            </div>
                        </div>
                    </form>
                    </Dialog.Panel>
                </div>
                </Dialog>
            )}
          </Dialog>
      
        </>
      );
      
}

export default EditStudents