import React, {useContext} from 'react'
import DemoStudentDataContext from "../../../DemoStudentDataContext"
import { doc, collection, updateDoc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"

const ResetPoints = ({ openResetPointsModal, setOpenResetPointsModal }) => {
    const { demoStudentData, setDemoStudentData, setDemoTableData, userUid, classname } = useContext(DemoStudentDataContext)  

    const resetStudentPoints = async () => {
        try {
            // Reset the students points in the demoClass
            const updatedStudentData = demoStudentData.map((student) => {
                return {...student, points: 0}
            })

            setDemoStudentData(updatedStudentData) // Update the local state with the updated student data

            if(userUid && classname) {
                // User is in their own class context (Firebase)
                const classCollectionRef = collection(db, "users", userUid, classname)
                const classDocumentRef = doc(classCollectionRef, userUid)

                // Update the Firestore document with the updated studentData (Resets students points in users class)
                await updateDoc(classDocumentRef, {
                    studentData: updatedStudentData
                })
              }
            setOpenResetPointsModal(false)

            } catch (error) {
                console.error('Error resetting students points:', error)
            }
    }

    const resetTablePoints = () => {
        setDemoTableData((prevTableData) => {
            return prevTableData.map((table) => {
                return {...table, points: 0}
            })
        })
        setOpenResetPointsModal(false)
    }

  return (
        <Dialog
            open={openResetPointsModal}
            onClose={() => setOpenResetPointsModal(false)}
            className="relative z-50"
            >
                {/* Backdrop */}
                <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
        
                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="flex flex-col justify-between p-5 w-[80%] max-w-[500px] h-[270px] sm:h-[200px] rounded-xl bg-modalBgClr">
                    <div className="flex justify-between items-center">
                        <Dialog.Title className="font-bold text-xl">Reset Points</Dialog.Title>
                        <button onClick={() => setOpenResetPointsModal(false)}>
                        <AiOutlineClose
                            size={28}
                            className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                        />
                        </button>
                    </div>
                    <Dialog.Description className="text-center text-lg">
                            This will reset all points!
                    </Dialog.Description>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-2 sm:py-0">
                        <button onClick={resetStudentPoints} className="text-sm md:text-base bg-buttonClr text-primaryTextClr rounded-lg shadow-lg hover:scale-105 duration-300 p-3">Reset All Student Points</button>
                        <button onClick={resetTablePoints} className="text-sm md:text-base bg-buttonClr text-primaryTextClr rounded-lg shadow-lg hover:scale-105 duration-300 p-3">Reset All Table Points</button>
                    </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
  )
}

export default ResetPoints