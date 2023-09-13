import React, {useState, useEffect, useContext} from 'react'
import Image from 'next/image'
import StudentDataContext from "@/StudentDataContext"
import { doc, collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from "../../../utils/firebase"
import { FaAward } from 'react-icons/fa'
import { RiAddLine } from "react-icons/ri"
import AddStudent from "@/components/democlass/student/AddStudent"
import pointsSound from "../../../../public/audio/points.mp3"
import Confetti from 'react-confetti'
import { useWindowSize } from "@reactuses/core"
// Avatars
import sheepAvatar from "../../../../public/assets/avatars/sheep.svg"
import monkeyAvatar from "../../../../public/assets/avatars/monkey.svg"
import rabbitAvatar from "../../../../public/assets/avatars/rabbit.svg"
import frogAvatar from "../../../../public/assets/avatars/frog.svg"
import snakeAvatar from "../../../../public/assets/avatars/snake.svg"
import chickenAvatar from "../../../../public/assets/avatars/chicken.svg"
import giraffeAvatar from "../../../../public/assets/avatars/giraffe.svg"
import pandaAvatar from "../../../../public/assets/avatars/panda.svg"
import penguinAvatar from "../../../../public/assets/avatars/penguin.svg"
import dogAvatar from "../../../../public/assets/avatars/dog.svg"
import cheetahAvatar from "../../../../public/assets/avatars/cheetah.svg"
import lionAvatar from "../../../../public/assets/avatars/lion.svg"
import otterAvatar from "../../../../public/assets/avatars/otter.svg"

const StudentGrid = () => {
    const { studentData, setStudentData, userUid, userClassName, showConfetti, setShowConfetti } = useContext(StudentDataContext)
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
    const { width, height } = useWindowSize()
    const [avatars, setAvatars] = useState([monkeyAvatar, rabbitAvatar, pandaAvatar, cheetahAvatar, sheepAvatar, chickenAvatar, penguinAvatar, dogAvatar, giraffeAvatar, snakeAvatar, otterAvatar, frogAvatar, lionAvatar])

    // Fetch the user's student data from the Firestore subcollection when userUid and className are available
    useEffect(() => {
      if (userUid && userClassName) {
        // Implement fetching of student data from Firestore using userUid and className
        fetchStudentDataFromFirestore()
      }
    }, [userUid, userClassName])

    const fetchStudentDataFromFirestore = async () => {
      try {
        // Implement fetching of student data from Firestore using userUid and className
        const classCollectionRef = collection(db, 'users', userUid, userClassName)
        const classSnapshot = await getDocs(classCollectionRef)
        const studentsData = classSnapshot.docs.map((doc) => doc.data().studentData) // The studentsData array, obtained from map((doc) => doc.data().studentData), is an array of arrays
        setStudentData(studentsData.flat()) // The flat() method is used to merge these arrays into a single array 
        // setting studentData to the studentData from firebase allows users studentData to be rendered
      } catch (error) {
        console.log('Error fetching student data from Firestore:', error)
      }
    }

    const handlePointClick = async (uuid) => {
      try {
        // Find the student with the given UUID
        const studentToUpdate = studentData.find((student) => student.uuid === uuid)
    
        if (!studentToUpdate) {
          console.error('Student not found')
          return
        }
    
        // Increment the points in the studentData state
        const updatedStudentData = studentData.map((student) => {
          if (student.uuid === uuid) {
            return { ...student, points: student.points + 1 }
          }
          return student
        })

        const pointsAudio = new Audio(pointsSound)
        pointsAudio.volume = 0.2
        pointsAudio.play() 
    
        // Update the demoStudentData state to reflect the new points in the demoClass
        setStudentData(updatedStudentData)

        // Check if the student now has 50 points
        if (studentToUpdate.points + 1 === 50) {
          setShowConfetti(true)

          // After 5 seconds, hide the confetti
          setTimeout(() => {
            setShowConfetti(false)
          }, 6000)
        }
    
        // Update the points in the users firebase studentData and display in the users class
        if (userUid && userClassName) {
          const classCollectionRef = collection(db, 'users', userUid, userClassName)
          const classDocumentRef = doc(classCollectionRef, userUid)
      
          await updateDoc(classDocumentRef, {
            studentData: updatedStudentData,
          })
        }
      } catch (error) {
        console.error('Error updating student points:', error)
      }
    }

    const handleAvatarClick = async (uuid) => {
      try {
        // Find the student with the given UUID
        const studentToUpdate = studentData.find((student) => student.uuid === uuid)
  
        if (!studentToUpdate) {
          console.error('Student not found')
          return
        }
  
        // Get the current avatar index for the student
        const currentAvatarIndex = avatars.findIndex((image) => image.src === studentToUpdate.avatar.src)
  
        // Get the index of the next avatar in the images array
        const nextIndex = (currentAvatarIndex + 1) % avatars.length
  
        // Get the new avatar image from the images array
        const newAvatar = avatars[nextIndex]
  
        // Update the avatar in the demoStudentData state
        const updatedStudentData = studentData.map((student) => {
          if (student.uuid === uuid) {
            return { ...student, avatar: newAvatar }
          }
          return student
        })
  
        // Update the demoStudentData state to reflect the new avatar in the demoClass
        setStudentData(updatedStudentData)
  
        // Update the avatar in the users firebase studentData and display in the users class
        if (userUid && userClassName) {
          const classCollectionRef = collection(db, 'users', userUid, userClassName)
          const classDocumentRef = doc(classCollectionRef, userUid)
  
          await updateDoc(classDocumentRef, {
            studentData: updatedStudentData,
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
          {studentData.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full w-3/4 lg:w-1/2 mx-auto rounded-lg shadow-lg p-4 sm:mt-10 bg-[#f5f5f5]">
              <h2 className="text-center font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">Add your students!</h2>
              <p className="text-center py-8 sm:text-lg">Engage your students by easily tracking and distributing rewards, ensuring that every achievement is acknowledged and celebrated!</p>
              <button 
                onClick={handleAddStudentModal}
                className="bg-buttonClr p-3 md:p-4 rounded-lg text-primaryTextClr hover:scale-105 duration-300">Add students</button>
          </div>
        ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 items-center px-10">
                {studentData.map((student) => (
                    <div key={student.uuid} className="relative flex flex-col justify-center items-center p-8 shadow-lg rounded-md bg-[#f5f5f5]">
                      <p className="font-bold tracking-wide text-center">{student.name}</p>
                      <p className="text-center text-primaryTextClr w-[50px] p-2 bg-iconClr rounded-lg mx-auto my-1">{student.points}</p>
                      <button onClick={() => handlePointClick(student.uuid)}>
                          <FaAward size={30} className="absolute top-2 right-1 text-iconClr hover:text-yellow-500 hover:scale-110 duration-300 ease-in"/>
                      </button>
                      <button
                        onClick={() => handleAvatarClick(student.uuid)} 
                        className="absolute top-1 left-1">
                          <Image 
                          src={student.avatar}
                          alt="Student Avatar: Sketched Animal"
                          width={60}
                          height={60}
                          style={{
                              objectFit: "cover"
                          }}
                          />
                      </button>
                    </div>
                ))}
                <button onClick={handleAddStudentModal} className="flex flex-col justify-center items-center max-w-[435px] p-[2.40rem] shadow-lg rounded-md bg-[#f5f5f5] hover:scale-105 duration-300">
                    <p className="text-lg font-bold">Add student</p>
                    <RiAddLine size={30} />
                </button>
                { showConfetti && <Confetti width={width} height={height} gravity={0.05} numberOfPieces={300} className="w-full" /> }
            </div>
        )}
            {/* Add Student Modal */}
            {isAddStudentModalOpen && 
            <AddStudent
              avatars={avatars}
              isAddStudentModalOpen={isAddStudentModalOpen} 
              setIsAddStudentModalOpen={setIsAddStudentModalOpen} />}
        </>
      )
  }
  
  export default StudentGrid