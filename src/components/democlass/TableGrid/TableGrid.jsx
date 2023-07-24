import React, {useState, useContext} from 'react'
import DemoStudentDataContext from "../../../DemoStudentDataContext"
import AddTable from "./AddTable"
import { FaAward } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { RiAddLine } from "react-icons/ri"

const TableGrid = () => {
    const { demoStudentData, setDemoStudentData } = useContext(DemoStudentDataContext)
    const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false)

    const handleAddTableModal = () => {
        setIsAddTableModalOpen(true)
    }

    // Filter out students whos tableName property is truthy (i.e they have a tableName) 
    const filteredStudents = demoStudentData.filter(
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

    const handlePointClick = (tableName) => {
      setDemoStudentData((prevDemoStudentData) => {
        return prevDemoStudentData.map((student) => {
          if (student.tableData?.tableName === tableName) {
            return {
              ...student,
              tableData: {
                ...student.tableData,
                tablePoints: (student.tableData.tablePoints || 0) + 1,
              },
            }
          }
          return student
        })
      })
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
                disabled={demoStudentData.length === 0}
              >
                Add a table
              </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center px-10">
              {Object.entries(groupedStudentsByTable).map(([tableName, students]) => (
                <div key={tableName} className="relative flex flex-col justify-between items-center min-h-[250px] h-auto p-8 shadow-lg rounded-md bg-[#f5f5f5]">
                  <h2 className="font-bold tracking-wide text-2xl">{tableName}</h2>
                  <p className="text-center text-primaryTextClr text-xl w-[50px] p-2 bg-iconClr rounded-lg mx-auto my-1">
                    {/* assume that all students in the same table have the same number of points, so render points of the first student only */}
                    {students[0].tableData?.tablePoints || 0}
                  </p>
                  <div className="flex flex-wrap justify-center items-center gap-2 font-bold tracking-wide py-2">
                  {students.map((student) => {
                    return student.tableData.isOnTable ? (
                      <p key={student.name} className="bg-white shadow-lg rounded-lg p-2">
                        {student.name}
                      </p>
                    ) : null
                  })}
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
                className="flex flex-col justify-center items-center h-[250px] shadow-lg rounded-md bg-[#f5f5f5] hover:scale-105 duration-300">
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