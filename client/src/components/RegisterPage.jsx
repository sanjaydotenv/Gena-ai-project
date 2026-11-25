import React from "react";
import { Link } from "react-router";
import { Bot, User, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuthHook } from "../hooks/useAuthHook";

const RegisterPage = () => {
  const { loading, handleRegisterData, handleRegisterSubmit, formData } =
    useAuthHook();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-4 py-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-80 h-80 bg-violet-600/20 blur-[120px] rounded-full -top-20 -left-20" />
      <div className="absolute w-80 h-80 bg-orange-500/10 blur-[120px] rounded-full -bottom-20 -right-20" />

      {/* Register Card */}
      <div className="relative w-full max-w-md bg-[#111114]/90 border border-white/10 rounded-2xl p-8 shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-7">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-600/20">
            <Bot size={30} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Start building something intelligent.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegisterSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Full Name
            </label>

            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />

              <input
                value={formData.name}
                name="name"
                onInput={handleRegisterData}
                type="text"
                placeholder="Enter your name"
                className="w-full bg-[#1a1a1f] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Email Address
            </label>

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />

              <input
                value={formData.email}
                name="email"
                onInput={handleRegisterData}
                type="email"
                placeholder="you@example.com"
                className="w-full bg-[#1a1a1f] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Password</label>

            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />

              <input
                value={formData.password}
                name="password"
                onInput={handleRegisterData}
                type="password"
                placeholder="Create a strong password"
                className="w-full bg-[#1a1a1f] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Submit */}

          {loading ? (
            <button
              type="submit"
              className="w-full flex items-center justify-center opacity-50 gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-violet-600/20 cursor-wait"
            >
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

              <span className="flex items-center">
                Creating Account
                <span className="flex ml-1">
                  <span className="animate-pulse">.</span>
                  <span className="animate-pulse [animation-delay:200ms]">
                    .
                  </span>
                  <span className="animate-pulse [animation-delay:400ms]">
                    .
                  </span>
                </span>
              </span>
            </button>
          ) : (
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 active:scale-[0.98]"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          )}
        </form>

        {/* Login Link */}
        <div className="mt-7 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-violet-400 hover:text-violet-300 font-semibold transition"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-5 border-t border-white/5 text-center">
          <p className="text-xs text-gray-600">
            Powered by AI · Built for the future
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
