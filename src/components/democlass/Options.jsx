import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AiFillCaretDown } from "react-icons/ai"
import { CiEdit } from "react-icons/ci"
import { RxReset } from "react-icons/rx"
import { TiSortAlphabetically } from "react-icons/ti"
import EditStudents from "./EditStudents"

const Options = ({ students, setStudents }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleEditStudentsModal = () => {
        setIsOpen(true)
    }
  
    return (
        <div>
        <Menu as="div" className="inline-block text-left">
        <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Options
            <AiFillCaretDown
                className="ml-2 -mr-1 h-5 w-5 text-iconClr"
                aria-hidden="true"
            />
            </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
                <Menu.Item>
                {({ active }) => (
                    <button onClick={handleEditStudentsModal}
                    className={`${
                        active ? 'bg-buttonClr text-primaryTextClr' : 'text-secondaryTextClr'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                    {active ? (
                        <CiEdit
                        className="mr-2 h-5 w-5 text-primaryTextClr"
                        aria-hidden="true"
                        />
                    ) : (
                        <CiEdit
                        className="mr-2 h-5 w-5 text-iconClr"
                        aria-hidden="true"
                        />
                    )}
                    Edit Students
                    </button>
                )}
                </Menu.Item>
                <Menu.Item>
                {({ active }) => (
                    <button
                    className={`${
                        active ? 'bg-buttonClr text-primaryTextClr' : 'text-secondaryTextClr'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                    {active ? (
                        <RxReset
                        className="mr-2 h-5 w-5 text-primaryTextClr"
                        aria-hidden="true"
                        />
                    ) : (
                        <RxReset
                        className="mr-2 h-5 w-5 text-iconClr"
                        aria-hidden="true"
                        />
                    )}
                    Reset All Points
                    </button>
                )}
                </Menu.Item>
            </div>
            <div className="px-1 py-1">
                <Menu.Item>
                {({ active }) => (
                    <button
                    className={`${
                        active ? 'bg-buttonClr text-primaryTextClr' : 'text-secondaryTextClr'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                    {active ? (
                        <TiSortAlphabetically
                        className="mr-2 h-5 w-5 text-primaryTextClr"
                        aria-hidden="true"
                        />
                    ) : (
                        <TiSortAlphabetically
                        className="mr-2 h-5 w-5 text-iconClr"
                        aria-hidden="true"
                        />
                    )}
                    Order A-Z
                    </button>
                )}
                </Menu.Item>
            </div>
            </Menu.Items>
        </Transition>
        </Menu>

        {/* Edit Student Modal */}
        {isOpen && <EditStudents isOpen={isOpen} setIsOpen={setIsOpen} students={students} setStudents={setStudents} />}
    </div>
  )
}

export default Options