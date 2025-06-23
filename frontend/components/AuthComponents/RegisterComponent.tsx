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
import axios from 'axios'
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
      if(data.success){
        alert("Registration successful!");
        router.push('/login')
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
            <Label htmlFor="name" className="text-sm md:text-md">
              Full Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Your full name"
              className="text-sm md:text-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="w-full space-y-1">
            <Label htmlFor="email" className="text-sm md:text-md">
              Email
            </Label>
            <Input
              id="email"
              {...register("email")}
              placeholder="you@example.com"
              className="text-sm md:text-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Phone + DOB */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full space-y-1">
            <Label htmlFor="phone" className="text-sm md:text-md">
              Phone
            </Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="Enter phone number"
              className="text-sm md:text-md"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="w-full space-y-1">
            <Label htmlFor="dob" className="text-sm md:text-md">
              Date of Birth
            </Label>
            <Input
              id="dob"
              type="date"
              {...register("dob")}
              className="text-sm md:text-md"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
            )}
          </div>
        </div>

        {/* Password + Confirm Password */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full space-y-1">
            <Label htmlFor="password" className="text-sm md:text-md">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="text-sm md:text-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="w-full space-y-1">
            <Label htmlFor="confirmPassword" className="text-sm md:text-md">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className="text-sm md:text-md"
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
          <Label htmlFor="role" className="text-sm md:text-md">
            Role
          </Label>
          <Select
            onValueChange={(value: "student" | "instructor") =>
              setValue("role", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent className="text-sm md:text-md">
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="instructor">Instructor</SelectItem>
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

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium hover:underline text-orange-600"
        >
          Login
        </Link>
      </p>
    </>
  );
}

export default RegisterComponent;
