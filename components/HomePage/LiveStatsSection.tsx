
'use client'

import { NumberTicker } from "../ui/number-ticker";

const STATS = [
  {
    value: 50,
    startValue: "10",
    valueAppendText: "+",
    label: "Exams Conducted",
  },
  {
    value: "4",
    startValue: "0",
    valueAppendText: "/5",
    label: "Average User Rating",
  },
  {
    value: 10,
    startValue: "1",
    valueAppendText: "+",
    label: "Institutions Trusted",
  },
];


export default function  LiveStatsSection () {
  return (
    <main className="mt-15  py-24 px-6 md:px-20 bg-neutral-900 border-t border-b border-neutral-900/50 ">
      <div className="grid md:grid-cols-3 gap-10 text-center">
        {STATS.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <p className="text-5xl md:text-6xl font-extrabold text-indigo-500/70 mb-2">
              {/* {idx !== 1 ? ( */}
              <NumberTicker
                value={Number(stat.value)}
                startValue={Number(stat.startValue)}
                delay={`${idx === 1 && Number(1)}`}
                className="tracking-tighter font-extrabold whitespace-pre-wrap text-indigo-500/70"
              />
              {stat.valueAppendText}
            </p>
            <h3 className="text-lg text-neutral-300 font-medium">
              {stat.label}
            </h3>
          </div>
        ))}
      </div>
    </main>
  );
};