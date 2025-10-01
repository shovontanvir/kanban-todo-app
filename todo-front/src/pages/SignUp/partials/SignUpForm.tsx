/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useSignUp } from "@/hooks/useSignUp";
import { useNavigate } from "react-router";
import { Toaster } from "@/components/ui/sonner";

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate } = useSignUp(() => reset());

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: SignUpFormValues) => {
    const { confirmPassword, ...payload } = {
      ...data,
      password: data.password,
    };
    mutate(payload);
  };

  return (
    <Card className="w-1/2 mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col gap-4">
          <Input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            autoFocus
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}

          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Email Address"
            type="email"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}

          <div className="relative">
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}

          <div className="relative">
            <Input
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm Password"
              type="password"
            />
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-1/2 mx-auto button my-3">
            Sign Up
          </Button>
        </CardFooter>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <button
            className="underline underline-offset-4 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </div>
      </form>
      <Toaster />
    </Card>
  );
};

export default SignUpForm;
