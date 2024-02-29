import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Dialog } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import ClassAvatarMenu from "./ClassAvatarMenu";
import DeleteClassModal from "./DeleteClassModal";
import { toast } from "react-toastify";

type EditClassProps = {
  isEditClassModalOpen: boolean;
  setIsEditClassModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  classData: {
    classId: string;
    className: string;
    classAvatar: {
      height: number;
      width: number;
      blurWidth: number;
      src: string;
      blurHeight: number;
    };
  };
  reset: () => void;
};

const EditClass = ({
  isEditClassModalOpen,
  setIsEditClassModalOpen,
  classData,
  reset,
}: EditClassProps) => {
  const { currentUser } = useAuth();
  const [userClassName, setUserClassName] = useState(
    classData?.className || ""
  );
  const [userClassAvatar, setUserClassAvatar] = useState(
    classData?.classAvatar || ""
  );
  const [openDeleteClassModal, setOpenDeleteClassModal] = useState(false);
  const [error, setError] = useState("");

  // update state when classData prop changes
  useEffect(() => {
    setUserClassName(classData?.className || "");
    setUserClassAvatar(classData?.classAvatar || "");
  }, [classData]);

  const updateClassName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserClassName(e.target.value);
  };

  const handleClassInfoSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (userClassName.trim() === "") {
      setError("Please enter a class name");
      return;
    }

    try {
      setError("");
      if (classData.classId) {
        const docRef = doc(
          db,
          "users",
          currentUser.uid,
          "classes",
          classData.classId
        );
        await updateDoc(docRef, {
          className: userClassName.trim(),
          classAvatar: userClassAvatar,
        });
      }
      setUserClassName(userClassName);
      setUserClassAvatar(userClassAvatar);
      toast.success("Class edited successfully!");
    } catch (error) {
      console.error("Class could not be edited", error);
      toast.error("Error editing class, please try again.");
    } finally {
      setIsEditClassModalOpen(false);
    }
  };

  const handleDeleteClassModal = () => {
    setOpenDeleteClassModal(!openDeleteClassModal);
  };

  return (
    <Dialog
      open={isEditClassModalOpen}
      onClose={() => {
        setIsEditClassModalOpen(false);
        reset();
      }}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-modalBackdropClr" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-[500px] h-max max-h-full min-h-[30vh] rounded-xl bg-modalBgClr border-2 border-modalBorderClr overflow-auto">
          <div className="p-5 flex justify-between items-center border-b-2 border-gray-300 mb-10">
            <Dialog.Title className="font-bold text-xl w-3/4 break-words">
              Edit {userClassName}
            </Dialog.Title>
            <button
              onClick={() => {
                setIsEditClassModalOpen(false);
                reset();
              }}
            >
              <AiOutlineClose
                size={28}
                className="bg-white text-secondaryTextClr hover:bg-buttonClr rounded-full hover:text-primaryTextClr p-1"
              />
            </button>
          </div>

          <form
            onSubmit={handleClassInfoSubmit}
            className="flex flex-col p-5"
            id="form"
          >
            <div className="flex justify-center items-center">
              <ClassAvatarMenu
                userClassAvatar={userClassAvatar}
                setUserClassAvatar={setUserClassAvatar}
              />
            </div>
            <label htmlFor="classroomName" className="pb-1 text-xl">
              Class name
            </label>
            <input
              onChange={updateClassName}
              value={userClassName}
              className="w-full rounded-lg p-3 outline-inputOutlineClr text-xl"
              type="text"
              id="classroomName"
              name="classroomName"
              required
              maxLength={30}
            />
            {error && <p className="text-red-500">{error}</p>}
          </form>
          <div className="flex flex-row-reverse justify-between items-center border-t-2 border-gray-300 w-full px-5 py-3 mt-24">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setIsEditClassModalOpen(false);
                  reset();
                }}
                type="button"
                className="bg-modalBgClr hover:bg-white rounded-2xl py-2 px-3 text-buttonClr font-bold text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="form"
                // disabled={!userClassName.trim()}
                className="font-bold text-sm bg-white hover:bg-green-200 rounded-2xl py-2 px-5 disabled:bg-gray-400 disabled:hover:bg-gray-400"
              >
                Save
              </button>
            </div>
            <button
              onClick={handleDeleteClassModal}
              type="button"
              className="w-[110px] bg-red-500 hover:bg-red-700 rounded-2xl py-2 px-3 text-primaryTextClr text-sm font-bold"
            >
              Delete class
            </button>
          </div>
        </Dialog.Panel>
      </div>
      <DeleteClassModal
        openDeleteClassModal={openDeleteClassModal}
        setOpenDeleteClassModal={setOpenDeleteClassModal}
        setIsEditClassModalOpen={setIsEditClassModalOpen}
        classData={classData}
      />
    </Dialog>
  );
};

export default EditClass;
