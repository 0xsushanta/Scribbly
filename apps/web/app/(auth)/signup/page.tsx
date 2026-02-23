"use client";

import { Button } from "@/components/Button";
import { API_BACKEND } from "@/config";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, PenTool, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await axios.post(`${API_BACKEND}/signup`, {
        name,
        username,
        email,
        password,
      });

      setSuccessMessage("Account created. Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 700);
    } catch (err) {
      setError(readErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#DBEAFE]/30 via-white to-[#60A5FA]/20 p-4">
      <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#60A5FA]/20 via-[#3B82F6]/15 to-[#2563EB]/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/4 rounded-full bg-gradient-to-tr from-[#DBEAFE]/20 via-[#60A5FA]/15 to-[#3B82F6]/10 blur-3xl -z-10" />

      <Link
        href="/"
        className="group absolute left-4 top-4 inline-flex items-center gap-2 text-stone-600 transition-colors hover:text-[#3B82F6]"
      >
        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back to home</span>
      </Link>

      <div className="w-full max-w-md rounded-3xl border border-[#3B82F6]/10 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-center">
          <div className="w-14 h-14 bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#60A5FA] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#3B82F6]/30 transform rotate-3 hover:rotate-6 transition-transform duration-300">
            <PenTool size={28} strokeWidth={2.5} />
          </div>
        </div>

        <div className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-bold text-ink">Create your account</h1>
          <p className="text-sm text-stone-600">Start your creative journey with Scribly</p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-stone-700">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                <User size={20} />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border-2 border-stone-200 bg-white py-3 pl-12 pr-4 outline-none transition-all duration-200 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-semibold text-stone-700">
              Username
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                <User size={20} />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="johndoe"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded-xl border-2 border-stone-200 bg-white py-3 pl-12 pr-4 outline-none transition-all duration-200 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                minLength={3}
                maxLength={10}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-stone-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border-2 border-stone-200 bg-white py-3 pl-12 pr-4 outline-none transition-all duration-200 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-stone-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border-2 border-stone-200 bg-white py-3 pl-12 pr-12 outline-none transition-all duration-200 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 transition-colors hover:text-[#3B82F6]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
          ) : null}
          {successMessage ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {successMessage}
            </p>
          ) : null}

          <Button type="submit" className="w-full justify-center" size="lg" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-stone-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#3B82F6] hover:text-[#2563EB]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function readErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      (error.response?.data as { msg?: string; message?: string } | undefined)?.msg ??
      (error.response?.data as { msg?: string; message?: string } | undefined)?.message ??
      error.message
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to create account right now.";
}
