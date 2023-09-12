import React, {useState} from 'react'
import Image from "next/image"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"
import DeleteTableModal from "./DeleteTableModal"

const TableInfoModal = ( 
    {
    openTableInfo, 
    setOpenTableInfo,
    selectedTableName,
    handleTableInfoSubmit,
    alert,
    alertMessage,
    tempSelectedTableName,
    updateTableName,
    tempStudentData,
    uncheckStudent,
    } 
    ) => {
        const [openCheckDeleteTableModal, setOpenCheckDeleteTableModal] = useState(false)

  return (
    <Dialog
        open={openTableInfo}
        onClose={() => setOpenTableInfo(false)}
        className="relative z-50"
        >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="flex flex-col p-5 w-full max-w-[600px] h-full max-h-[500px] rounded-xl bg-modalBgClr overflow-auto">
            <div className="flex justify-between items-center pb-2">
                <Dialog.Title className="font-bold text-xl">{selectedTableName}</Dialog.Title>
                <button onClick={() => setOpenTableInfo(false)}>
                <AiOutlineClose
                    size={28}
                    className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                />
                </button>
            </div>
            <form onSubmit={handleTableInfoSubmit} className="flex flex-col h-full">
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
                            alt="Student Avatar: Sketched Animal" 
                            width={40} 
                            height={40} 
                            className="select-none"
                            />
                            <span className="font-bold mt-1 text-lg">{student.name}</span>
                        </label>
                        </div>
                    ))}
                </div>

                <div className="flex-grow" />
                <div className="flex flex-row-reverse justify-between items-center pb-2"> 
                    <div className="flex items-center justify-center gap-2">
                        <button 
                            onClick={() => setOpenTableInfo(false)} 
                            type="button" 
                            className="bg-modalBgClr hover:bg-white rounded-2xl py-2 px-3 text-buttonClr text-sm font-bold"
                        >
                            Cancel
                        </button>
                        <button 
                            className="font-bold text-sm bg-white hover:bg-green-200 rounded-2xl py-2 px-5 disabled:bg-gray-400"
                        >
                            Save
                        </button>
                    </div>
                    <button 
                        onClick={() => setOpenCheckDeleteTableModal(!openCheckDeleteTableModal)} 
                        type="button" 
                        className="w-[110px] bg-red-500 hover:bg-red-700 rounded-2xl py-2 px-3 text-primaryTextClr text-sm font-bold"
                    >
                        Delete table
                    </button>
                </div>
            </form>
            </Dialog.Panel>
        </div>
        
        <DeleteTableModal 
            openCheckDeleteTableModal={openCheckDeleteTableModal} 
            setOpenCheckDeleteTableModal={setOpenCheckDeleteTableModal}
            selectedTableName={selectedTableName}
            setOpenTableInfo={setOpenTableInfo} 
        />
    </Dialog>
  )
}

export default TableInfoModal