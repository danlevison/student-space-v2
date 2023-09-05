import React from 'react'
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import StudentAvatarMenu from "./StudentAvatarMenu"
import DeleteStudentModal from "./DeleteStudentModal"

const StudentInfoModal = ( 
    {
        openStudentInfo, 
        setOpenStudentInfo, 
        selectedStudent, 
        handleStudentInfoSubmit, 
        newStudentAvatar, 
        setNewStudentAvatar, 
        updateStudentName,
        updateStudentDob,
        checkDeleteStudentModal,
        setCheckDeleteStudentModal,
        removeStudent,
        alertMessage,
        alert,
    } ) => {
  return (
    <Dialog
        open={openStudentInfo}
        onClose={() => setOpenStudentInfo(false)}
        className="relative z-50"
        >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="flex flex-col p-5 w-full max-w-[500px] h-[500px] rounded-xl bg-modalBgClr">
                <div className="flex justify-between items-center pb-2 z-10">
                    <Dialog.Title className="font-bold text-xl">{selectedStudent.name}</Dialog.Title>
                    <button onClick={() => setOpenStudentInfo(false)}>
                    <AiOutlineClose
                        size={28}
                        className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                    />
                    </button>
                </div>
                <form onSubmit={handleStudentInfoSubmit} className="flex flex-col justify-between h-full">
                <StudentAvatarMenu newStudentAvatar={newStudentAvatar} setNewStudentAvatar={setNewStudentAvatar} />
                <div>
                    <div className="flex flex-col">
                    {alert ?
                        <p className="font-bold text-red-500 pb-1 text-lg">{alertMessage}</p> : <label htmlFor="name" className="pb-1 text-lg">First name</label> }
                        <input
                        className={alert ? "border-2 border-red-500 w-full rounded-lg p-3 outline-none" : "border-2 border-gray-400 w-full rounded-lg p-3 outline-inputOutlineClr"}
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={selectedStudent.name}
                        onChange={updateStudentName}
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="dob" className="pt-3 text-lg">Date of birth</label>
                        <input
                        className="border-2 border-gray-400 bg-white rounded-lg p-3 outline-inputOutlineClr" 
                        type="date"
                        id="dob"
                        name="dob"
                        required
                        value={selectedStudent.dob}
                        onChange={updateStudentDob}
                        />
                    </div>
                </div> 
                    
                    <div className="flex justify-between flex-row-reverse items-center">
                        <div className="flex items-center justify-center gap-2">
                            <button 
                            onClick={() => setOpenStudentInfo(false)} 
                            type="button" 
                            className="bg-modalBgClr hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold text-sm"
                            >
                            Cancel
                            </button>
                            <button
                            disabled={!selectedStudent.name.trim()} 
                            className="text-sm font-bold bg-white hover:bg-green-200 rounded-2xl py-2 px-5 disabled:bg-gray-400 disabled:hover:bg-gray-400"
                            >
                            Save
                            </button>
                        </div>
                        <button 
                        onClick={() => setCheckDeleteStudentModal(!checkDeleteStudentModal)} 
                        type="button" 
                        className="w-[150px] bg-red-500 hover:bg-red-700 rounded-2xl py-2 px-3 text-sm text-primaryTextClr font-bold"
                        >
                        Remove student
                        </button>
                    </div>
                </form>
            </Dialog.Panel>
        </div>
        <DeleteStudentModal 
            checkDeleteStudentModal={checkDeleteStudentModal} 
            setCheckDeleteStudentModal={setCheckDeleteStudentModal} 
            selectedStudent={selectedStudent} 
            removeStudent={removeStudent} 
        />          
    </Dialog>
  )
}

export default StudentInfoModal