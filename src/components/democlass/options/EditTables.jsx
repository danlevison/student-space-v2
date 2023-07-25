import React, {useState, useContext} from 'react'
import Image from "next/image"
import DemoStudentDataContext from "../../../DemoStudentDataContext"
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"

const EditTables = ({ isEditTablesModalOpen, setIsEditTablesModalOpen }) => {
    const { demoStudentData, setDemoStudentData, userUid, classname } = useContext(DemoStudentDataContext)
    const [openTableInfo, setOpenTableInfo] = useState(false)
    const [selectedTableName, setSelectedTableName] = useState(null)
    const [updatedTableName, setUpdatedTableName] = useState("")

    // Collect unique table names using a Set
    const tableNamesSet = new Set()
    demoStudentData.forEach((student) => {
      if (student.tableData?.tableName) {
        tableNamesSet.add(student.tableData.tableName)
      }
    })

    // Convert Set back to an array of table names
    const tableNames = Array.from(tableNamesSet)

    const handleTableModal = (tableName) => {
        setSelectedTableName(tableName)
        setOpenTableInfo(true)
    }

    const updateTableName = (e) => {
      setUpdatedTableName(e.target.value)
    }
    

    const handleTableInfoSubmit = async (e) => {
      e.preventDefault()
      try {
        // Update demoStudentData tableData to show updatedTableName in demoClass
        const updatedStudentData = demoStudentData.map((student) => {
          if (student.tableData?.tableName === selectedTableName) {
            return {...student, tableData: {...student.tableData, tableName: updatedTableName} }
          }
          return student
        })

        setDemoStudentData(updatedStudentData)

        if(userUid && classname) {
           // User is in their own class context (Firebase)
           const classCollectionRef = collection(db, 'users', userUid, classname)
           const classDocumentRef = doc(classCollectionRef, userUid)
     
           // Update the Firestore document with the updated studentData (// Update studentData tableData property to show updatedTableName in users class)
           await updateDoc(classDocumentRef, {
             studentData: updatedStudentData,
           })
         }
      
      } catch (error) {
        console.error('Error updating student information:', error)
      }

      setOpenTableInfo(false)
      setSelectedTableName(updatedTableName)
    }

    const uncheckStudent = (selectedStudent) => {
      setDemoStudentData((prevDemoStudentData) => {
        return prevDemoStudentData.map((student) => {
          if (selectedStudent === student.name) {
            return {...student, tableData: {...student.tableData, isOnTable: !student.tableData.isOnTable}}
          }
          return student
        })
      })
    }

    const deleteTable = async () => {
        try {
          // Reset demoStudentData tableData property back to default and deletes table from demoClass
          const updatedStudentData = demoStudentData.map((student) => {
            if (student.tableData.tableName === selectedTableName) {
              return {...student, tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false}}
            }
            return student
          })

          // Set the updated student data to the state
          setDemoStudentData(updatedStudentData)

          if(userUid && classname) {
            // User is in their own class context (Firebase)
            const classCollectionRef = collection(db, 'users', userUid, classname)
            const classDocumentRef = doc(classCollectionRef, userUid)
      
            // Update the Firestore document with the updated studentData (resets studentData tableData property and deletes table from users class)
            await updateDoc(classDocumentRef, {
              studentData: updatedStudentData,
            })
          }

        } catch (error) {
          console.error('Error updating student information:', error)
        }

        setOpenTableInfo(false)
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
                {tableNames.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                        <p className="text-xl">No table data available</p>
                  </div>
                ) : (
                  <div className="overflow-auto h-5/6 mt-4">
                    {/* Render a button for each table name */}
                    {tableNames.map((tableName) => (
                      <button
                        key={tableName}
                        onClick={() => handleTableModal(tableName)}
                        className="block w-full bg-gray-100 hover:bg-gray-400 border-b border-gray-400 py-2"
                      >
                        {tableName}
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
                        <Dialog.Title className="font-bold text-xl">{selectedTableName}</Dialog.Title>
                        <button onClick={() => setOpenTableInfo(false)}>
                        <AiOutlineClose
                            size={28}
                            className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                        />
                        </button>
                    </div>
                    <form onSubmit={handleTableInfoSubmit} className="flex flex-col py-4">
                        <label htmlFor="tableName">Table name</label>
                        <input
                          className="w-full rounded-lg p-2"
                          id="tableName"
                          name="tableName"
                          required
                          placeholder={selectedTableName}
                          onChange={updateTableName}
                        />
                        
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 items-center py-4">
                          {demoStudentData.filter((student) => student.tableData?.tableName === selectedTableName).map((student) => (
                              <div key={student.name} className="flex justify-center">
                                <input
                                  onChange={() => uncheckStudent(student.name)}
                                  type="checkbox"
                                  checked={student.tableData.isOnTable}
                                  id={student.name}
                                  name={student.name}
                                  className="hidden peer"
                                />
                                <label
                                  htmlFor={student.name}
                                  className="select-none flex flex-col items-center w-28 cursor-pointer bg-white p-4 shadow-lg rounded-xl peer-checked:bg-green-200 peer-hover:scale-105 duration-300"
                                >
                                  <Image src={student.avatar} alt="/" width={30} height={30} className="select-none"/>
                                  <span className="font-bold mt-1 text-lg">{student.name}</span>
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