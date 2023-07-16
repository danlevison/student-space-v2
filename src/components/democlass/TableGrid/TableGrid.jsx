import React, {useState, useContext} from 'react'
import DemoStudentDataContext from "../../../DemoStudentDataContext"
import AddTable from "./AddTable"
import { FaAward } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { RiAddLine } from "react-icons/ri"

const GroupGrid = () => {
    const { demoTableData, setDemoTableData } = useContext(DemoStudentDataContext)
    const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false)

    const handleAddTableModal = () => {
        setIsAddTableModalOpen(true)
      }

      const handlePointClick = (uuid) => {
        setDemoTableData((prevTables) => {
          return prevTables.map((table) => {
            if (table.uuid === uuid) {
              return { ...table, points: table.points + 1 }
            }
            return table
          })
        })
      }
    
    return (
      <>
        {demoTableData.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full w-3/4 lg:w-1/2 mx-auto rounded-lg shadow-lg p-4 sm:mt-10 bg-[#f5f5f5]">
            <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">Add your classroom tables!</h2>
            <p className="text-center py-8 sm:text-lg">Reward tables for showing collaboration and teamwork!</p>
            <button 
              onClick={handleAddTableModal}
              className="bg-buttonClr p-3 md:p-4 rounded-lg text-primaryTextClr hover:scale-105 duration-300">Add a table</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center px-10">
              {demoTableData.map((table) => (
                  <div key={table.uuid} className="relative flex flex-col justify-between items-center h-[250px] p-8 shadow-lg rounded-md bg-[#f5f5f5]">
                      <h2 className="font-bold tracking-wide text-2xl">{table.tableName}</h2>
                      <p className="text-center text-primaryTextClr text-xl w-[50px] p-2 bg-iconClr rounded-lg mx-auto my-1">{table.points}</p> 
                      <div className="flex flex-wrap justify-center items-center gap-2 font-bold tracking-wide py-2">
                          {table.students.map((student) => (
                              <p className="bg-white shadow-lg rounded-lg p-2">{student}</p>
                          ))}
                      </div>
                      <button onClick={() => handlePointClick(table.uuid)}>
                          <FaAward size={30} className="absolute top-2 right-1 text-iconClr hover:text-yellow-500 hover:scale-110 duration-300 ease-in"/>
                      </button>
                      <button className="absolute bottom-2 right-2">
                          <IoMdSettings size={20} className="text-gray-400"/>
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
              demoTableData={demoTableData}
              setDemoTableData={setDemoTableData}
              />}
      </>
  )
}

export default GroupGrid