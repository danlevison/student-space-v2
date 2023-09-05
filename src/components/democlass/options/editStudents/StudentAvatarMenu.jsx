import React ,{Fragment} from 'react'
import Image from "next/image"
import { Menu, Transition } from '@headlessui/react'
import { AiFillCaretDown } from 'react-icons/ai'
import sheepAvatar from "@/../../public/assets/avatars/sheep.svg"
import monkeyAvatar from "@/../../public/assets/avatars/monkey.svg"
import rabbitAvatar from "@/../../public/assets/avatars/rabbit.svg"
import frogAvatar from "@/../../public/assets/avatars/frog.svg"
import snakeAvatar from "@/../..//public/assets/avatars/snake.svg"
import chickenAvatar from "@/../..//public/assets/avatars/chicken.svg"
import giraffeAvatar from "@/../..//public/assets/avatars/giraffe.svg"
import pandaAvatar from "@/../../public/assets/avatars/panda.svg"
import penguinAvatar from "@/../../public/assets/avatars/penguin.svg"
import dogAvatar from "@/../../public/assets/avatars/dog.svg"
import cheetahAvatar from "@/../../public/assets/avatars/cheetah.svg"
import lionAvatar from "@/../..//public/assets/avatars/lion.svg"
import otterAvatar from "@/../../public/assets/avatars/otter.svg"

const StudentAvatarMenu = ( {newStudentAvatar, setNewStudentAvatar} ) => {

    const menuItemData = [
        { imageSrc: sheepAvatar, onClick: () => setNewStudentAvatar(sheepAvatar) },
        { imageSrc: monkeyAvatar, onClick: () => setNewStudentAvatar(monkeyAvatar) },
        { imageSrc: rabbitAvatar, onClick: () => setNewStudentAvatar(rabbitAvatar) },
        { imageSrc: frogAvatar, onClick: () => setNewStudentAvatar(frogAvatar) },
        { imageSrc: snakeAvatar, onClick: () => setNewStudentAvatar(snakeAvatar) },
        { imageSrc: chickenAvatar, onClick: () => setNewStudentAvatar(chickenAvatar) },
        { imageSrc: giraffeAvatar, onClick: () => setNewStudentAvatar(giraffeAvatar) },
        { imageSrc: pandaAvatar, onClick: () => setNewStudentAvatar(pandaAvatar) },
        { imageSrc: penguinAvatar, onClick: () => setNewStudentAvatar(penguinAvatar) },
        { imageSrc: dogAvatar, onClick: () => setNewStudentAvatar(dogAvatar) },
        { imageSrc: cheetahAvatar, onClick: () => setNewStudentAvatar(cheetahAvatar) },
        { imageSrc: lionAvatar, onClick: () => setNewStudentAvatar(lionAvatar) },
        { imageSrc: otterAvatar, onClick: () => setNewStudentAvatar(otterAvatar) },
      ]

  return (
    <Menu as="div" className="inline-block mt-[-2em]">
        <div>
            <Menu.Button 
                type="button" 
                className="relative mt-10 mx-auto flex justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <Image 
                    src={newStudentAvatar}
                    alt="/"
                    width={80}
                    height={80}
                />
                <AiFillCaretDown
                    className="absolute bottom-[-1em] text-iconClr"
                    size={15}
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
            <Menu.Items 
                className="absolute h-[320px] overflow-auto w-[80%] max-w-[420px] left-[50%] translate-x-[-50%] grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-4 mt-2 p-4 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
            {menuItemData.map((menuItem, index) => (
                <Menu.Item key={index} className="w-full">
                    <button 
                        onClick={menuItem.onClick} 
                        type="button" 
                        className="group flex justify-center items-center rounded-xl border-2 border-black p-2 hover:scale-105 duration-300"
                    >
                    <Image
                        src={menuItem.imageSrc}
                        alt="/"
                        width={60}
                        height={60}
                        aria-hidden="true"
                    />
                </button>
            </Menu.Item>
        ))}
        </Menu.Items>
    </Transition>
    </Menu>
  )
}

export default StudentAvatarMenu