import React, {useState, useContext} from 'react'
import DemoStudentDataContext from "../../../DemoStudentDataContext"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"

const EditTables = ({ isEditTablesModalOpen, setIsEditTablesModalOpen }) => {
    const [openTableInfo, setOpenTableInfo] = useState(false)
    const [selectedTable, setSelectedTable] = useState({
        tableName: ''
      })
    const { demoTableData, setDemoTableData, setDemoStudentData } = useContext(DemoStudentDataContext)

    const handleTableModal = (table) => {
      // Sets the selectedTable to the table that was clicked.
        setSelectedTable(table)
        setOpenTableInfo(true)
    }

    const updateTableName = (e) => {
        setSelectedTable((prevSelectedTable) => ({
            ...prevSelectedTable,
            tableName: e.target.value
          }))
    }

    const handleTableInfoSubmit = (e) => {
        e.preventDefault()
        const updatedTableName = e.target.tableName.value
        const existingTable = demoTableData.find(table => table.tableName === updatedTableName)
    
        if(existingTable) {
        alert("A table with this name already exists!")
        e.target.tableName.value = ""
        return
        }
        
        setDemoTableData((prevTables) => {
          return prevTables.map((table) => {
            if (table.uuid === selectedTable.uuid) {
              return { ...table, tableName: updatedTableName }
            }
            return table
          })
        })
        setOpenTableInfo(false)
      }

    const removeTable = () => {
        setDemoTableData((prevTables) => {
            // Ensures that only tables with a different UUID than the UUID of the selectedTable will be included in the new array.
          return prevTables.filter((table) => table.uuid !== selectedTable.uuid)
        })

        // Resets tableName property on demoStudentData if that students table was deleted, so that they can be added to another table.
        // Check to see if a student name matches the name of a student on the table, if so resets that students tableName property.
        const studentsOnTable = selectedTable.students
        setDemoStudentData((prevDemoStudentData) => {
          return prevDemoStudentData.map((student) => {
            if (studentsOnTable.includes(student.name)) {
              return { ...student, tableName: "" }
            }
            return student
          })
        })

        setOpenTableInfo(false)
    }

// TODO: If no tables exists edit tables options menu should say "You have no tables to edit" (do same with edit students)
  return (
    <>
        <Dialog
            open={isEditTablesModalOpen}
            onClose={() => setIsEditTablesModalOpen(false)}
            className="relative z-40"
          >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
      
            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="p-5 w-[80%] max-w-[500px] h-[365px] rounded-xl bg-modalBgClr">
                <div className="flex justify-between items-center">
                  <Dialog.Title className="font-bold text-xl">Edit Tables</Dialog.Title>
                  <button onClick={() => setIsEditTablesModalOpen(false)}>
                    <AiOutlineClose
                      size={28}
                      className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                    />
                  </button>
                </div>
                {demoTableData.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                        <p className="text-xl">No tables to edit</p>
                  </div>
                ) : (
                  <div className="overflow-auto h-5/6 mt-4">
                    {demoTableData.map((table) => (
                      <button
                        key={table.uuid}
                        onClick={() => handleTableModal(table)}
                        className="block w-full bg-gray-100 hover:bg-gray-400 border-b border-gray-400 py-2"
                      >
                        {table.tableName}
                      </button>
                    ))}
                  </div>
                )}
              </Dialog.Panel>
            </div>

            {/* Table Info Modal */}
            {openTableInfo && (
                <Dialog
                open={openTableInfo}
                onClose={() => setOpenTableInfo(false)}
                className="relative z-50"
                >
                {/* Backdrop */}
                <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
        
                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="flex flex-col justify-between p-5 w-[80%] max-w-[500px] h-[260px] md:h-[200px] rounded-xl bg-modalBgClr">
                    <div className="flex justify-between items-center">
                        <Dialog.Title className="font-bold text-xl">{selectedTable.tableName}</Dialog.Title>
                        <button onClick={() => setOpenTableInfo(false)}>
                        <AiOutlineClose
                            size={28}
                            className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                        />
                        </button>
                    </div>
                    <form onSubmit={handleTableInfoSubmit} className="flex flex-col py-4">
                        <label htmlFor="tableName">Table name</label>
                        {selectedTable && (
                            <input
                                className="w-full rounded-lg p-2"
                                id="tableName"
                                name="tableName"
                                required
                                value={selectedTable.tableName}
                                onChange={updateTableName}
                            />
                            )}
                        <div className="flex flex-col md:flex-row items-center mt-5">
                            <button onClick={removeTable} type="button" className="md:mr-auto bg-red-500 hover:bg-red-700 rounded-2xl p-2 text-sm text-primaryTextClr font-bold">Delete table</button>
                            <div className="flex items-center justify-center gap-2 mt-3 md:mt-0">
                                <button onClick={() => setOpenTableInfo(false)} type="button" className="bg-modalBgClr hover:bg-white rounded-2xl p-2 text-buttonClr font-bold text-sm">Cancel</button>
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

export default EditTables