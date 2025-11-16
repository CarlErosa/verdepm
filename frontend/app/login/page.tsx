import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/ui/logo";
import { LoginForm } from "@/components/auth/login-form";
import { Background } from "@/components/ui/background";

export const metadata: Metadata = {
  title: "VerdePM - Login",
};

export default function LoginPage() {
  return (
    <Background className="flex min-h-screen" variant="default">
      {/* Login Form Container */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 w-full max-w-md sm:max-w-lg mx-auto py-12">
        <div className="w-full max-w-md mx-auto space-y-8">
          {/* Logo */}
          <div className="mb-2 animate-in fade-in slide-in-from-top-4 duration-700">
            <Logo />
          </div>

          {/* Modern Card Container */}
          <div className="backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 rounded-3xl border border-white/40 dark:border-gray-700/50 shadow-2xl shadow-black/5 dark:shadow-black/20 p-8 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 hover:shadow-3xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-shadow">
            {/* Header */}
            <div className="mb-8 text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-in fade-in slide-in-from-top-2 duration-700 delay-300">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base font-medium animate-in fade-in slide-in-from-top-2 duration-700 delay-500">
                Sign in to your VerdePM account
              </p>
            </div>

            {/* Login Form */}
            <div className="animate-in fade-in duration-700 delay-700">
              <Suspense fallback={<div className="text-center text-muted-foreground">Loading...</div>}>
                <LoginForm />
              </Suspense>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center px-4 sm:px-0 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-1000">
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              By signing in, you agree to our{" "}
              <Link
                href="/terms"
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors underline-offset-2 hover:underline font-medium"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors underline-offset-2 hover:underline font-medium"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Background>
  );
}
