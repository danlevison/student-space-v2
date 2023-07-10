import React, {useContext} from 'react'
import DemoStudentDataContext from "../../DemoStudentDataContext"
import { Dialog } from '@headlessui/react'
import { AiOutlineClose } from "react-icons/ai"
import PlaceholderImage from '../../../public/assets/placeholder.jpg';

const AddStudent = ({ isAddStudentModalOpen, setIsAddStudentModalOpen }) => {

    const { demoStudentData, setDemoStudentData } = useContext(DemoStudentDataContext) 
    
    const handleAddStudentSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value
        const dob = e.target.dob.value
        const uuid = crypto.randomUUID()
        const existingStudent = demoStudentData.find(student => student.name === name)
        
        if(existingStudent) {
          alert("A student with this name already exists!")
          e.target.reset()
          return;
        }
      
        const newStudent = {
          name: name,
          dob: dob,
          points: 0,
          avatar: {PlaceholderImage}, // Add the desired value for the avatar property
          uuid: uuid
        };
      
        setDemoStudentData((prevStudents) => {
          return [...prevStudents, newStudent];
        });

        e.target.reset() // Reset the form fields
      };

  return (
    <>
        <Dialog
            open={isAddStudentModalOpen}
            onClose={() => setIsAddStudentModalOpen(false)}
            className="relative z-50"
        >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />
    
            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                
                <Dialog.Panel className="p-5 w-[400px] h-[300px] rounded-xl bg-blue-100">
                    <div className="flex justify-between items-center">
                        <Dialog.Title className="font-bold text-xl">Add student</Dialog.Title>
                        <button onClick={() => setIsAddStudentModalOpen(false)}>
                            <AiOutlineClose size={28} className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"/>
                        </button>
                    </div>
                    <form onSubmit={handleAddStudentSubmit} className="flex flex-col py-4">
                        <label htmlFor="name">First name</label>
                        <input className="w-full rounded-lg p-2" type="text" id="name" name="name" required />
                    
                        <label className="pt-4" htmlFor="dob">Date of birth</label>
                        <input className="w-full rounded-lg p-2" type="date" id="dob" name="dob" required />
                    
                        <button className="bg-buttonClr p-3 mt-4 rounded-lg text-primaryTextClr w-full hover:scale-105 duration-300" type="submit" aria-label="Submit add student form">Add Student</button>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    </>
  )
}

export default AddStudent