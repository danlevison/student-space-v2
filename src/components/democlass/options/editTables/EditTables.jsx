import React, {useState, useContext, useEffect} from 'react'
import StudentDataContext from "@/StudentDataContext"
import { collection, updateDoc, doc } from 'firebase/firestore'
import { db } from "../../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"
import TableInfoModal from "./TableInfoModal"
import { toast } from "react-toastify"

const EditTables = ({ isEditTablesModalOpen, setIsEditTablesModalOpen }) => {
    const { studentData, setStudentData, userUid, userClassName } = useContext(StudentDataContext)
    const [openTableInfo, setOpenTableInfo] = useState(false)
    const [selectedTableName, setSelectedTableName] = useState(null)
    const [updatedTableName, setUpdatedTableName] = useState("")
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const [tempStudentData, setTempStudentData] = useState(studentData)
    const [tempSelectedTableName, setTempSelectedTableName] = useState(selectedTableName)

    useEffect(() => {
      setAlert(false)
      setAlertMessage("")
      setUpdatedTableName("")
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
      toast.success("Table group edited successfully!")
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
            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 h-fit overflow-auto mt-4 p-4">
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

      <TableInfoModal 
        openTableInfo={openTableInfo} 
        setOpenTableInfo={setOpenTableInfo}
        selectedTableName={selectedTableName}
        handleTableInfoSubmit={handleTableInfoSubmit}
        alert={alert}
        alertMessage={alertMessage}
        tempSelectedTableName={tempSelectedTableName}
        updateTableName={updateTableName}
        tempStudentData={tempStudentData}
        uncheckStudent={uncheckStudent}
      />
    </Dialog>
  )
}

export default EditTables