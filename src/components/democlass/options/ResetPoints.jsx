import React, {useContext} from 'react'
import DemoStudentDataContext from "../../../DemoStudentDataContext"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"

const ResetPoints = ({ openResetPointsModal, setOpenResetPointsModal }) => {
    const { setDemoStudentData } = useContext(DemoStudentDataContext)  

    const resetPoints = () => {
        setDemoStudentData((prevStudents) => {
            return prevStudents.map((student) => {
                return { ...student, points: 0 }
            })
          })
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
                    <Dialog.Panel className="flex flex-col justify-between p-5 w-[80%] max-w-[500px] h-[35%] md:h-[24%] rounded-xl bg-blue-100">
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
                            This will reset all of your students points
                    </Dialog.Description>
                    <div className="flex justify-center items-center">
                        <button onClick={resetPoints} className="text-sm md:text-base bg-buttonClr text-primaryTextClr rounded-lg shadow-lg hover:scale-105 duration-300 p-4">Reset Students Points</button>
                    </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
  )
}

export default ResetPoints