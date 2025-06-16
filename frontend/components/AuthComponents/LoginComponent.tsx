"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/validations/authValidations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { fetchUserProfile, loginUser } from "@/redux/store/userSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type LoginFormData = z.infer<typeof loginSchema>;

function LoginComponent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { accessToken, loading, error, user } = useAppSelector(
    (state) => state.user
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // 👈 real-time validation as user types
  });

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const resultAction = await dispatch(loginUser(formData));
      console.log("login result action", resultAction);
      
      if (loginUser.fulfilled.match(resultAction)) {
        console.log("now fetch dispact");
        
        await dispatch(fetchUserProfile());
      } else {
        console.error("Login failed:", resultAction.payload);
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="w-full space-y-1 flex flex-col">
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
          <div className="w-full flex flex-col space-y-1">
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
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-800 text-white"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="text-sm text-center mt-4">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium hover:underline text-emerald-600"
        >
          Register
        </Link>
      </p>
    </>
  );
}

export default LoginComponent;
