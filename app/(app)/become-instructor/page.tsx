"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useAppUser } from "@/contexts/UserContext";
import axios from "axios";

interface IWorkExperience {
  company: string;
  post: string;
  timeSpanYears: number;
}

interface IEducationalQualification {
  institute: string;
  course: string;
  yearCompleted: number;
  grade: string;
}

const FormInput = ({
  label,
  value,
  readOnly,
  type = "text",
  onChange,
  min,
  max,
  required = false,
}: any) => {
  const isReadOnly = readOnly || !onChange;

  return (
    <div className="space-y-1 w-full">
      <label className="block text-sm font-medium text-gray-200">
        {" "}
        {/* Dark mode text */}
        {label} {required && <span className="text-violet-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        readOnly={isReadOnly}
        required={required}
        min={min}
        max={max}
        className={`mt-1 block w-full px-3 py-2 border border-neutral-600 rounded-md shadow-sm sm:text-sm 
						${
              isReadOnly
                ? "bg-neutral-700/50 text-gray-400 cursor-not-allowed" // Read-only style
                : "bg-neutral-800 text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" // Editable style
            }`}
      />
    </div>
  );
};

function BecomeInstructor() {
  const { appUser } = useAppUser();
  const currentYear = 2025; // Set the fixed current year for validation purposes

  const [experienceList, setExperienceList] = useState<IWorkExperience[]>([
    { company: "", post: "", timeSpanYears: 0 },
  ]);
  const [qualificationList, setQualificationList] = useState<
    IEducationalQualification[]
  >([{ institute: "", course: "", yearCompleted: 0, grade: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Assuming the user's name and email can be sourced from appUser context
  const initialName = appUser?.name || "";
  const initialEmail = appUser?.email || "";

  const addExperience = () => {
    setExperienceList([
      ...experienceList,
      { company: "", post: "", timeSpanYears: 0 },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperienceList(experienceList.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (
    index: number,
    field: keyof IWorkExperience,
    value: string | number
  ) => {
    const updatedList = experienceList.map((item, i) => {
      if (i === index) {
        // Ensure timeSpanYears is a number
        return {
          ...item,
          [field]: field === "timeSpanYears" ? Number(value) : value,
        };
      }
      return item;
    });
    setExperienceList(updatedList);
  };

  const addQualification = () => {
    setQualificationList([
      ...qualificationList,
      { institute: "", course: "", yearCompleted: 0, grade: "" },
    ]);
  };

  const removeQualification = (index: number) => {
    setQualificationList(qualificationList.filter((_, i) => i !== index));
  };

  const handleQualificationChange = (
    index: number,
    field: keyof IEducationalQualification,
    value: string | number
  ) => {
    const updatedList = qualificationList.map((item, i) => {
      if (i === index) {
        // Ensure yearCompleted is a number
        return {
          ...item,
          [field]: field === "yearCompleted" ? Number(value) : value,
        };
      }
      return item;
    });
    setQualificationList(updatedList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appUser || !appUser._id) {
      toast.error("Authentication error. Please log in again.");
      return;
    }

    // Basic Validation: Ensure at least one valid entry for each array
    const validExperience = experienceList.filter(
      (e) => e.company && e.post && e.timeSpanYears > 0
    );
    const validQualifications = qualificationList.filter(
      (q) => q.institute && q.course && q.grade
    );

    if (validExperience.length === 0 || validQualifications.length === 0) {
      toast.error(
        "Please fill out at least one complete entry for both Experience and Qualifications."
      );
      return;
    }

    setIsSubmitting(true);

    const requestData = {
      studentId: appUser._id,
      name: initialName,
      email: initialEmail,
      experience: validExperience,
      qualifications: validQualifications,
    };

    console.log("reqdata", requestData);

    setIsSubmitting(false);

    try {
      const response = await axios.post(
        "/api/instructor-request/create",
        JSON.stringify(requestData)
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        // Reset form after success
        setExperienceList([{ company: "", post: "", timeSpanYears: 0 }]);
        setQualificationList([
          { institute: "", course: "", yearCompleted: 0, grade: "" },
        ]);
      } else {
        toast.success(
          "Application submitted successfully! We will review it shortly."
        );
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 py-16 flex items-center justify-center">
      <div className="max-w-xl mx-auto p-8 bg-neutral-800/80 shadow-2xl rounded-xl text-center border-t-4 border-indigo-500">
        <svg
          className="mx-auto h-16 w-16 text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <h1 className="text-4xl font-extrabold text-white mt-4 mb-3">
          Instructor Application Coming Soon!
        </h1>
        <p className="text-gray-400 mb-6 text-lg">
          We&apos;re actively preparing our platform to welcome new **instructors**
          like you.
        </p>
        <p className="text-gray-300">
          The application form is being refined and will be available shortly.
          Thank you for your interest in joining our teaching community! Please
          check back later.
        </p>
        <div className="mt-8">
          <p className="text-sm font-medium text-indigo-400">
            Your enthusiasm is appreciated!
          </p>
        </div>
      </div>
    </div>
    // TODO: Unccomment below part to allow upgraded version
    // <div className="min-h-screen bg-neutral-900 py-16">
    //   <div className="max-w-4xl mx-auto p-8 bg-neutral-800/80 shadow-2xl rounded-xl">
    //     <h1 className="text-3xl font-extrabold text-indigo-500 mb-2">
    //       Apply to Be an Instructor 🚀
    //     </h1>
    //     <p className="text-gray-400 mb-8 border-b border-neutral-700 pb-4">
    //       We're excited you want to join our team! Please provide detailed
    //       information about your professional experience and academic
    //       qualifications.
    //     </p>

    //     <form onSubmit={handleSubmit} className="space-y-10">
    //       {/* User Info (Read-only) */}
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg border border-indigo-400/10">
    //         <FormInput label="Full Name" value={initialName} readOnly />
    //         <FormInput label="Email Address" value={initialEmail} readOnly />
    //       </div>

    //       {/* -------------------- Work Experience Section -------------------- */}
    //       <div className="space-y-4 border border-neutral-700/30 p-4 rounded-lg ">
    //         <h2 className="text-xl font-semibold text-gray-100 flex justify-between items-center">
    //           Work Experience
    //           <button
    //             type="button"
    //             onClick={addExperience}
    //             className="flex items-center text-sm px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition shadow-md"
    //           >
    //             <FaPlus className="mr-1 h-3 w-3" /> Add
    //           </button>
    //         </h2>

    //         {experienceList.map((item, index) => (
    //           <div
    //             key={index}
    //             className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 border-l-4 border-indigo-500 bg-neutral-900/30 rounded-r-md items-center"
    //           >
    //             <div className="md:col-span-1">
    //               <FormInput
    //                 label={`Company ${index + 1}`}
    //                 value={item.company}
    //                 onChange={(e) =>
    //                   handleExperienceChange(index, "company", e.target.value)
    //                 }
    //                 required
    //               />
    //             </div>
    //             <div className="md:col-span-1">
    //               <FormInput
    //                 label="Post/Title"
    //                 value={item.post}
    //                 onChange={(e) =>
    //                   handleExperienceChange(index, "post", e.target.value)
    //                 }
    //                 required
    //               />
    //             </div>
    //             <div className="md:col-span-1">
    //               <FormInput
    //                 label="Time Span (Years)"
    //                 type="number"
    //                 value={item.timeSpanYears > 0 ? item.timeSpanYears : ""}
    //                 onChange={(e) =>
    //                   handleExperienceChange(
    //                     index,
    //                     "timeSpanYears",
    //                     e.target.value
    //                   )
    //                 }
    //                 min={0}
    //                 max={30}
    //                 required
    //               />
    //             </div>

    //             <div className="md:col-span-1 flex justify-end">
    //               {experienceList.length > 1 && (
    //                 <button
    //                   type="button"
    //                   onClick={() => removeExperience(index)}
    //                   className="mt-6 text-red-500 hover:text-red-400 transition"
    //                   title="Remove Experience"
    //                 >
    //                   <FaTrash className="h-4 w-4" />
    //                 </button>
    //               )}
    //             </div>
    //           </div>
    //         ))}
    //       </div>

    //       {/* -------------------- Educational Qualifications Section -------------------- */}
    //       <div className="space-y-4 border border-neutral-700/30 p-4 rounded-lg  bg-neutral-800">
    //         <h2 className="text-xl font-semibold text-gray-100 flex justify-between items-center">
    //           Educational Qualifications
    //           <button
    //             type="button"
    //             onClick={addQualification}
    //             className="flex items-center text-sm px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition shadow-md"
    //           >
    //             <FaPlus className="mr-1 h-3 w-3" /> Add
    //           </button>
    //         </h2>

    //         {qualificationList.map((item, index) => (
    //           <div
    //             key={index}
    //             className="grid grid-cols-1 md:grid-cols-5 gap-4 p-3 border-l-4 border-indigo-500 bg-neutral-900/30 rounded-r-md items-center"
    //           >
    //             <div className="md:col-span-2">
    //               <FormInput
    //                 label="Institute"
    //                 value={item.institute}
    //                 onChange={(e) =>
    //                   handleQualificationChange(
    //                     index,
    //                     "institute",
    //                     e.target.value
    //                   )
    //                 }
    //                 required
    //               />
    //             </div>
    //             <FormInput
    //               label="Course"
    //               value={item.course}
    //               onChange={(e) =>
    //                 handleQualificationChange(index, "course", e.target.value)
    //               }
    //               required
    //             />
    //             <FormInput
    //               label="Completion Year"
    //               type="number"
    //               value={item.yearCompleted > 0 ? item.yearCompleted : ""}
    //               onChange={(e) =>
    //                 handleQualificationChange(
    //                   index,
    //                   "yearCompleted",
    //                   e.target.value
    //                 )
    //               }
    //               min={1990}
    //               max={currentYear}
    //               required
    //             />

    //             <div className="flex gap-2 items-center">
    //               <FormInput
    //                 label="Grade/CGPA/%"
    //                 value={item.grade}
    //                 onChange={(e) =>
    //                   handleQualificationChange(index, "grade", e.target.value)
    //                 }
    //                 required
    //               />
    //               {qualificationList.length > 1 && (
    //                 <button
    //                   type="button"
    //                   onClick={() => removeQualification(index)}
    //                   className="mt-6 text-red-500 hover:text-red-400 transition"
    //                   title="Remove Qualification"
    //                 >
    //                   <FaTrash className="h-4 w-4" />
    //                 </button>
    //               )}
    //             </div>
    //           </div>
    //         ))}
    //       </div>

    //       {/* Submit Button */}
    //       <button
    //         type="submit"
    //         disabled={isSubmitting || !appUser}
    //         className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white transition duration-200
    //             ${
    //               isSubmitting
    //                 ? "bg-indigo-400 cursor-not-allowed"
    //                 : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50" // Indigo color accents
    //             }`}
    //       >
    //         {isSubmitting
    //           ? "Submitting Application..."
    //           : "Submit Instructor Application"}
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
}

export default BecomeInstructor;
