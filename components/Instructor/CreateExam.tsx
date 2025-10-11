import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExamSchema } from "@/validations/examValidations";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppUser } from "@/contexts/UserContext";

type CreateExamFormData = z.infer<typeof createExamSchema>;

function CreateExam({ onExamCreated }: { onExamCreated?: () => void }) {
  const [open, setOpen] = React.useState(false);
  
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const [isCreating, setIsCreating] = useState(false);

  const { appUser } = useAppUser();

  const {
    register,
    handleSubmit,
    setValue,
    // getValues,
    reset,
    formState: { errors },
  } = useForm<CreateExamFormData>({
    resolver: zodResolver(createExamSchema),
    mode: "onChange", // 👈 real-time validation as user types
  });

  const onSubmit = async (createExamData: CreateExamFormData) => {
    const { title, description, duration, scheduledTime } = createExamData;

    if (appUser?.role !== "instructor") {
      console.log("Only instructor can create exam");
      return;
    }

    if (!date || !scheduledTime) {
      console.error("Date or Time missing");
      return;
    }



     // Convert local date + time → UTC
    const [hours, minutes] = scheduledTime.split(":").map(Number);

    const scheduledDateTime = new Date(date);
    scheduledDateTime.setHours(hours, minutes, 0, 0);


    // convert to ISO UTC format
    const scheduledAt = scheduledDateTime.toISOString(); 

    // connect to backend here
    try {
      console.log(
        "Registering exam:",
        title,
        description,
        duration,
        scheduledAt,
        appUser?._id
      );
      setIsCreating(true);
      const { data } = await axios.post("/api/exam/instructor/exams/create", {
        title,
        description,
        duration,
        scheduledAt,
        instructorId: appUser?._id,
      });
      console.log("data of create-exam response", data);
      if (data.success) {
        setDate(undefined);
        reset();
        toast.success("Exam Created Successfully!");

        // if (onExamCreated) onExamCreated();
      } else {
        toast.error("Exam Creation Failed!");
      }
    } catch (error) {
      console.error("Error", error);
      toast.error("Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    if (date) {
      setValue("scheduledDate", date.toISOString().split("T")[0]); // YYYY-MM-DD
    }
  }, [date]);

  return (
    <main className="w-full min-h-screen  bg-neutral-900 px-4 py-4">
      <section className="md:px-3 flex flex-col gap-y-2 md:py-2">
        <h1 className="font-bold text-2xl self-center text-white mb-4 md:text-3xl lg:text-4xl">
          Create Exam
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)} // Added handleSubmit to the form
          className="space-y-2"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full space-y-2">
              <Label htmlFor="title" className="text-sm md:text-md text-white">
                Title
              </Label>
              <input
                id="title"
                {...register("title")}
                type="text"
                placeholder="Exam Title"
                className="text-sm md:text-md text-white w-full rounded-lg border border-neutral-700 bg-neutral-800 p-2.5 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                           transition duration-200"
              />
              {errors.title ? (
                <p className="text-red-500 opacity-85 text-sm pt-1">
                  {errors.title.message}
                </p>
              ) : (
                <p className="text-sm py-2"></p>
              )}
            </div>
            <div className="w-full space-y-2">
              <Label
                htmlFor="duration"
                className="text-sm md:text-md text-white"
              >
                Duration (minutes)
              </Label>
              <input
                id="duration"
                type="number"
                {...register("duration")}
                className="text-sm md:text-md text-white w-full rounded-lg border border-neutral-700 bg-neutral-800 p-2.5 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                           transition duration-200"
                placeholder="e.g., 60"
              />
              {errors.duration ? (
                <p className="text-red-500 opacity-85 text-sm pt-1">
                  {errors.duration.message}
                </p>
              ) : (
                <p className="text-sm py-2"></p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm md:text-md text-white"
            >
              Description
            </Label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Provide a brief description of the exam, e.g., topics covered, rules, etc."
              className="min-h-[100px] text-sm md:text-md text-white w-full rounded-lg border border-neutral-700 bg-neutral-800 p-2.5 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         transition duration-200"
            />
            {errors.description ? (
              <p className="text-red-500 opacity-85 text-sm pt-1">
                {errors.description.message}
              </p>
            ) : (
              <p className="text-sm py-2"></p>
            )}
          </div>

          <div className="flex flex-wrap gap-6 items-end">
            <div className="flex flex-col gap-2">
              <Label htmlFor="date-picker" className="px-1 text-white">
                Scheduled Date
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="w-40 justify-between font-normal bg-neutral-800 text-white 
                               border border-neutral-700 hover:bg-neutral-700 hover:text-white"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon size={16} className="ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0 bg-neutral-800 border-neutral-700"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                    // Tailoring calendar styles (optional, based on your components/ui/calendar styling)
                    classNames={{
                      day_selected:
                        "bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white",
                      day_today: "bg-indigo-900 text-white",
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.scheduledDate ? (
                <p className="text-red-500 opacity-85 text-sm pt-1">
                  {errors.scheduledDate.message}
                </p>
              ) : (
                <p className="text-sm py-2"></p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="time-picker" className="px-1 text-white">
                Scheduled Time
              </Label>
              <Input
                type="time"
                id="time-picker"
                step="60" // Use '60' for minute intervals, '1' for seconds
                defaultValue="10:30" // Changed default to minutes for consistency
                {...register("scheduledTime")}
                onChange={(e) => setValue("scheduledTime", e.target.value)}
                className="bg-neutral-800 text-white w-32 rounded-lg border border-neutral-700 p-2.5 
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                           transition duration-200
                           [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              {errors.scheduledTime ? (
                <p className="text-red-500 opacity-85 text-sm pt-1">
                  {errors.scheduledTime.message}
                </p>
              ) : (
                <p className="text-sm py-2"></p>
              )}
            </div>
          </div>

          {/* Submit Button - Updated to Indigo */}
          <Button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
            disabled={isCreating}
          >
            {isCreating ? (
              <span className="flex items-center gap-x-2">
                Creating <Loader2 className="animate-spin h-5 w-5" />
              </span>
            ) : (
              "Create Exam"
            )}
          </Button>
        </form>
      </section>
    </main>
  );
}

export default CreateExam;
