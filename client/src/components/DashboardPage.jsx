import React from "react";
import { Link, Navigate, useNavigate } from "react-router";
import {
  MessageSquare,
  Sparkles,
  User,
  ArrowRight,
  Plus,
  History,
  Settings,
} from "lucide-react";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-5 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold">
            Provity<span className="text-orange-500">.</span>
          </h1>

          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl bg-[#1e1e1e] text-gray-400 hover:text-white">
              <History size={19} />
            </button>

            <button className="p-2.5 rounded-xl bg-[#1e1e1e] text-gray-400 hover:text-white">
              <Settings size={19} />
            </button>
          </div>
        </header>

        {/* Welcome */}
        <section className="mb-8">
          <p className="text-orange-500 text-sm font-medium mb-2">
            <Sparkles size={15} className="inline mr-2" />
            YOUR AI ASSISTANT
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold mb-3">
            Welcome back, Mayur 👋
          </h2>

          <p className="text-gray-400">What would you like to create today?</p>
        </section>

        {/* User Info Card */}
        <section className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
              <User size={27} />
            </div>

            <div>
              <h3 className="font-semibold text-lg">Mayur Bairagi</h3>
              <p className="text-sm text-gray-500">mayur@example.com</p>
              <span className="text-xs text-orange-500 mt-1 inline-block">
                Free Plan
              </span>
            </div>
          </div>

          <button className="text-sm text-gray-400 hover:text-orange-500">
            Edit Profile
          </button>
        </section>

        {/* Chat Card */}
        <section className="bg-[#1c1c1c] border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <MessageSquare size={22} />
            </div>

            <div>
              <h3 className="font-semibold text-lg">Start a Conversation</h3>
              <p className="text-sm text-gray-500">
                Ask anything, explore ideas or create something new.
              </p>
            </div>
          </div>

          {/* Prompt Input */}
          <div className="bg-[#121212] border border-white/10 rounded-xl p-4 focus-within:border-orange-500/50 transition">
            <textarea
              placeholder="Ask me anything..."
              rows={3}
              className="w-full bg-transparent outline-none resize-none text-sm placeholder:text-gray-600"
            />

            <div className="flex justify-between items-center mt-3">
              <button className="text-gray-500 hover:text-white">
                <Plus size={20} />
              </button>

              <Link
                to="/chat"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
              >
                Start Chat
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Suggestions */}
          <div className="mt-6">
            <p className="text-xs text-gray-500 mb-3">TRY ASKING</p>

            <div className="flex flex-wrap gap-2">
              {[
                "Explain JavaScript closures",
                "Write a professional email",
                "Generate creative ideas",
                "Help me debug my code",
              ].map((prompt) => (
                <button
                  key={prompt}
                  className="text-xs text-gray-400 border border-white/10 rounded-full px-4 py-2 hover:border-orange-500/50 hover:text-orange-500 transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-10">
          Powered by AI · Gena AI Workspace
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
