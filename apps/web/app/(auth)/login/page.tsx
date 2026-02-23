"use client";

import { Button } from "@/components/Button";
import { TOKEN_KEY, getApiBackend } from "@/config";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, PenTool } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem(TOKEN_KEY)) {
      router.replace("/canvas");
    }
  }, [router]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${getApiBackend()}/signin`, {
        email,
        password,
      });

      const token = response.data.token as string | undefined;
      if (!token) {
        setError("Sign in succeeded but no token was returned.");
        return;
      }

      window.localStorage.setItem(TOKEN_KEY, token);
      router.push("/canvas");
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
          <h1 className="mb-2 text-3xl font-bold text-ink">Welcome back</h1>
          <p className="text-sm text-stone-600">Sign in to continue your creative journey</p>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="john@example.com"
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
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

          <Button type="submit" className="w-full justify-center" size="lg" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-stone-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-[#3B82F6] hover:text-[#2563EB]">
              Sign up
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

  return "Unable to sign in right now.";
}
