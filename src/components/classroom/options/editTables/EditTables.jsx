import React, {useState, useContext} from 'react'
import StudentDataContext from "@/context/StudentDataContext"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"
import TableInfoModal from "./TableInfoModal"

const EditTables = ({ isEditTablesModalOpen, setIsEditTablesModalOpen }) => {
    const { studentData } = useContext(StudentDataContext)
    const [openTableInfo, setOpenTableInfo] = useState(false)
    const [selectedTableName, setSelectedTableName] = useState(null)
    const [tempSelectedTableName, setTempSelectedTableName] = useState(selectedTableName)

    // Collect unique table names using a Set
    const tableNamesSet = new Set()
    
    studentData.forEach((student) => {
      if (student.tableData?.tableName) {
        tableNamesSet.add(student.tableData.tableName)
      }
    })

    // Convert Set back to an array of table names
    const tableNames = Array.from(tableNamesSet)

    const handleTableModal = (tableName) => {
        setSelectedTableName(tableName)
        setTempSelectedTableName(tableName)
        setOpenTableInfo(true)
    }

  return (
    <Dialog
      open={isEditTablesModalOpen}
      onClose={() => setIsEditTablesModalOpen(false)}
      className="relative z-40"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="p-5 w-full max-w-[800px] h-full max-h-[1000px] rounded-xl bg-modalBgClr overflow-auto">
          <div className="flex justify-between items-center">
            <Dialog.Title className="font-bold text-xl">Edit Tables</Dialog.Title>
            <button onClick={() => setIsEditTablesModalOpen(false)}>
              <AiOutlineClose
                size={28}
                className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
              />
            </button>
          </div>
          {tableNames.length === 0 ? (
            <div className="flex justify-center items-center h-full min-h-[300px] text-center">
                  <p className="text-2xl">No table data available</p>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 h-fit overflow-auto mt-4 p-4">
              {/* Render a button for each table name */}
              {tableNames.map((tableName) => (
                <button
                  key={tableName}
                  onClick={() => handleTableModal(tableName)}
                  className="text-center text-lg border border-buttonClr bg-white p-4 rounded-xl hover:scale-105 duration-300 break-words"
                >
                  {tableName}
                </button>
              ))}
            </div>
          )}
        </Dialog.Panel>
      </div>

      <TableInfoModal
        setIsEditTablesModalOpen={setIsEditTablesModalOpen} 
        openTableInfo={openTableInfo} 
        setOpenTableInfo={setOpenTableInfo}
        selectedTableName={selectedTableName}
        setSelectedTableName={setSelectedTableName}
        setTempSelectedTableName={setTempSelectedTableName}
        tempSelectedTableName={tempSelectedTableName}
      />
    </Dialog>
  )
}

export default EditTables