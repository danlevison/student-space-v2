import React, {useState, useContext} from 'react'
import DemoStudentDataContext from "../../DemoStudentDataContext"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center px-10">
            {demoTableData.map((table) => (
                <div key={table.uuid} className="relative flex flex-col justify-between items-center h-[250px] p-8 shadow-lg rounded-md bg-[#f5f5f5]">
                    <h2 className="font-bold tracking-wide text-2xl">{table.tableName}</h2>
                    <p className="text-center text-primaryTextClr w-[50px] p-2 bg-blue-400 rounded-lg mx-auto my-1">{table.points}</p> 
                    <div className="flex flex-wrap gap-2 font-bold tracking-wide py-2">
                        {table.students.map((student) => (
                            <p>{student}</p>
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

            <button onClick={handleAddTableModal} className="flex flex-col justify-center items-center max-w-[210px] p-[2.40rem] shadow-lg rounded-md bg-[#f5f5f5] hover:scale-105 duration-300">
                <p className="text-lg font-bold">Add Table</p>
                <RiAddLine size={30} />
            </button>
            
            {/* Add Table Modal */}
            {isAddTableModalOpen && 
                <AddTable 
                isAddTableModalOpen={isAddTableModalOpen} 
                setIsAddTableModalOpen={setIsAddTableModalOpen} 
                demoTableData={demoTableData}
                setDemoTableData={setDemoTableData}
                />}
             
        </div>
  )
}

export default GroupGrid