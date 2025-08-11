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
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type LoginFormData = z.infer<typeof loginSchema>;

function LoginComponent() {
  const router = useRouter();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // 👈 real-time validation as user types
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: LoginFormData) => {
    console.log("Login FormData", formData);
    setLoading(true);

    try {
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

        if (accessToken && accessTokenExpiryTime) {
          // save token and it expiry
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("accessTokenExpiryTime", accessTokenExpiryTime);

          try {
            // fetch user profile and save it to localStorage
            const userResponse = await axios.get(
              `${URLs.backend}/api/v1/user/me`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            // console.log("user response /me", data);
            if (userResponse?.data?.success) {
              localStorage.setItem(
                "user",
                JSON.stringify(userResponse.data.user)
              );

              setUser(userResponse?.data?.user);

              toast.success(
                `Welcome ${userResponse.data.user?.name || "Back"}`
              );
              reset();
              router.push("/");
              router.refresh();
            }
          } catch (error) {
            toast.error("Login Success But Can't fetch user!");
            console.log("Error Fetching User", error);
          }
        }
      }
    } catch (error) {
      toast.error("❌ Login Failed");
      console.log("Error Login!", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log("URLs.backend", URLs.backend);
  // }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        method="POST"
      >
        <div className="flex flex-col gap-4">
          <div className="w-full space-y-1 flex flex-col">
            <Label htmlFor="email" className="text-sm md:text-md text-white">
              Email
            </Label>
            <Input
              id="email"
              {...register("email")}
              placeholder="you@example.com"
              className="text-sm md:text-md text-neutral-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col space-y-1">
            <Label htmlFor="password" className="text-sm md:text-md text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="text-sm md:text-md text-neutral-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="cursor-pointer w-full bg-orange-500 hover:bg-orange-500/85 text-white"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <p>Login...</p>
              <Loader2 className="animate-spin" />
            </span>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <p className="text-sm text-center mt-4 text-white">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium hover:underline text-orange-500"
        >
          Register
        </Link>
      </p>
    </>
  );
}

export default LoginComponent;
