import React from 'react'
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"

const DeleteTableModal = ( {checkDeleteTableModal, setCheckDeleteTableModal, deleteTable } ) => {
  return (
    <Dialog
        open={checkDeleteTableModal}
        onClose={() => setCheckDeleteTableModal(false)}
        className="relative z-[100]"
        >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="flex flex-col p-5 w-full max-w-[550px] h-auto overflow-auto rounded-xl bg-modalBgClr">
            <div className="flex justify-between items-center border-b border-gray-400 pb-4">
                <Dialog.Title className="font-bold text-lg">Delete this table group?</Dialog.Title>
                <button onClick={() => setCheckDeleteTableModal(false)}>
                <AiOutlineClose
                    size={28}
                    className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                />
                </button>
            </div>

            <div className="flex flex-col items-center">
                <p className="text-sm font-bold text-red-500 text-center py-6">Are you sure you want to delete this table group? This can't be undone.</p>
                <div className="flex justify-evenly items-center w-full border-t border-gray-400">
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
                    Delete table
                </button>
                </div>
            </div>
            </Dialog.Panel>
        </div>
    </Dialog>
  )
}

export default DeleteTableModal