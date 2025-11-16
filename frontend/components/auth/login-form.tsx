"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Loader2, AlertCircle, Mail, Lock } from "lucide-react";
import { Login } from "@/app/login/actions";
import { loginSchema, type LoginInput } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function LoginForm() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message");

  type FormValues = LoginInput & { remember?: boolean };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: FormValues) {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.remember) formData.append("remember", String(data.remember));

    try {
      await Login(formData);
    } catch {
      // server-side redirect will handle errors
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Error Message Alert */}
      {errorMessage && (
        <div
          className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg relative flex items-start gap-3 animate-in slide-in-from-top-1"
          role="alert"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2.5">
        <Label
          htmlFor="email"
          className="text-sm font-semibold text-gray-800 dark:text-gray-100 tracking-tight"
        >
          Email address
        </Label>
        <div className="relative group">
          <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
            errors.email ? "text-red-500 dark:text-red-400" : "text-gray-400 dark:text-gray-500 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400"
          }`} />
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            disabled={isSubmitting}
            className={`pl-11 h-12 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-500/30 shadow-sm transition-all duration-200 ${
              errors.email
                ? "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:focus:ring-red-500/30 bg-red-50/50 dark:bg-red-950/10 hover:border-red-600"
                : ""
            }`}
          />
        </div>
        {errors.email?.message && (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-md border border-red-200 dark:border-red-800/50 animate-in fade-in-50 slide-in-from-top-1 duration-200">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <p className="text-xs font-medium">{errors.email?.message}</p>
          </div>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="password"
            className="text-sm font-semibold text-gray-800 dark:text-gray-100 tracking-tight"
          >
            Password
          </Label>
        </div>
        <div className="relative group">
          <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
            errors.password ? "text-red-500 dark:text-red-400" : "text-gray-400 dark:text-gray-500 group-focus-within:text-emerald-500 dark:group-focus-within:text-emerald-400"
          }`} />
          <Input
            id="password"
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            disabled={isSubmitting}
            className={`pl-11 h-12 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-500/30 shadow-sm transition-all duration-200 ${
              errors.password
                ? "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:focus:ring-red-500/30 bg-red-50/50 dark:bg-red-950/10 hover:border-red-600"
                : ""
            }`}
          />
        </div>
        {errors.password?.message && (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-md border border-red-200 dark:border-red-800/50 animate-in fade-in-50 slide-in-from-top-1 duration-200">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <p className="text-xs font-medium">{errors.password?.message}</p>
          </div>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2.5 group/remember">
          <Checkbox
            id="remember"
            {...register("remember")}
            disabled={isSubmitting}
            className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
          />
          <label
            htmlFor="remember"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none group-hover/remember:text-gray-900 dark:group-hover/remember:text-gray-100 transition-colors"
          >
            Remember me
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}
