import React, {useState, useEffect, useContext} from 'react'
import Image from 'next/image'
import DemoStudentDataContext from "../../../DemoStudentDataContext"
import { doc, collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { FaAward } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { RiAddLine } from "react-icons/ri"
import AddStudent from "./AddStudent"
import bearAvatar from "../../../../public/assets/avatars/bear.png"
import catAvatar from "../../../../public/assets/avatars/cat.png"
import rabbitAvatar from "../../../../public/assets/avatars/rabbit.png"
import pandaAvatar from "../../../../public/assets/avatars/panda.png"
import chickenAvatar from "../../../../public/assets/avatars/chicken.png"
import dogAvatar from "../../../../public/assets/avatars/dog.png"

const StudentGrid = () => {
    const { demoStudentData, setDemoStudentData, userUid, classname } = useContext(DemoStudentDataContext)  
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)

    // Fetch the user's student data from the Firestore subcollection when userUid and className are available
    useEffect(() => {
      if (userUid && classname) {
        // Implement fetching of student data from Firestore using userUid and className
        fetchStudentDataFromFirestore()
      }
    }, [userUid, classname])

    const fetchStudentDataFromFirestore = async () => {
      try {
        // Implement fetching of student data from Firestore using userUid and className
        const classCollectionRef = collection(db, 'users', userUid, classname)
        const classSnapshot = await getDocs(classCollectionRef)
        const studentsData = classSnapshot.docs.map((doc) => doc.data().studentData) // The studentsData array, obtained from map((doc) => doc.data().studentData), is an array of arrays
        setDemoStudentData(studentsData.flat()) // The flat() method is used to merge these arrays into a single array 
        // setting demoStudentData to studentData from firebase allows users studentData to be rendered
      } catch (error) {
        console.log('Error fetching student data from Firestore:', error)
      }
    }

    const handlePointClick = async (uuid) => {
      try {
        // Find the student with the given UUID
        const studentToUpdate = demoStudentData.find((student) => student.uuid === uuid)
    
        if (!studentToUpdate) {
          console.error('Student not found')
          return
        }
    
        // Increment the points in the demoStudentData state
        const updatedDemoStudentData = demoStudentData.map((student) => {
          if (student.uuid === uuid) {
            return { ...student, points: student.points + 1 }
          }
          return student
        })
    
        // Update the demoStudentData state to reflect the new points in the demoClass
        setDemoStudentData(updatedDemoStudentData)
    
        // Update the points in the users firebase studentData and display in the users class
        if (userUid && classname) {
          const classCollectionRef = collection(db, 'users', userUid, classname)
          const classDocumentRef = doc(classCollectionRef, userUid)
      
          await updateDoc(classDocumentRef, {
            studentData: updatedDemoStudentData,
          })
        }
      } catch (error) {
        console.error('Error updating student points:', error)
      }
    }

    const handleAvatarClick = async (uuid) => {
      try {
        const images = [catAvatar, rabbitAvatar, pandaAvatar, bearAvatar, chickenAvatar, dogAvatar]
  
        // Find the student with the given UUID
        const studentToUpdate = demoStudentData.find((student) => student.uuid === uuid)
  
        if (!studentToUpdate) {
          console.error('Student not found')
          return
        }
  
        // Get the current avatar index for the student
        const currentAvatarIndex = images.findIndex((image) => image.src === studentToUpdate.avatar.src)
  
        // Get the index of the next avatar in the images array
        const nextIndex = (currentAvatarIndex + 1) % images.length
  
        // Get the new avatar image from the images array
        const newAvatar = images[nextIndex]
  
        // Update the avatar in the demoStudentData state
        const updatedDemoStudentData = demoStudentData.map((student) => {
          if (student.uuid === uuid) {
            return { ...student, avatar: newAvatar }
          }
          return student
        })
  
        // Update the demoStudentData state to reflect the new avatar in the demoClass
        setDemoStudentData(updatedDemoStudentData)
  
        // Update the avatar in the users firebase studentData and display in the users class
        if (userUid && classname) {
          const classCollectionRef = collection(db, 'users', userUid, classname)
          const classDocumentRef = doc(classCollectionRef, userUid)
  
          await updateDoc(classDocumentRef, {
            studentData: updatedDemoStudentData,
          })
        }
      } catch (error) {
        console.error('Error updating student avatar:', error)
      }
    }

    const handleAddStudentModal = () => {
      setIsAddStudentModalOpen(true)
    }

      return (
        <>
          {demoStudentData.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full w-3/4 lg:w-1/2 mx-auto rounded-lg shadow-lg p-4 sm:mt-10 bg-[#f5f5f5]">
              <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">Add your students!</h2>
              <p className="text-center py-8 sm:text-lg">Engage your students by easily tracking and distributing rewards, ensuring that every achievement is acknowledged and celebrated!</p>
              <button 
                onClick={handleAddStudentModal}
                className="bg-buttonClr p-3 md:p-4 rounded-lg text-primaryTextClr hover:scale-105 duration-300">Add students</button>
          </div>
        ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4 items-center px-10">
                {demoStudentData.map((student) => (
                    <div key={student.uuid} className="relative flex flex-col justify-center items-center p-8 shadow-lg rounded-md bg-[#f5f5f5]">
                      <p className="font-bold tracking-wide">{student.name}</p>
                      <p className="text-center text-primaryTextClr w-[50px] p-2 bg-iconClr rounded-lg mx-auto my-1">{student.points}</p>
                      <button onClick={() => handlePointClick(student.uuid)}>
                          <FaAward size={30} className="absolute top-2 right-1 text-iconClr hover:text-yellow-500 hover:scale-110 duration-300 ease-in"/>
                      </button>
                      <button
                        onClick={() => handleAvatarClick(student.uuid)} 
                        className="absolute top-1 left-1">
                          <Image 
                          src={student.avatar}
                          alt="/"
                          width={60}
                          height={60}
                          className="rounded-full"
                          style={{
                              objectFit: "cover"
                          }}
                          />
                      </button>
                      <button className="absolute bottom-2 right-2">
                          <IoMdSettings size={20} className="text-gray-400"/>
                      </button>
                    </div>
                ))}
                <button onClick={handleAddStudentModal} className="flex flex-col justify-center items-center max-w-[210px] p-[2.40rem] shadow-lg rounded-md bg-[#f5f5f5] hover:scale-105 duration-300">
                    <p className="text-lg font-bold">Add student</p>
                    <RiAddLine size={30} />
                </button>
                
            </div>
        )}
            {/* Add Student Modal */}
            {isAddStudentModalOpen && 
            <AddStudent 
              isAddStudentModalOpen={isAddStudentModalOpen} 
              setIsAddStudentModalOpen={setIsAddStudentModalOpen} />}
        </>
      )
  }
  
  export default StudentGrid