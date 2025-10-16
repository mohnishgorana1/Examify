'use client'
import Tilt from "react-parallax-tilt";

export default function  InstructorDashboardInsights ()  {
  return (
    <main className="hidden relative overflow-hidden md:flex flex-col items-center justify-center px-6 md:px-20  pb-12 text-center bg-neutral-950">
      <Tilt
        glareEnable
        scale={1.01}
        glareMaxOpacity={0.2}
        perspective={1000}
        className="w-full max-w-4xl mt-4"
      >
        <div
          id="hero-mockup"
          className="relative rounded-xl border bg-neutral-900 backdrop-blur-sm shadow-2xl shadow-indigo-900/50 transition duration-500 ease-in-out hover:shadow-indigo-500/30"
        >
          <div className="w-full h-80 bg-neutral-800 rounded-xl overflow-hidden relative">
            {/* Visual element representing the platform/exam interface */}
            <div className="absolute top-0 left-0 w-full h-full p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-indigo-400">
                  Instructor Dashboard Insights
                </span>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100%-30px)]">
                {/* Feature 1: Exam Creation Workflow */}
                <div className="col-span-2 bg-neutral-950 p-4 rounded-lg flex flex-col justify-between">
                  <h3 className="text-xl font-bold text-indigo-400">
                    Quick Exam Scheduling
                  </h3>
                  <p className="text-neutral-500 text-sm">
                    Define parameters, select question types, and set the exam
                    time in three simple steps.
                  </p>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-indigo-500">1.</span>
                      <span className="text-neutral-300">Create Exam</span>
                      <div className="ml-auto w-[25%] h-2 bg-green-500/30 rounded-full animate-progress"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-indigo-500">1.</span>
                      <span className="text-neutral-300">Schedule Exam</span>
                      <div className="ml-auto w-[40%] h-2 bg-green-500/50 rounded-full animate-progress"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-indigo-500">2.</span>
                      <span className="text-neutral-300">Add Questions</span>
                      <div className="ml-auto w-[55%] h-2 bg-green-500/60 rounded-full animate-progress delay-100"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-indigo-500">3.</span>
                      <span className="text-neutral-300">Publish</span>
                      <div className="ml-auto w-[70%] h-2 bg-green-500 rounded-full animate-progress delay-200"></div>
                    </div>
                  </div>
                </div>
                {/* Feature 2: Real-time Monitoring/Metrics */}
                <div className="col-span-1 bg-neutral-950 p-4 rounded-lg hidden md:block">
                  <h3 className="text-xl font-bold text-indigo-400 mb-2">
                    Real-time <br /> Result Monitoring
                  </h3>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-neutral-400">Active Students:</span>
                    <span className="text-green-400 font-bold">45 / 50</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-3">
                    <span className="text-neutral-400">Avg. Score:</span>
                    <span className="text-yellow-400 font-bold">78%</span>
                  </div>
                  <div className="w-full h-12 bg-indigo-800/50 rounded-md flex items-center justify-center text-sm font-medium">
                    View Live Analytics
                  </div>
                  <p className="text-neutral-500 text-xs mt-3">
                    Track progress, time, and engagement of all participants
                    instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </main>
  );
};
