"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/validations/authValidations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { URLs } from "@/constants/urls";

type LoginFormData = z.infer<typeof loginSchema>;

function LoginComponent() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // 👈 real-time validation as user types
  });

  const onSubmit = async (formData: LoginFormData) => {
    console.log("Login FormData", formData);

    const { data } = await axios.post(
      `${URLs.backend}/api/v1/auth/login`,
      formData,
      {
        withCredentials: true, // ✅ this is required for cookies
      }
    );
    console.log("login response", data);
    if (data.success) {
      const accessToken = data?.accessToken;
      const accessTokenExpiryTime = data?.accessTokenExpiryTime;
      console.log("accT", accessToken);

      if (accessToken && accessTokenExpiryTime) {

        // save token and it expiry
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("accessTokenExpiryTime", accessTokenExpiryTime);


        // fetch user profile and save it to localStorage
        const userResponse = await axios.get(`${URLs.backend}/api/v1/user/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("user response /me", data);
        if (userResponse?.data?.success) {
          localStorage.setItem("user", JSON.stringify(userResponse.data.user));
          router.push("/");
        }
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        method="POST"
      >
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
          // disabled={loading}
        >
          {/* {loading ? "Logging in..." : "Login"} */}
          Login
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
