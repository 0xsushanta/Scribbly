"use client"
import React, { useState } from 'react';
import { PenTool, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-[#DBEAFE]/30 via-white to-[#60A5FA]/20 flex items-center justify-center p-4 relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#60A5FA]/20 via-[#3B82F6]/15 to-[#2563EB]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#DBEAFE]/20 via-[#60A5FA]/15 to-[#3B82F6]/10 rounded-full blur-3xl -z-10"></div>

      {/* Back to Home - Absolute positioned */}
      <Link 
        href="/" 
        className="absolute top-4 left-4 inline-flex items-center gap-2 text-stone-600 hover:text-[#3B82F6] transition-colors group z-10"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to home</span>
      </Link>

      <div className="w-full max-w-md">
        {/* Signup Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#3B82F6]/10 p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#60A5FA] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#3B82F6]/30 transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <PenTool size={28} strokeWidth={2.5} />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-ink mb-2">
              Create your account
            </h1>
            <p className="text-stone-600 text-sm">
              Start your creative journey with Scribly
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-2">
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
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-stone-200 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition-all duration-200 bg-white"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
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
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-stone-200 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition-all duration-200 bg-white"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-stone-700 mb-2">
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
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-stone-200 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition-all duration-200 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#3B82F6] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-stone-600 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-[#3B82F6] hover:text-[#2563EB] font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
