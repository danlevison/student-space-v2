import React, {useState, useContext} from 'react'
import Image from "next/image"
import StudentDataContext from "@/StudentDataContext"
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import AddTable from "@/components/democlass/table/AddTable"
import { FaAward } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { RiAddLine } from "react-icons/ri"
import pointsSound from "../../../../public/audio/points.mp3"

const TableGrid = () => {
    const { studentData, setStudentData, userUid, userClassName} = useContext(StudentDataContext)
    const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false)

    const handleAddTableModal = () => {
        setIsAddTableModalOpen(true)
    }

    // Filter out students whos tableName property is truthy (i.e they have a tableName) 
    const filteredStudents = studentData.filter(
      (student) => student.tableData?.tableName !== ""
    )
  
    const groupedStudentsByTable = filteredStudents.reduce((groups, student) => {
      const tableName = student.tableData?.tableName || "" // Get tableName from tableData
      if (!groups[tableName]) {
        groups[tableName] = []
      }
      groups[tableName].push(student)
      return groups
    }, {})

    const handlePointClick = async (tableName) => {
      try {
        // Update tablePoints in demoClass
        const updatedStudentData = studentData.map((student) => {
          if(student.tableData?.tableName === tableName) {
            return {
              ...student,
              tableData: {...student.tableData, tablePoints: (student.tableData.tablePoints || 0) + 1}
            }
          }
          return student
        })

        const pointsAudio = new Audio(pointsSound)
        pointsAudio.volume = 0.2
        pointsAudio.play()

        // Set the updated student data to the state
        setStudentData(updatedStudentData)

        if (userUid && userClassName) {
          // User is in their own class context (Firebase)
          const classCollectionRef = collection(db, 'users', userUid, userClassName)
          const classDocumentRef = doc(classCollectionRef, userUid)
    
          // Update the Firestore document with the updated studentData (update tablePoints in users class)
          await updateDoc(classDocumentRef, {
            studentData: updatedStudentData,
          })
        }

      } catch (error) {
        console.error('Error updating student information:', error)
      }
    }
    
    return (
      <>
        {Object.keys(groupedStudentsByTable).length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full w-3/4 lg:w-1/2 mx-auto rounded-lg shadow-lg p-4 sm:mt-10 bg-[#f5f5f5]">
            <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">Add your classroom tables!</h2>
            <p className="text-center py-8 sm:text-lg">Reward tables for showing collaboration and teamwork!</p>
              <button 
                onClick={handleAddTableModal}
                className="bg-buttonClr disabled:bg-slate-300 disabled:hover:scale-100 disabled:duration-0 p-3 md:p-4 rounded-lg text-primaryTextClr hover:scale-105 duration-300"
                disabled={studentData.length === 0}
              >
                Add a table
              </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center px-10">
              {Object.entries(groupedStudentsByTable).map(([tableName, students]) => (
                <div key={tableName} className="relative flex flex-col justify-between items-center h-[270px] p-8 shadow-lg rounded-md bg-[#f5f5f5]">
                  <h2 className="font-bold tracking-wide text-2xl">{tableName}</h2>
                  <p className="text-center text-primaryTextClr text-xl w-[50px] p-2 bg-iconClr rounded-lg mx-auto my-1">
                    {/* assume that all students in the same table have the same number of points, so render points of the first student only */}
                    {students[0].tableData?.tablePoints || 0}
                  </p>
                  <div className="flex flex-wrap justify-center items-center gap-2 font-bold tracking-wide py-2 h-full overflow-auto">
                    {students.reduce((displayedStudents, student) => {
                      if (displayedStudents.length < 4 && student.tableData.isOnTable) {
                        displayedStudents.push(
                          <div key={student.uuid} className="flex flex-col justify-center bg-white shadow-lg rounded-lg text-center w-[90px] h-[100px]">
                            <Image 
                              src={student.avatar}
                              alt="/"
                              width={60}
                              height={60}
                              className="mx-auto"
                            />
                            {/* <p key={student.name} className="mt-1">
                            
                              {student.name}
                              
                            </p> */}
                          </div>
                        )
                      }
                      return displayedStudents
                    }, [])}
                  </div>
                  <button onClick={() => handlePointClick(tableName)}>
                    <FaAward
                      size={30}
                      className="absolute top-2 right-1 text-iconClr hover:text-yellow-500 hover:scale-110 duration-300 ease-in"
                    />
                  </button>
                  <button className="absolute bottom-2 right-2">
                    <IoMdSettings size={20} className="text-gray-400" />
                  </button>
                </div>
              ))}

              <button 
                onClick={handleAddTableModal} 
                className="flex flex-col justify-center items-center h-[270px] shadow-lg rounded-md bg-[#f5f5f5] hover:scale-[1.025] duration-300">
                  <p className="text-xl font-bold">Add Table</p>
                  <RiAddLine size={40} />
              </button>
              
          </div>
        )}
          {/* Add Table Modal */}
          {isAddTableModalOpen && 
              <AddTable 
              isAddTableModalOpen={isAddTableModalOpen} 
              setIsAddTableModalOpen={setIsAddTableModalOpen}
          />}
      </>
  )
}

export default TableGrid