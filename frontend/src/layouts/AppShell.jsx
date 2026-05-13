import { motion } from "framer-motion";

import {
  HeartPulse,
  Bell,
  Activity,
  ShieldAlert,
} from "lucide-react";

import MobileBottomNav from "../components/MobileBottomNav";
function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-[#fffaf7] text-neutral-900">

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:grid lg:grid-cols-[280px_1fr_340px] min-h-screen">

        {/* LEFT SIDEBAR */}
        <aside className="border-r border-neutral-200/70 bg-white/60 backdrop-blur-xl p-6 flex flex-col">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >

            <h1 className="text-3xl font-bold text-[#e77b67]">
              SakhiAI
            </h1>

            <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
              AI healthcare intelligence
              for rural communities.
            </p>

          </motion.div>

          {/* NAV */}
          <div className="mt-12 flex flex-col gap-3">

            <div className="bg-[#fff3ef] text-[#df6b57] rounded-2xl p-4 font-medium">
              Dashboard
            </div>

            <div className="rounded-2xl p-4 hover:bg-neutral-100 transition cursor-pointer">
              Screenings
            </div>

            <div className="rounded-2xl p-4 hover:bg-neutral-100 transition cursor-pointer">
              Alerts
            </div>

            <div className="rounded-2xl p-4 hover:bg-neutral-100 transition cursor-pointer">
              Analytics
            </div>

          </div>

          {/* SIDEBAR STATS */}
          <div className="mt-auto space-y-4">

            <div className="bg-gradient-to-br from-[#eb7d68] to-[#df6b57] rounded-3xl p-5 text-white shadow-lg">

              <div className="flex items-center gap-3">
                <HeartPulse size={22} />
                <p className="font-medium">
                  Active Monitoring
                </p>
              </div>

              <h2 className="text-4xl font-bold mt-5">
                24
              </h2>

              <p className="text-sm text-white/80 mt-1">
                screenings today
              </p>

            </div>

          </div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="overflow-y-auto min-h-screen">
          <div className="w-full max-w-5xl mx-auto p-8">
            {children}
          </div>
        </main>

        {/* RIGHT PANEL */}
        <aside className="border-l border-neutral-200/70 bg-white/50 backdrop-blur-xl p-6">

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Live Alerts
            </h2>

            <Bell
              size={20}
              className="text-[#df6b57]"
            />
          </div>

          <div className="mt-6 flex flex-col gap-4">

            <div className="bg-[#fff1ed] rounded-3xl p-5 border border-[#ffd7cf]">

              <div className="flex items-center gap-3">
                <ShieldAlert
                  size={20}
                  className="text-[#db6548]"
                />

                <span className="text-sm font-semibold text-[#db6548]">
                  HIGH RISK
                </span>
              </div>

              <p className="mt-4 font-medium leading-relaxed">
                Pregnancy-related hypertension indicators detected.
              </p>

              <p className="text-sm text-neutral-500 mt-2">
                2 mins ago
              </p>

            </div>

            <div className="bg-white rounded-3xl p-5 border border-neutral-200">

              <div className="flex items-center gap-3">
                <Activity
                  size={20}
                  className="text-[#2d9b7f]"
                />

                <span className="text-sm font-semibold text-[#2d9b7f]">
                  ACTIVE SCREENINGS
                </span>
              </div>

              <h2 className="text-4xl font-bold mt-5">
                18
              </h2>

              <p className="text-sm text-neutral-500 mt-2">
                currently monitored
              </p>

            </div>

          </div>

        </aside>

      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden min-h-screen w-full">
        <div className="w-full max-w-md mx-auto min-h-screen">
          {children}
        </div>
      </div>
        <MobileBottomNav />
    </div>
  );
}

export default AppShell;