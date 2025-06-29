import React from "react";

function Loader() {
  return (
    <div className="relative flex space-x-2">
      <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite]"></div>
      <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite] [animation-delay:0.2s]"></div>
      <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite] [animation-delay:0.4s]"></div>

      <style jsx>{`
        @keyframes slideDot {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateX(10px);
            opacity: 0.5;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Loader;
