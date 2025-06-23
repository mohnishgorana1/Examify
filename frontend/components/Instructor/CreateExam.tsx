import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExamSchema } from "@/validations/examValidations";
import { z } from "zod";
import { URLs } from "@/constants/urls";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import axios from "axios";
type CreateExamFormData = z.infer<typeof createExamSchema>;

function CreateExam() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateExamFormData>({
    resolver: zodResolver(createExamSchema),
    mode: "onChange", // 👈 real-time validation as user types
  });

  const onSubmit = async (createExamData: CreateExamFormData) => {
    console.log("env", URLs.backend);

    if (!token) {
      console.log("No Authentication Token, Please Login Again");
    }
    console.log("Auth Tokne", token);

    const { title, description, duration, scheduledTime } = createExamData;
    if (!date || !scheduledTime) {
      console.error("Date or Time missing");
      return;
    }
    
    const [hours, minutes] = scheduledTime.split(":").map(Number);
    const scheduledDateTime = new Date(date!); // copy to avoid mutation
    scheduledDateTime.setUTCHours(hours, minutes, 0, 0); // sets time in UTC

    const scheduledAt = scheduledDateTime.toISOString(); // "2025-06-11T10:00:00.000Z"

    // connect to backend here
    try {
      console.log("Registering:", title, description, duration, scheduledAt);
      const { data } = await axios.post(
        `${URLs.backend}/api/v1/exam/create-exam`,
        {
          title,
          description,
          duration,
          scheduledAt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data of create-exam response", data?.exam);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      console.log("accesstoken", accessToken);

      setToken(accessToken);
    } else {
      console.log("No token ");
    }
  }, []);
  useEffect(() => {
    if (date) {
      setValue("scheduledDate", date.toISOString().split("T")[0]); // YYYY-MM-DD
    }
  }, [date]);

  return (
    <main className="w-full h-auto md:grid md:grid-cols-3">
      <section className="w-full h-full md:col-span-1 hidden md:flex flex-col justify-between pl-2 font-bold py-16 text-8xl gy-5">
        <span className="bg-gradient-to-br from-25% from-orange-300 via-55% via-neutral-700 to-70% to-neutral-800 bg-clip-text text-transparent">
          CREATE
        </span>
        <span className="bg-gradient-to-br from-25% from-orange-300 via-55% via-neutral-700 to-70% to-neutral-800 bg-clip-text text-transparent">
          EXAM
        </span>
      </section>
      <section className="md:pr-3 md:pl-3 md:col-span-2 flex flex-col gap-y-2 md:py-4">
        <h1 className="font-bold text-2xl self-center md:hidden bg-gradient-to-tl from-25% from-orange-300 via-55% via-orange-700 to-70% to-orange-800 bg-clip-text text-transparent">
          Create Exam
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full space-y-1">
              <Label htmlFor="name" className="text-sm md:text-md text-white">
                Title
              </Label>
              <input
                id="title"
                {...register("title")}
                type="text"
                placeholder="Exam Title"
                className="text-sm md:text-md text-white w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="w-full space-y-1">
              <Label htmlFor="duration" className="text-sm md:text-md text-white">
                Duration
              </Label>
              <input
                id="duration"
                type="number"
                {...register("duration")}
                className="text-sm md:text-md text-white w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Duration of Exam in minutes"
              />
              {errors.duration && (
                <p className="text-red-500 text-sm">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full space-y-1">
              <Label htmlFor="description" className="text-sm md:text-md text-white">
                Description
              </Label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="Exam Description..."
                className="min-h-12 text-sm md:text-md text-white w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="date-picker" className="px-1 text-white">
                Date
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="w-32 justify-between font-normal bg-neutral-800 text-white"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0 "
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
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="time-picker" className="px-1 text-white">
                Time
              </Label>
              <Input
                type="time"
                id="time-picker"
                step="1"
                defaultValue="10:30:00"
                {...register("scheduledTime")} // register it
                onChange={(e) => setValue("scheduledTime", e.target.value)} // update value
                className="bg-neutral-800 text-white appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-800 text-white"
          >
            Confirm
          </Button>
        </form>
      </section>
    </main>
  );
}

export default CreateExam;

//     title,
//     description,
//     duration,
//     scheduledAt,

//     totalMarks,
//     passingMarks,
//     questions = [],
