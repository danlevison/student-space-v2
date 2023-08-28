import React, {useState, useRef, useContext, useEffect} from 'react'
import { Dialog } from '@headlessui/react'
import { auth, db } from "@/utils/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, updateDoc, getDocs, collection, arrayUnion } from 'firebase/firestore'
import StudentDataContext from "@/StudentDataContext"
import { AiOutlineClose } from 'react-icons/ai'

const TaskList = ( {openTaskList, setOpenTaskList} ) => {
    const [user, loading] = useAuthState(auth)
    const { userUid, userClassName } = useContext(StudentDataContext)
    const [newItem, setNewItem] = useState("")
    const [tasks, setTasks] = useState([])
    const inputRef = useRef(null)

    useEffect(() => {
        if (userUid && userClassName) {
          fetchTaskListData()
        }
      }, [userUid, userClassName])

    const fetchTaskListData = async () => {
        try {
            const classCollectionRef = collection(db, 'users', userUid, userClassName)
            const classSnapshot = await getDocs(classCollectionRef)
            const fbTaskListData = classSnapshot.docs.map((doc) => doc.data().taskListData).filter((data) => data !== null && data !== undefined) // Filter out null or undefined TaskListData
            setTasks(fbTaskListData.flat()) // The flat() method is used to merge these arrays into a single array 
            
        } catch (error) {
            console.log('Error fetching task list data from Firestore:', error)
        }
    }

    const handleSubmit =  async (e) => {
        e.preventDefault()

        try {
            const newTask =  {
                id: crypto.randomUUID(), 
                title: newItem, 
                completed: false
            }

            setTasks((currentTasks) => {
                return [...currentTasks, newTask] 
            })

            if (userUid && userClassName) {
                const docRef = doc(db, 'users', user.uid)
                const classDocumentRef = doc(collection(docRef, "users class"), user.uid)

                // Add a new field to the class collection
                await updateDoc(classDocumentRef, {
                    taskListData: arrayUnion(newTask)
                })
            }

        } catch (error) {
            console.error("Error adding new task", error)
        }

        setNewItem("")
        inputRef.current.focus()
    }

    const toggleTask = async (id, completed) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {...task, completed}
            }
            return task
        })

        setTasks(updatedTasks)

        if (userUid && userClassName) {
            const docRef = doc(db, 'users', user.uid)
            const classDocumentRef = doc(collection(docRef, "users class"), user.uid)

            await updateDoc(classDocumentRef, {
                taskListData: updatedTasks
            })
        }
    }

    const deleteTask = async (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks)
  
        if (userUid && userClassName) {
            const docRef = doc(db, 'users', user.uid)
            const classDocumentRef = doc(collection(docRef, "users class"), user.uid)

            await updateDoc(classDocumentRef, {
                taskListData: updatedTasks
            })
        }
    }

    return (
        <Dialog initialFocus={inputRef} open={openTaskList} onClose={() => setOpenTaskList(false)} className="relative z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="p-5 w-full h-full lg:w-[650px] lg:h-[450px] rounded-xl bg-blue-100 overflow-auto">
                    <div className="flex justify-between items-center pb-4">
                        <Dialog.Title className="font-bold text-xl">Task List</Dialog.Title>
                        <button onClick={() => setOpenTaskList(false)}>
                            <AiOutlineClose
                                size={28}
                                className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
                            />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="item" className="text-lg">New Task</label>
                            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                                <input 
                                    type="text"
                                    value={newItem}
                                    onChange={e => setNewItem(e.target.value)}
                                    id="item"
                                    ref={inputRef}
                                    className="border-2 border-gray-400 w-full rounded-lg p-2 outline-inputOutlineClr"
                                />
                                <button 
                                    className="flex justify-center items-center w-full sm:w-[200px] text-lg bg-buttonClr p-2 rounded-lg text-primaryTextClr hover:scale-[1.02] duration-300 disabled:bg-gray-400 disabled:scale-100 disabled:duration-0"
                                    disabled={!newItem}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                    <h2 className="text-2xl py-4">Your tasks</h2>
                    <ul className="flex flex-col gap-4">
                        {tasks.length === 0 && "No Tasks"}
                        {tasks.map(task => {
                            return (
                                <li key={task.id} className="flex justify-between items-center">
                                    <label className={task.completed ? "text-lg text-gray-400 flex gap-2" : "text-lg flex gap-2" }>
                                        <input 
                                            type="checkbox" 
                                            checked={task.completed} 
                                            onChange={e => toggleTask(task.id, e.target.checked)}
                                            className="w-4" 
                                        />
                                        {task.title}
                                    </label>
                                    <button 
                                    onClick={() => deleteTask(task.id)}
                                    className="bg-red-500 hover:bg-red-700 rounded-lg py-1 px-3 text-primaryTextClr font-bold"
                                    >
                                        Delete
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default TaskList