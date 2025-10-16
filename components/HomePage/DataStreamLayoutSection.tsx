"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BarChart2, Shield, Zap } from "lucide-react";

// Register ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

export default function DataStreamLayoutSection() {
    // Refs to target the elements
    const timelineRef = useRef(null);
    const progressBarRef = useRef(null);
    const horizontalLinesRef = useRef([]);
    const dotsRef = useRef([]);
    const verticalLineContainerRef = useRef(null); // Ref for the full background line

    const STATIC_FEATURES = [
        // ... (STATIC_FEATURES data remains the same)
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

    useEffect(() => {
        if (!timelineRef.current || !verticalLineContainerRef.current) return;
        
        let ctx = gsap.context(() => {
            
            // --- 1. Initial Setup and State ---
            // Set initial state for all animated elements
            gsap.set(progressBarRef.current, { height: 0 });
            gsap.set(horizontalLinesRef.current, { scaleX: 0, opacity: 0 });
            gsap.set(dotsRef.current, { opacity: 0, scale: 0.8 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: "top center", // Start when section hits the middle of the viewport
                    end: "bottom 30%", // End animation before section leaves view
                    scrub: 1.5, // Smoothly link animation progress to scroll position
                    // markers: true, // Uncomment for debugging
                },
                defaults: { ease: "none" } // Use linear ease for scrolling animations
            });
            
            // --- 2. Build the Sequential Timeline ---
            let lastDotY = 0;
            
            // Loop through each feature to build the sequential animation
            dotsRef.current.forEach((dot, i) => {
                // Calculate the pixel distance from the previous dot/start to the current dot's center
                // Note: dot.offsetTop is relative to the parent, which is the line container (perfect!)
                const currentDotY = dot.offsetTop + dot.offsetHeight / 2;
                const verticalDuration = 1; // Arbitrary duration for scroll scrubbing

                // STEP A: Vertical Line Draw to Current Dot
                // Animate the height of the progress bar to the dot's center position
                tl.to(progressBarRef.current, { 
                    height: currentDotY,
                    duration: verticalDuration,
                }, `step-${i}`)
                
                // STEP B: Dot Reveal (Must happen exactly when the line hits it)
                .to(dotsRef.current[i], {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)",
                }, `step-${i}`) // Start dot reveal at the same time as vertical draw ends

                // STEP C: Horizontal Line Expansion
                // The horizontal line expands immediately after the vertical line hits the dot.
                .to(horizontalLinesRef.current[i], {
                    scaleX: 1,
                    opacity: 1,
                    duration: 0.5,
                }, `step-${i} +=0.1`); // Start 0.1s after the dot is revealed
                
                lastDotY = currentDotY;
            });
            
            // --- 3. Final Vertical Line Draw to the End ---
            if (verticalLineContainerRef.current) {
                const finalHeight = verticalLineContainerRef.current.offsetHeight;
                
                // Animate the vertical line from the last dot to the bottom of the container
                tl.to(progressBarRef.current, {
                    height: finalHeight,
                    duration: 1, 
                }, `step-end`);
            }

        }, timelineRef); 
        
        // Cleanup function for GSAP to prevent issues on component unmount/re-render
        return () => ctx.revert();
    }, []);

    return (
        <main className="pt-20 pb-5 px-6 md:px-20 bg-neutral-950" ref={timelineRef}>
            {/* Header elements remain the same */}
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
                
                {/* 1. Vertical Line Container - Full height, background color */}
                <div 
                    ref={verticalLineContainerRef}
                    className="absolute left-1/2 -ml-0.5 top-0 w-px h-full bg-neutral-800 md:block"
                >
                    {/* 1a. Progress Bar - This is the moving, colored line (starts at 0 height) */}
                    <div 
                        ref={progressBarRef}
                        // Use absolute and pin to the top for the height animation to work
                        className="absolute top-0 w-full h-full bg-indigo-400" 
                        style={{ height: 0 }} // Important: ensure initial height is 0
                    ></div>
                </div>

                {STATIC_FEATURES.map((feature, i) => {
                    const isCardOnRight = i % 2 === 0;
                    const horizontalLineWidth = "w-[66px]"; 

                    return (
                        <div
                            key={i}
                            className={`data-stream-item flex items-start gap-6 md:gap-20 mb-16 relative ${
                                isCardOnRight ? "md:flex-row-reverse" : "md:flex-row"
                            }`}
                        >
                            
                            {/* 2. Horizontal Connector Line - Setup for horizontal scale animation */}
                            <div 
                                ref={el => horizontalLinesRef.current[i] = el}
                                className={`hidden md:block absolute h-px ${horizontalLineWidth} top-[37px] bg-indigo-400 z-10 ${
                                    // Set initial scaleX: 0 and correct transform origin (left/right)
                                    isCardOnRight 
                                        ? "left-[calc(50%+11px)] origin-left"
                                        : "right-[calc(50%+11px)] origin-right"
                                }`}
                                style={{ transform: 'scaleX(0)', opacity: 0 }}
                            ></div>
                            
                            {/* 3. Connector Dot - Ref added */}
                            <div 
                                ref={el => dotsRef.current[i] = el}
                                className="hidden md:block absolute left-1/2 top-7 w-4 h-4 md:w-5 md:h-5 rounded-full bg-indigo-400 border-4 border-neutral-950 z-20 -ml-2.5 md:-ml-[11px]"
                            ></div>

                            {/* 4. Content Card (Rest of the content) */}
                            <div
                                className={`w-full md:w-5/12 bg-neutral-900 shadow-neutral-700/50 rounded-xl p-6 shadow-md ${
                                    isCardOnRight ? "md:text-right ml-auto" : "md:text-left mr-auto"
                                }`}
                            >
                                <div
                                    className={`flex items-center gap-2 ${
                                        isCardOnRight ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <feature.icon className="w-8 h-8 text-indigo-400 mb-2" />
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
                    );
                })}
            </div>
        </main>
    );
}
// "use client";

// import { BarChart2, Shield, Zap } from "lucide-react";

// export default function DataStreamLayoutSection() {
//   const STATIC_FEATURES = [
//     {
//       icon: Zap,
//       title: "Instant Setup & Deployment",
//       desc: `Launch your first assessment in under 5 minutes. No complex configuration, just rapid deployment.`,
//       descStatus: "",
//       status: "Available",
//     },
//     {
//       icon: Shield,
//       title: "AI-Powered Proctored Security",
//       desc: `Maintain exam integrity with advanced anti-cheating measures and real-time monitoring. `,
//       descStatus: "*Fully launching Q1 2025*",
//       status: "Future Feature",
//     },
//     {
//       icon: BarChart2,
//       title: "Advanced Performance Analytics",
//       desc: `Get deep insights into question performance, student trends, and class proficiency instantly. `,
//       descStatus: "*Data modeling in progress*",
//       status: "Future Feature",
//     },
//   ];

//   return (
//     <main className="pt-20 pb-5 px-6 md:px-20 bg-neutral-950">
//       <h2 className="text-3xl md:text-5xl font-bold text-center mb-3 text-indigo-400 uppercase cursor-pointer">
//         Core Platform Advantages
//       </h2>
//       <p className="text-center text-indigo-200/80 max-w-2xl mx-auto mb-16 ">
//         A seamless experience for every user role,
//         <br className="hidden md:flex" /> built on a foundation of security and
//         smart automation.
//       </p>

//       {/* Vertical Data Stream Layout */}
//       <div className="relative max-w-4xl mx-auto">
//         <div className="absolute left-1/2 -ml-0.5 top-0 w-px h-full bg-neutral-800 md:block"></div>

//         {STATIC_FEATURES.map((feature, i) => {
//           const isCardOnRight = i % 2 === 0;
//           const horizontalLineWidth = "w-[70px]";

//           return (
//             <div
//               key={i}
//               className={`data-stream-item flex items-start gap-6 md:gap-18 mb-16 relative ${
//                 isCardOnRight ? "md:flex-row-reverse" : "md:flex-row"
//               }`}
//             >
//               <div
//                 className={`hidden md:block absolute h-px ${horizontalLineWidth} top-[90px] bg-indigo-400 z-10 ${
//                   isCardOnRight
//                     ? "left-[calc(50%+1px)]"
//                     : "right-[calc(50%+1px)]"
//                 }`}
//               ></div>

//               <div className="hidden md:block absolute left-1/2 top-20 w-4 h-4 md:w-5 md:h-5 rounded-full bg-indigo-400 border-4 border-neutral-950 z-20 -ml-2.5 md:-ml-[11px]"></div>

//               <div
//                 className={`w-full md:w-5/12 bg-neutral-900 shadow-neutral-700/50 rounded-xl p-6 shadow-md ${
//                   isCardOnRight
//                     ? "md:text-right ml-auto"
//                     : "md:text-left mr-auto"
//                 }`}
//               >
//                 <div
//                   className={`flex items-center gap-2 ${
//                     isCardOnRight ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <feature.icon className="w-8 h-8 text-indigo-400 mb-2" />
//                   {feature.status !== "Available" && (
//                     <span className="mb-2 text-xs font-medium text-yellow-400/50 bg-yellow-900/20 px-2 py-0.5 rounded-full border border-yellow-800/30">
//                       Coming Soon
//                     </span>
//                   )}
//                   {feature.status === "Available" && (
//                     <span className="mb-2 text-xs font-medium text-green-400/50 bg-green-900/20 px-3 py-1 rounded-full border border-green-800/30">
//                       Available
//                     </span>
//                   )}
//                 </div>

//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-neutral-400 text-sm">{feature.desc}</p>
//                 <p className="text-neutral-200 text-sm font-bold my-0.5">
//                   {feature.descStatus}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </main>
//   );
// }
