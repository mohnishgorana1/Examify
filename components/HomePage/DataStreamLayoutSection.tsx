'use client'

import { BarChart2, Shield, Zap } from "lucide-react";

export default function  DataStreamLayoutSection () {

    const STATIC_FEATURES = [
  {
    icon: Zap,
    title: "Instant Setup & Deployment",
    desc: `Launch your first assessment in under 5 minutes. No complex configuration, just rapid deployment.`,
    descStatus: "",
    status: "Available",
  },
  {
    icon: Shield,
    title: "AI-Powered Proctored Security",
    desc: `Maintain exam integrity with advanced anti-cheating measures and real-time monitoring. `,
    descStatus: "*Fully launching Q1 2025*",
    status: "Future Feature",
  },
  {
    icon: BarChart2,
    title: "Advanced Performance Analytics",
    desc: `Get deep insights into question performance, student trends, and class proficiency instantly. `,
    descStatus: "*Data modeling in progress*",
    status: "Future Feature",
  },
];


  return (
    <main className="pt-20 pb-5 px-6 md:px-20 bg-neutral-950">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-3 text-indigo-400 uppercase cursor-pointer">
        Core Platform Advantages
      </h2>
      <p className="text-center text-indigo-200/80 max-w-2xl mx-auto mb-16 ">
        A seamless experience for every user role,
        <br className="hidden md:flex" /> built on a foundation of security and
        smart automation.
      </p>

      {/* Vertical Data Stream Layout */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line Connector */}
        <div className="absolute left-1/2 -ml-0.5 top-0 w-px h-full bg-neutral-800 hidden md:block"></div>

        {STATIC_FEATURES.map((feature, i) => (
          <div
            key={i}
            className={`data-stream-item flex items-start gap-6 md:gap-12 mb-16 relative ${
              i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            {/* Connector Dot */}
            <div className="hidden md:block absolute left-1/2 top-15 w-4 h-4 md:w-5 md:h-5 rounded-full bg-indigo-400 border-4 border-neutral-950 z-10 -ml-2.5 md:-ml-[11px]"></div>

            {/* Content Card (Left or Right) */}
            <div
              className={`w-full md:w-5/12 bg-neutral-900 shadow-neutral-700/50 rounded-xl p-6 shadow-md ${
                i % 2 === 0 ? "md:text-right" : "md:text-left"
              }`}
            >
              <div
                className={`flex items-center gap-2 ${
                  i % 2 === 0 ? "justify-end" : "justify-start"
                }`}
              >
                <feature.icon className="w-8 h-8 text-indigo-400 mb-2" />
                {/* Status Tag for Future Features */}
                {feature.status !== "Available" && (
                  <span className="mb-2 text-xs font-medium text-yellow-400/50 bg-yellow-900/20 px-2 py-0.5 rounded-full border border-yellow-800/30">
                    Coming Soon
                  </span>
                )}
                {feature.status === "Available" && (
                  <span className="mb-2 text-xs font-medium text-green-400/50 bg-green-900/20 px-3 py-1 rounded-full border border-green-800/30">
                    Available
                  </span>
                )}
              </div>

              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-400 text-sm">{feature.desc}</p>
              <p className="text-neutral-200 text-sm font-bold my-0.5">
                {feature.descStatus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};