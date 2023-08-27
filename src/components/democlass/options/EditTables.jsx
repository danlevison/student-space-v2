import React, {useState, useContext, useEffect} from 'react'
import Image from "next/image"
import StudentDataContext from "@/StudentDataContext"
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"

const EditTables = ({ isEditTablesModalOpen, setIsEditTablesModalOpen }) => {
    const { studentData, setStudentData, userUid, userClassName } = useContext(StudentDataContext)
    const [openTableInfo, setOpenTableInfo] = useState(false)
    const [checkDeleteTableModal, setCheckDeleteTableModal] = useState(false)
    const [selectedTableName, setSelectedTableName] = useState(null)
    const [updatedTableName, setUpdatedTableName] = useState("")
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [tempStudentData, setTempStudentData] = useState(studentData)
    const [tempSelectedTableName, setTempSelectedTableName] = useState(selectedTableName)

    useEffect(() => {
      setAlert(false)
      setAlertMessage("")
    },[openTableInfo])
    
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

    const updateTableName = (e) => {
      const newTableName = e.target.value // removes empty spaces
      const capitalisedNewTableName = newTableName.charAt(0).toUpperCase() + newTableName.slice(1)
      setUpdatedTableName(capitalisedNewTableName)
      setTempSelectedTableName(newTableName)
      setAlert(false)
    }

    const handleTableInfoSubmit = async (e) => {
      e.preventDefault()

      // Check if alert is true and prevent form submission
      if (alert) {
        return
      }

      try {
        const tableName = updatedTableName ? updatedTableName : selectedTableName
        const existingTableName = studentData.find((student) => student.tableData?.tableName === tableName)

          if (existingTableName && existingTableName.tableData?.tableName !== selectedTableName) {
            setAlert(true)
            setAlertMessage("A table with this name already exists!")
            setUpdatedTableName("")
            return
          }
        

        // Update studentData tableData to show updatedTableName in demoClass
        const updatedStudentData = tempStudentData.map((student) => {
          if (student.tableData?.tableName === selectedTableName) {
            return {...student, tableData: {...student.tableData, tableName: tableName.trim()} }
          }
          return student
        })

        // setStudentData(updatedStudentData)
        setStudentData(updatedStudentData)

        if(userUid && userClassName) {
           // User is in their own class context (Firebase)
           const classCollectionRef = collection(db, 'users', userUid, userClassName)
           const classDocumentRef = doc(classCollectionRef, userUid)
     
           // Update the Firestore document with the updated studentData (// Update studentData tableData property to show updatedTableName in users class)
           await updateDoc(classDocumentRef, {
             studentData: updatedStudentData,
           })
         }

      } catch (error) {
        console.error('Error updating student information:', error)
      }

      alert ? setOpenTableInfo(true) : setOpenTableInfo(false)
      setIsEditTablesModalOpen(false)
      setSelectedTableName(updatedTableName || selectedTableName)
    }

    const uncheckStudent = (selectedStudent) => {
      setTempStudentData((prevTempStudentData) => {
        return prevTempStudentData.map((student) => {
          if (selectedStudent === student.name) {
            return {...student, tableData: {...student.tableData, isOnTable: !student.tableData.isOnTable}}
          }
          return student
        })
      })
    }

    const checkDeleteTable = () => {
      setCheckDeleteTableModal(!checkDeleteTableModal)
    }

    const deleteTable = async () => {
        try {
          // Reset demoStudentData tableData property back to default and deletes table from demoClass
          const updatedStudentData = studentData.map((student) => {
            if (student.tableData.tableName === selectedTableName) {
              return {...student, tableData: {tableName: "", tablePoints: 0, isOnTable: false, selected: false}}
            }
            return student
          })

          // Set the updated student data to the state
          setStudentData(updatedStudentData)

          if(userUid && userClassName) {
            // User is in their own class context (Firebase)
            const classCollectionRef = collection(db, 'users', userUid, userClassName)
            const classDocumentRef = doc(classCollectionRef, userUid)
      
            // Update the Firestore document with the updated studentData (resets studentData tableData property and deletes table from users class)
            await updateDoc(classDocumentRef, {
              studentData: updatedStudentData,
            })
          }

        } catch (error) {
          console.error('Error updating student information:', error)
        }

        setCheckDeleteTableModal(false)
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
              <Dialog.Panel className="p-5 w-auto sm:min-w-[400px] max-w-[800px] rounded-xl bg-modalBgClr">
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
                        <p className="text-xl">No table data available</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 h-auto max-h-[370px] overflow-auto mt-4 p-4">
                    {/* Render a button for each table name */}
                    {tableNames.map((tableName) => (
                      <button
                        key={tableName}
                        onClick={() => handleTableModal(tableName)}
                        className="text-center text-lg bg-white p-4 shadow-lg rounded-xl hover:scale-105 duration-300 break-words"
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
                    <Dialog.Panel className="flex flex-col p-5 w-full max-w-[800px] h-full sm:h-auto overflow-auto rounded-xl bg-modalBgClr">
                    <div className="flex justify-between items-center pb-2">
                        <Dialog.Title className="font-bold text-xl">{selectedTableName}</Dialog.Title>
                        <button onClick={() => setOpenTableInfo(false)}>
                        <AiOutlineClose
                            size={28}
                            className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                        />
                        </button>
                    </div>
                    <form onSubmit={handleTableInfoSubmit} className="flex flex-col">
                        {alert ? <p className="font-bold text-red-500 pb-1">{alertMessage}</p> : <label htmlFor="tableName" className="pb-1">Table name</label>}
                        <input
                          className={alert ? "border-2 border-red-500 w-full rounded-lg p-2 outline-none" : "border-2 border-gray-400 w-full rounded-lg p-2 outline-inputOutlineClr"}
                          id="tableName"
                          name="tableName"
                          value={tempSelectedTableName}
                          onChange={updateTableName}
                          type="text"
                          maxLength={20}
                        />
                        
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4 items-center py-4">
                          {tempStudentData.filter((student) => student.tableData?.tableName === selectedTableName).map((student) => (
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
                                  className="text-center select-none flex flex-col items-center w-28 cursor-pointer bg-white p-4 shadow-lg rounded-xl peer-checked:bg-green-200 peer-hover:scale-105 duration-300"
                                >
                                  <Image 
                                    src={student.avatar} 
                                    alt="/" 
                                    width={40} 
                                    height={40} 
                                    className="select-none"
                                  />
                                  <span className="font-bold mt-1 text-lg">{student.name}</span>
                                </label>
                              </div>
                            ))}
                        </div>
                        <div className="flex flex-col justify-end sm:flex-row-reverse items-center mt-1"> 
                            <div className="flex items-center justify-center gap-2">
                                <button 
                                  onClick={() => setOpenTableInfo(false)} 
                                  type="button" 
                                  className="bg-modalBgClr hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold"
                                >
                                  Cancel
                                </button>
                                <button 
                                  className="font-bold bg-white hover:bg-green-200 rounded-2xl py-2 px-5 disabled:bg-gray-400"
                                >
                                  Save
                                </button>
                            </div>
                            <button 
                              onClick={checkDeleteTable} 
                              type="button" 
                              className="w-full sm:w-[180px] sm:mr-auto bg-red-500 hover:bg-red-700 rounded-2xl py-2 px-3 text-primaryTextClr font-bold mt-3 sm:mt-0"
                            >
                                Delete table
                            </button>
                        </div>
                    </form>
                    </Dialog.Panel>
                </div>
                    <Dialog
                      open={checkDeleteTableModal}
                      onClose={() => setCheckDeleteTableModal(false)}
                      className="relative z-[100]"
                      >
                      {/* Backdrop */}
                      <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
              
                      {/* Full-screen container to center the panel */}
                      <div className="fixed inset-0 flex items-center justify-center p-4">
                          <Dialog.Panel className="flex flex-col p-5 w-full max-w-[450px] h-auto overflow-auto rounded-xl bg-modalBgClr">
                            <div className="flex flex-col justify-center items-center">
                              <p className="font-bold text-red-500 text-center">Are you sure you want to delete this table group?</p>
                              <div className="flex justify-evenly items-center w-full">
                                <button 
                                  onClick={() => setCheckDeleteTableModal(false)}
                                  className="bg-modalBgClr hover:bg-white rounded-xl py-2 px-3 text-buttonClr font-bold mt-4"
                                  >
                                  Cancel
                                </button>
                                <button 
                                onClick={deleteTable}
                                className="bg-red-500 hover:bg-red-700 rounded-xl py-2 px-5 text-primaryTextClr font-bold mt-4"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </Dialog.Panel>
                      </div>
                  </Dialog>
                </Dialog>
              )}
          </Dialog>
    </>
  )
}

export default EditTables