"use client";

import { useState } from "react";
import {
  ClipboardList,
  BookOpen,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import MyExamsStudent from "./MyExamsStudent";
import NewExamsStudent from "./NewExamsStudent";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<"my-exams" | "new-exams">(
    "my-exams"
  );
  const [collapsed, setCollapsed] = useState(false);

  const tabs = [
    {
      value: "my-exams",
      label: "My Exams",
      icon: <ClipboardList size={20} />,
      component: <MyExamsStudent />,
    },
    {
      value: "new-exams",
      label: "New Exams",
      icon: <BookOpen size={20} />,
      component: <NewExamsStudent />,
    },
  ];

  const activeComponent = tabs.find((t) => t.value === activeTab)?.component;

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col md:flex-row text-white">
      <aside
        className={`${
          collapsed ? "md:w-20" : "md:w-60"
        } w-full border-b md:border-b-0 md:border-r border-neutral-800 bg-neutral-900 flex flex-col transition-all duration-500 ease-in-out`}
      >
        <div className="hidden md:flex flex-col items-center gap-y-2 py-2 pt-4 pl-1">
          {/* Header with Collapse Button */}
          <div className="flex items-center md:justify-between w-full px-2 border-b pb-2 border-b-neutral-800">
            {!collapsed && (
              <h1 className="text-white font-bold text-lg whitespace-nowrap">
                Student Dashboard
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

          {/* Sidebar Buttons */}
          <div
            className={`w-full px-2 flex flex-col justify-center gap-y-6 mt-10 ${
              collapsed && "gap-y-4"
            }`}
          >
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`border rounded-2xl capitalize text-center flex items-center gap-x-4 font-semibold bg-neutral-800 shadow-sm duration-200 ease-out hover:text-indigo-500   hover:shadow-indigo-500 ${
                  activeTab === tab.value
                    ? "shadow-indigo-500 text-indigo-500"
                    : "shadow-neutral-950 text-neutral-300"
                } ${collapsed ? "text-xl px-4 py-4 justify-center" : "px-3 py-1.5 justify-between"}`}
              >
                {!collapsed && tab.label} {tab.icon}
              </button>
            ))}
          </div>
        </div>

        {/* 📱 Header (Mobile) */}
        <div className="md:hidden py-2 flex flex-col gap-y-4 items-center">
          <h1 className="text-white font-bold text-2xl md:text-lg text-center whitespace-nowrap border-b border-neutral-500 px-1">
            Student Dashboard
          </h1>
          <div className="grid grid-cols-2 gap-3 items-center">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`text-start col-span-1 mx-2 ${
                  activeTab === tab.value ? "text-indigo-500" : ""
                }`}
              >
                <span
                  className={`capitalize px-0.5 pb-0.5 ease-in-out duration-300 border-b ${
                    activeTab === tab.value && "border-indigo-500"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* 🧩 Main Content */}
      <main className="flex-1 overflow-y-auto p-2 md:p-4 animate-fadeIn">
        {activeComponent}
      </main>
    </div>
  );
}
