import { Link, Navigate } from "react-router";
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
    return <Navigate to={"/"} />;
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
            Welcome back, {user?.name} 👋
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
              <h3 className="font-semibold text-lg">{user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
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

          <Link
            to="/chat"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition w-40"
          >
            Start Chat
            <ArrowRight size={16} />
          </Link>

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
