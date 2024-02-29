"use client";

import React, { useState, useEffect, useContext } from "react";
import { fetchStudentData, fetchClassData } from "@/api";
import StudentDataContext from "@/context/StudentDataContext";
import { useAuth } from "@/context/AuthContext";
import ClassNav from "@/components/classroom/ClassNav";
import CurrentDate from "@/components/classroom/DateComponent";
import StudentGrid from "@/components/classroom/studentGrid/StudentGrid";
import TableGrid from "@/components/classroom/tableGrid/TableGrid";
import Toolbar from "@/components/classroom/Toolbar";
import Greeting from "@/components/classroom/Greeting";
import Weather from "@/components/WeatherData";
import Birthday from "@/components/classroom/Birthday";
import Scribble from "@/components/Scribble";
import { classroomScribbles } from "@/utils/scribbles";
import Preloader from "@/components/Preloader";
import paperBg from "@/../../public/assets/paperbg.png";
import SwitchGridView from "@/components/classroom/SwitchGridView";
import PrivateRoute from "@/components/PrivateRoute";
import Error from "@/components/Error";

type ClassDataType = {
  classId: string;
  className: string;
};

const Classroom = () => {
  const { setStudentData, params } = useContext(StudentDataContext);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [classData, setClassData] = useState<ClassDataType[] | null>([]);
  const [toolbarMenu, setToolbarMenu] = useState(false);
  const [showTableGrid, setShowTableGrid] = useState(false);

  useEffect(() => {
    if (params.classroom_id) {
      const loadStudentData = async () => {
        try {
          const data = await fetchStudentData(currentUser, params.classroom_id);
          if (data) {
            const fetchedStudentData = data.studentData || [];
            setStudentData(fetchedStudentData);
            // Now studentData contains the data from the specific classId (params.classroom_id)
          } else {
            // Handle the case where the document doesn't exist (i.e if params.classroom_id is invalid)
            console.error("Error: class document not found");
            setError("It looks like something went wrong!");
          }
        } catch (error) {
          console.error("Error fetching student data from Firestore:", error);
          setError("It looks like something went wrong!");
        }
      };
      loadStudentData();
    }
  }, [currentUser, params.classroom_id, setStudentData]);

  useEffect(() => {
    if (params.classroom_id) {
      const loadClassData = async () => {
        try {
          const data = await fetchClassData(currentUser);
          setClassData(data);
        } catch (error) {
          console.error("Error fetching class data:", error);
          setError("It looks like something went wrong!");
        } finally {
          setLoading(false);
        }
      };
      loadClassData();
    }
  }, [currentUser, params.classroom_id]);

  if (loading) return <Preloader />;

  if (error) return <Error errorMessage={error} />;

  return (
    <>
      <header>
        <ClassNav toolbarMenu={toolbarMenu} setToolbarMenu={setToolbarMenu} />
      </header>
      <main
        className="relative min-h-screen w-full bg-[#fbe8de] top"
        style={{
          backgroundImage: `url(${paperBg.src})`,
          backgroundSize: "auto",
        }}
      >
        <Scribble scribblesSvgs={classroomScribbles} />
        <div className="flex">
          <aside className="z-[10]">
            <Toolbar toolbarMenu={toolbarMenu} />
          </aside>

          <div className="flex flex-col mx-auto w-full py-20 z-0">
            <div className="flex flex-col justify-center items-center pb-10 sm:pb-0 px-8">
              <Greeting classData={classData} />
              <Birthday />
              <CurrentDate />
              <Weather />
              <SwitchGridView
                showTableGrid={showTableGrid}
                setShowTableGrid={setShowTableGrid}
              />
            </div>
            {showTableGrid ? <TableGrid /> : <StudentGrid />}
          </div>
        </div>
      </main>
    </>
  );
};

export default PrivateRoute(Classroom);
