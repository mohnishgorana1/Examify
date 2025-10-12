"use client";

import { useState } from "react";
import {
  ClipboardList,
  FileText,
  Library,
  PlusCircle,
  BarChart3,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import CreateExam from "./CreateExam";
import MyExams from "./MyExams";
import Results from "./Results";
import CreateQuestion from "./CreateQuestions";
import MyQuestions from "./MyQuestions";

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("create-exam");
  const [collapsed, setCollapsed] = useState(false);

  const tabs = [
    {
      value: "create-exam",
      label: "Create Exam",
      icon: <FileText size={20} />,
      component: <CreateExam onExamCreated={() => setActiveTab("my-exams")} />,
    },
    {
      value: "my-exams",
      label: "My Exams",
      icon: <ClipboardList size={20} />,
      component: <MyExams />,
    },
    {
      value: "create-questions",
      label: "Create Questions",
      icon: <PlusCircle size={20} />,
      component: <CreateQuestion />,
    },
    {
      value: "my-questions",
      label: "My Questions",
      icon: <Library size={20} />,
      component: <MyQuestions />,
    },
    // {
    //   value: "results",
    //   label: "Results",
    //   icon: <BarChart3 size={20} />,
    //   component: <Results />,
    // },
  ];

  const activeComponent = tabs.find(
    (tab) => tab.value === activeTab
  )?.component;

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col md:flex-row ">
      <aside
        className={`${
          collapsed ? "md:w-20" : "md:w-60"
        } w-full border-b md:morder-b-0 md:border-r border-neutral-800 bg-neutral-900 flex flex-col transition-all duration-500 ease-in-out`}
      >
        {/* sidebar */}
        <div
          className={`hidden md:flex flex-col items-center gap-y-2 py-2 pt-4 pl-1`}
        >
          <div className="flex items-center md:justify-between w-full px-2 border-b pb-2 border-b-neutral-800">
            {!collapsed && (
              <h1 className="text-white font-bold  text-lg whitespace-nowrap">
                Instructor Dashboard
              </h1>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`hover:bg-neutral-800 rounded-md text-neutral-300 p-1 ${
                collapsed ? "mx-auto p-3" : "p-1"
              }`}
            >
              {collapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>
          </div>
          <div
            className={`w-full px-2 flex flex-col justify-center gap-y-6 mt-10 ${
              collapsed && "gap-y-4"
            }`}
          >
            {tabs &&
              tabs.map((tab) => (
                <button
                  className={`border rounded-2xl capitalize  justify-between text-center py-1.5 flex items-center gap-x-4 font-semibold bg-neutral-800 shadow-sm duration-200 ease-out hover:text-indigo-500 hover:shadow-indigo-500 ${
                    tab.value === activeTab
                      ? " shadow-indigo-500 text-indigo-500"
                      : "shadow-neutral-950"
                  } ${collapsed ? "text-xl px-4 py-4" : "px-3"}`}
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {!collapsed && `${tab.label}`} {tab.icon}
                </button>
              ))}
          </div>
        </div>

        {/* header */}
        <div className="md:hidden py-2 flex flex-col gap-y-4 items-center">
          <h1 className="text-white font-bold text-lg text-center whitespace-nowrap border-b border-neutral-500 px-1 ">
            Instructor Dashboard
          </h1>
          <div className="grid grid-cols-2 gap-3 items-center ">
            {tabs &&
              tabs.map((tab) => (
                <button
                  className={`text-start  col-span-1 mx-2 ${
                    tab.value === activeTab ? "text-indigo-500" : ""
                  }`}
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                >
                  <span
                    className={`capitalize px-0.5 pb-0.5 ease-in-out duration-300  ${
                      tab.value === activeTab && "border-b border-indigo-500"
                    } `}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">{activeComponent}</main>
    </div>
  );
}
