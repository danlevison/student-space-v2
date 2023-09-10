import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog } from '@headlessui/react'
import { RiAddLine } from "react-icons/ri"
import { toast } from "react-toastify"

function CreateClass({ handleInputChange, setIsClassMade, userClassName }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleClickOpen = () => {
    setIsOpen(true)
  }

  const handleCreateClass = (e) => {
    e.preventDefault()

      if (userClassName === "") {
        console.log("invalid class name")
        return
      }

    setIsOpen(false)
    setIsClassMade(true)
    toast.success("Class successfully created!")
    router.push("/classroom")
  }

  return (
    <div>
        <button onClick={handleClickOpen} className="w-[230px] h-[230px] border border-[#5065A8] shadow-lg bg-white rounded-2xl hover:scale-105 duration-300 ease-out">
            <div className="flex flex-col justify-center items-center">
                <p className="text-lg">Create class</p>
                <RiAddLine size={70} />
            </div>
        </button>
        <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
        >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-[#32416c]/90" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="flex flex-col p-6 mx-auto w-[500px] h-[300px] rounded-3xl bg-modalBgClr">
                <Dialog.Title className="text-3xl font-bold text-center">Create Class</Dialog.Title>
                <form onSubmit={handleCreateClass} className="flex flex-col justify-between h-full pt-4">
                    <div className="flex flex-col">
                        <label htmlFor="classname" className="text-lg py-2">Class name</label>
                        <input 
                          onChange={handleInputChange} 
                          type="text" 
                          id="classname"
                          name="classname" 
                          required
                          maxLength={25}
                          className="py-3 px-2 border border-gray-400 rounded-lg outline-inputOutlineClr" 
                        />
                    </div>
                    <div className="flex justify-center gap-8">
                        <button onClick={() => setIsOpen(false)} type="button" className="w-full text-sm sm:text-xl text-white bg-buttonClr py-3 rounded-xl shadow-md hover:scale-105 duration-300">Cancel</button>
                        <button
                          disabled={!userClassName} 
                          className="w-full text-sm sm:text-xl text-white bg-buttonClr py-3 rounded-xl shadow-md hover:scale-105 duration-300 disabled:bg-gray-400 disabled:hover:scale-100 disabled:duration-0"
                        >
                            Create Class
                        </button>
                    </div>
                </form>
            </Dialog.Panel>
        </div>
        </Dialog>
    </div>
  )
}

export default CreateClass