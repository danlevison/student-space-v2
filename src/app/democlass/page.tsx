"use client";

import React, { useState } from "react";
import { StudentDataProvider } from "@/context/StudentDataContext";
import ClassNav from "@/components/classroom/ClassNav";
import CurrentDate from "@/components/classroom/DateComponent";
import StudentGrid from "@/components/classroom/studentGrid/StudentGrid";
import TableGrid from "@/components/classroom/tableGrid/TableGrid";
import Toolbar from "@/components/classroom/Toolbar";
import Greeting from "@/components/classroom/Greeting";
import Weather from "@/components/WeatherData";
import Birthday from "@/components/classroom/Birthday";
import Scribble from "@/components/Scribble";
import { democlassScribbles } from "@/utils/scribbles";
import SwitchGridView from "@/components/classroom/SwitchGridView";
import paperBg from "../../../public/assets/paperbg.png";
import PrivateRoute from "@/components/PrivateRoute";

const DemoClass = () => {
  const [toolbarMenu, setToolbarMenu] = useState(false);
  const [showTableGrid, setShowTableGrid] = useState(false);

  return (
    <StudentDataProvider>
      <header>
        <ClassNav toolbarMenu={toolbarMenu} setToolbarMenu={setToolbarMenu} />
      </header>
      <main
        className="relative min-h-screen w-full bg-blue-100"
        style={{
          backgroundImage: `url(${paperBg.src})`,
          backgroundSize: "auto",
        }}
      >
        <Scribble scribblesSvgs={democlassScribbles} />
        <div className="flex">
          <Toolbar toolbarMenu={toolbarMenu} />

          <div className="flex flex-col mx-auto w-full py-20 z-0">
            <div className="flex flex-col justify-center items-center pb-10 sm:pb-0 px-8">
              <Greeting />
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
    </StudentDataProvider>
  );
};

export default PrivateRoute(DemoClass);
