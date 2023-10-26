import React, { useState, useRef, useContext, useEffect } from "react"
import { Dialog } from "@headlessui/react"
import { fetchTaskListData } from "@/api"
import { db } from "@/utils/firebase"
import { doc, updateDoc, arrayUnion } from "firebase/firestore"
import { useAuth } from "@/context/AuthContext"
import StudentDataContext from "@/context/StudentDataContext"
import { AiOutlineClose } from "react-icons/ai"

type TaskListProps = {
	openTaskList: boolean
	setOpenTaskList: React.Dispatch<React.SetStateAction<boolean>>
	setRemainingTasks: React.Dispatch<React.SetStateAction<number>>
}

type TasksType = {
	id: string
	title: string
	completed: boolean
}

const TaskList = ({
	openTaskList,
	setOpenTaskList,
	setRemainingTasks
}: TaskListProps) => {
	const { params } = useContext(StudentDataContext)
	const { currentUser } = useAuth()
	const [newItem, setNewItem] = useState("")
	const [tasks, setTasks] = useState<TasksType[]>([])
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (params.classroom_id) {
			const loadTaskListData = async () => {
				try {
					const taskListData = await fetchTaskListData(
						currentUser,
						params.classroom_id
					)

					if (Array.isArray(taskListData)) {
						setTasks(taskListData)
					} else {
						console.error("taskListData is not an array or is undefined.")
					}
				} catch (error) {
					console.error("Error fetching task list data from Firestore:", error)
				}
			}
			loadTaskListData()
		}
	}, [currentUser, params.classroom_id])

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()

		try {
			const newTask = {
				id: crypto.randomUUID(),
				title: newItem,
				completed: false
			}

			// Adds a new task to the tasks array
			setTasks((currentTasks) => {
				return [...currentTasks, newTask]
			})

			if (currentUser.uid && params.classroom_id) {
				const classDocumentRef = doc(
					db,
					"users",
					currentUser.uid,
					"classes",
					params.classroom_id
				)

				// Add a new field to the class collection with the tasks
				await updateDoc(classDocumentRef, {
					taskListData: arrayUnion(newTask)
				})
			}
		} catch (error) {
			console.error("Error adding new task", error)
		}

		setNewItem("")
		inputRef.current?.focus()
	}

	const toggleTaskCompleted = async (id: string, completed: boolean) => {
		const updatedTasks = tasks.map((task) => {
			if (task.id === id) {
				return { ...task, completed }
			}
			return task
		})

		setTasks(updatedTasks)

		if (currentUser.uid && params.classroom_id) {
			const classDocumentRef = doc(
				db,
				"users",
				currentUser.uid,
				"classes",
				params.classroom_id
			)

			await updateDoc(classDocumentRef, {
				taskListData: updatedTasks
			})
		}
	}

	const deleteTask = async (id: string) => {
		const updatedTasks = tasks.filter((task) => task.id !== id)
		setTasks(updatedTasks)

		if (currentUser.uid && params.classroom_id) {
			const classDocumentRef = doc(
				db,
				"users",
				currentUser.uid,
				"classes",
				params.classroom_id
			)

			await updateDoc(classDocumentRef, {
				taskListData: updatedTasks
			})
		}
	}

	// for remaining tasks number on toolbar
	useEffect(() => {
		setRemainingTasks(tasks.length)
	}, [tasks, setRemainingTasks])

	return (
		<Dialog
			initialFocus={inputRef}
			open={openTaskList}
			onClose={() => {
				setOpenTaskList(false)
				setNewItem("")
			}}
			className="relative z-50"
		>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-modalBackdropClr"
				aria-hidden="true"
			/>

			{/* Full-screen container to center the panel */}
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="w-full max-w-[800px] h-full max-h-[1000px] rounded-xl bg-modalBgClr border-2 border-modalBorderClr overflow-auto">
					<div className="p-5 flex justify-between items-center border-b-2 border-gray-300">
						<Dialog.Title className="font-bold text-xl">Task List</Dialog.Title>
						<button
							onClick={() => {
								setOpenTaskList(false)
								setNewItem("")
							}}
						>
							<AiOutlineClose
								size={28}
								className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
							/>
						</button>
					</div>

					<form
						onSubmit={handleSubmit}
						className="p-5"
					>
						<div className="flex flex-col">
							<label
								htmlFor="item"
								className="text-lg"
							>
								New Task
							</label>
							<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
								<input
									onChange={(e) => setNewItem(e.target.value)}
									value={newItem}
									type="text"
									id="item"
									ref={inputRef}
									className="w-full rounded-lg p-2 outline-inputOutlineClr"
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
					<h2 className="text-2xl p-5">Your tasks</h2>
					<ul className="flex flex-col gap-4 p-5">
						{tasks.length === 0 && (
							<p className="text-center">All done! No tasks left for now.</p>
						)}
						{tasks.map((task) => {
							return (
								<li
									key={task.id}
									className="flex justify-between items-center gap-5"
								>
									<label
										className={`text-lg flex gap-2 w-3/4 ${
											task.completed ? "text-gray-400" : ""
										}`}
									>
										<input
											onChange={(e) =>
												toggleTaskCompleted(task.id, e.target.checked)
											}
											checked={task.completed}
											type="checkbox"
											className="w-4"
										/>
										<span className="w-full break-words">{task.title}</span>
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
