"use client";

import React, { useState, useEffect } from "react";
import { fetchClassData } from "@/api";
import { useAuth } from "@/context/AuthContext";
import CreateClass from "./_components/CreateClass";
import DemoClassLink from "./_components/DemoClassLink";
import UsersClasses from "./_components/UsersClasses";
import EditClass from "@/app/dashboard/_components/editClass/EditClass";
import Nav from "@/components/Nav/Nav";
import Preloader from "@/components/Preloader";
import ConditionalHeading from "./_components/ConditionalHeading";
import PrivateRoute from "@/components/PrivateRoute";
import ProfileMenu from "@/app/dashboard/_components/account/ProfileMenu";
import Scribble from "@/components/Scribble";
import { dashboardScribbles } from "@/utils/scribbles";
import CurrentDate from "@/components/classroom/DateComponent";
import Error from "@/components/Error";

type SelectedUser = {
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

type ClassDataType = {
  classId: string;
  className: string;
  classAvatar: ClassAvatarType;
  createdAt: CreatedAtType;
};

type CreatedAtType = {
  nanoseconds: number;
  seconds: number;
};

type ClassAvatarType = {
  height: number;
  width: number;
  blurWidth: number;
  src: string;
  blurHeight: number;
};

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [shouldFetchClassData, setShouldFetchClassData] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<SelectedUser | null>(null);
  const [classData, setClassData] = useState<ClassDataType[] | null>(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const loadClassData = async () => {
      try {
        if (currentUser) {
          const data = await fetchClassData(currentUser);
          setClassData(data);
          orderClassesByCreationTime(data);
          setShouldFetchClassData(false);
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
        setError("It looks like something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    loadClassData();
  }, [currentUser, isEditClassModalOpen, shouldFetchClassData]);

  const orderClassesByCreationTime = (data: ClassDataType[]) => {
    if (data) {
      const sortedData = [...data].sort((a, b) => {
        return b.createdAt.seconds - a.createdAt.seconds;
      });
      setClassData(sortedData);
    }
  };

  const reset = () => {
    setFormKey(formKey + 1);
  };

  if (loading) return <Preloader />;

  return (
    <>
      <header className="relative">
        <Nav />
      </header>
      <main className="relative py-40 min-h-screen w-full">
        <div className="fixed top-[5.5rem] flex justify-between items-center px-8 bg-white w-full h-12 border-b border-gray-300 z-10">
          <ProfileMenu />
          <CurrentDate />
        </div>

        {error ? (
          <Error errorMessage={error} marginTopClassName="-mt-6" />
        ) : (
          <div className="flex flex-col justify-center items-center text-center px-8 py-10">
            <Scribble scribblesSvgs={dashboardScribbles} />
            <ConditionalHeading />

            <div className="relative grid grid-cols-[repeat(auto-fit,minmax(230px,230px))] gap-10 w-full items-center justify-center mt-12">
              <DemoClassLink />

              <UsersClasses
                classData={classData}
                setSelectedClass={setSelectedClass}
                setIsEditClassModalOpen={setIsEditClassModalOpen}
              />

              <EditClass
                isEditClassModalOpen={isEditClassModalOpen}
                setIsEditClassModalOpen={setIsEditClassModalOpen}
                classData={selectedClass}
                key={formKey}
                reset={reset}
              />

              <CreateClass setShouldFetchClassData={setShouldFetchClassData} />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default PrivateRoute(Dashboard);
