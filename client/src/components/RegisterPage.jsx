import React from "react";
import { Link, Navigate } from "react-router";
import { Bot, User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useAuthHook } from "../hooks/useAuthHook";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  const { handleRegisterData, handleRegisterSubmit, formData } = useAuthHook();

  const { loading, user } = useSelector((state) => state.auth);

  if (!user) {
    return <h1>loading</h1>;
  }

  if (user) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] px-4 py-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-violet-600/15 blur-[130px] rounded-full -top-32 -left-32 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-indigo-600/10 blur-[130px] rounded-full -bottom-32 -right-32 pointer-events-none" />

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Register Card */}
      <div className="relative w-full max-w-[430px] bg-[#111114]/95 border border-white/[0.08] rounded-3xl p-7 sm:p-9 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* Logo */}
        <div className="flex justify-center mb-7">
          <div className="relative">
            <div className="absolute inset-0 bg-violet-500 blur-2xl opacity-30 rounded-full" />

            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 via-violet-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-violet-600/20 border border-white/10">
              <Bot size={32} className="text-white" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-violet-300 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-full mb-4">
            <Sparkles size={13} />
            Join the AI Workspace
          </div>

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
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Full Name
            </label>

            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors"
                size={18}
              />

              <input
                required
                value={formData.name}
                name="name"
                onInput={handleRegisterData}
                type="text"
                placeholder="Enter your name"
                className="w-full bg-[#19191f] border border-white/[0.08] rounded-xl py-3.5 pl-12 pr-4 text-white text-sm outline-none transition-all duration-300 focus:border-violet-500/60 focus:bg-[#1d1b26] focus:ring-4 focus:ring-violet-500/10 placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Email Address
            </label>

            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors"
                size={18}
              />

              <input
                required
                value={formData.email}
                name="email"
                onInput={handleRegisterData}
                type="email"
                placeholder="you@example.com"
                className="w-full bg-[#19191f] border border-white/[0.08] rounded-xl py-3.5 pl-12 pr-4 text-white text-sm outline-none transition-all duration-300 focus:border-violet-500/60 focus:bg-[#1d1b26] focus:ring-4 focus:ring-violet-500/10 placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Password
            </label>

            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors"
                size={18}
              />

              <input
                required
                value={formData.password}
                name="password"
                onInput={handleRegisterData}
                type="password"
                placeholder="Create a strong password"
                className="w-full bg-[#19191f] border border-white/[0.08] rounded-xl py-3.5 pl-12 pr-4 text-white text-sm outline-none transition-all duration-300 focus:border-violet-500/60 focus:bg-[#1d1b26] focus:ring-4 focus:ring-violet-500/10 placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Submit */}
          {loading ? (
            <button
              type="submit"
              className="w-full flex items-center justify-center opacity-60 gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-violet-600/20 cursor-wait"
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
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 active:scale-[0.98] group"
            >
              Create Account
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          )}
        </form>

        {/* Login Link */}
        <div className="mt-7 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-xs text-gray-600">
            Powered by AI · Built for the future
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
