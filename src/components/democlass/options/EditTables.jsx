import React, {useState, useContext} from 'react'
import DemoStudentDataContext from "../../../DemoStudentDataContext"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"

const EditTables = ({ isEditTablesModalOpen, setIsEditTablesModalOpen }) => {
    const [openTableInfo, setOpenTableInfo] = useState(false)
    const [selectedTable, setSelectedTable] = useState({
        tableName: '',
        students: []
    })
    console.log(selectedTable)
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
    
      // Update the table name for the selected table
      setDemoTableData((prevTables) => {
        return prevTables.map((table) => {
          if (table.uuid === selectedTable.uuid) {
            return { ...table, tableName: updatedTableName }
          }
          return table
        })
      })
    
      // Filter out the unchecked students from the selectedTable.students array
      const checkedStudents = selectedTable.students.filter((student) => student.checked)
    
      // Update the students array for the selected table in demoTableData
      setDemoTableData((prevDemoTableData) => {
        return prevDemoTableData.map((table) => {
          if (table.uuid === selectedTable.uuid) {
            return { ...table, students: checkedStudents }
          }
          return table
        })
      })

      // Check if there are any students left in the table
      const isAnyStudentLeft = checkedStudents.length > 0

      // Delete the table if there are no students left
      if (!isAnyStudentLeft) {
        setDemoTableData((prevTables) => {
          return prevTables.filter((table) => table.uuid !== selectedTable.uuid)
        })
      }
    
      setOpenTableInfo(false)
    }

    const deleteTable = () => {
        setDemoTableData((prevTables) => {
          // Ensures that only tables with a different UUID than the UUID of the selectedTable will be included in the new array.
          return prevTables.filter((table) => table.uuid !== selectedTable.uuid)
        })

        // Resets tableName property on demoStudentData if that students table was deleted, so that they can be added to another table.
        // Check to see if a student name matches the name of a student on the table, if so resets that students tableName property.
        const studentsOnTable = selectedTable.students.map((student) => student.name)
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

    // Remove individual students from their table group
    const uncheckStudent = (studentToRemove) => {
      // Find the index of the student in the students array of selectedTable
      const studentIndex = selectedTable.students.findIndex(
        (student) => student.name === studentToRemove.name
      )
    
      // Make sure the student is found before proceeding
      if (studentIndex !== -1) {
        setDemoStudentData((prevDemoStudentData) => {
          return prevDemoStudentData.map((student) => {
            if (student.name === studentToRemove.name) {
              // Toggle the checked property of the student
              return { ...student, tableName:"", checked: !student.checked }
            }
            return student
          })
        })
    
        setSelectedTable((prevSelectedTable) => {
          // Create a new students array with the updated student
          const updatedStudents = prevSelectedTable.students.map((student) => {
            if (student.name === studentToRemove.name) {
              return { ...student, tableName:"", checked: !student.checked }
            }
            return student
          })
    
          // Return the updated selectedTable with the modified students array
          return { ...prevSelectedTable, students: updatedStudents }
        })
      }
    }

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
                        <p className="text-xl">No table data available</p>
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
                    <Dialog.Panel className="flex flex-col p-5 w-full sm:w-[80%] sm:max-w-[800px] h-full sm:h-auto overflow-auto rounded-xl bg-modalBgClr">
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
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 items-center py-4">
                          {selectedTable.students.map((student) => (
                            <div key={student.name} className="flex justify-center">
                              <input
                                onChange={() => uncheckStudent(student)}
                                type="checkbox"
                                checked={student.checked}
                                id={student.name} 
                                name={student.name} 
                                className="hidden peer"
                              />
                              <label 
                                htmlFor={student.name} 
                                className="select-none flex flex-col items-center w-28 cursor-pointer bg-white p-4 shadow-lg rounded-xl peer-checked:bg-green-200 peer-hover:scale-105 duration-300"
                              > {student.name}
                              </label>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col md:flex-row items-center mt-5">
                            <button onClick={deleteTable} type="button" className="md:mr-auto bg-red-500 hover:bg-red-700 rounded-2xl p-2 text-sm text-primaryTextClr font-bold">Delete table</button>
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