"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerSchema } from "@/validations/authValidations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { URLs } from "@/constants/urls";
import axios from "axios";
import { useRouter } from "next/navigation";

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterComponent() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // 👈 real-time validation as user types
  });

  const onSubmit = async (registerData: RegisterFormData) => {
    console.log("env", URLs.backend);
    console.log("Registering:", registerData);

    // connect to backend here
    try {
      const { data } = await axios.post(
        `${URLs.backend}/api/v1/auth/register`,
        registerData
      );
      console.log("data", data);
      if (data.success) {
        alert("Registration successful!");
        router.push("/login");
      }
    } catch (error) {
      console.log("Error Registering User", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name + Email */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full space-y-1">
            <Label htmlFor="name" className="text-sm md:text-md text-white/85">
              Full Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Your full name"
              className="text-sm md:text-md text-white/85"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="w-full space-y-1">
            <Label htmlFor="email" className="text-sm md:text-md text-white/85">
              Email
            </Label>
            <Input
              id="email"
              {...register("email")}
              placeholder="you@example.com"
              className="text-sm md:text-md text-white/85"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Phone + DOB */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full space-y-1">
            <Label htmlFor="phone" className="text-sm md:text-md text-white/85">
              Phone
            </Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="Enter phone number"
              className="text-sm md:text-md text-white/85"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="w-full space-y-1">
            <Label htmlFor="dob" className="text-sm md:text-md text-white/85">
              Date of Birth
            </Label>
            <Input
              id="dob"
              type="date"
              {...register("dob")}
              className="text-sm md:text-md text-white/85"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
            )}
          </div>
        </div>

        {/* Password + Confirm Password */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full space-y-1">
            <Label
              htmlFor="password"
              className="text-sm md:text-md text-white/85"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="text-sm md:text-md text-white/85"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="w-full space-y-1">
            <Label
              htmlFor="confirmPassword"
              className="text-sm md:text-md text-white/85"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className="text-sm md:text-md text-white/85"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Role */}
        <div className="space-y-1">
          <Label htmlFor="role" className="text-sm md:text-md text-white">
            Role
          </Label>
          <Select
            onValueChange={(value: "student" | "instructor") =>
              setValue("role", value)
            }
          >
            <SelectTrigger className="w-full text-white">
              <SelectValue placeholder="Select role" className="tetx-white" />
            </SelectTrigger>
            <SelectContent className="text-sm md:text-md text-white/75">
              <SelectItem
                value="student"
                className="text-white hover:bg-neutral-800"
              >
                Student
              </SelectItem>
              <SelectItem
                value="instructor"
                className="text-white hover:bg-neutral-800"
              >
                Instructor
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-800 text-white"
        >
          Register
        </Button>
      </form>

      <p className="text-sm text-center mt-4 text-white/65">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium hover:underline text-orange-500/68"
        >
          Login
        </Link>
      </p>
    </>
  );
}

export default RegisterComponent;
