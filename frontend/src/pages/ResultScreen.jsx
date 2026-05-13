import { useLocation } from "react-router-dom";

import {
  AlertTriangle,
  ShieldCheck,
  Activity,
  Brain,
  AudioLines,
} from "lucide-react";

import { motion } from "framer-motion";

import AppShell from "../layouts/AppShell";

import { Card } from "@/components/ui/card";

function ResultScreen() {
  const { state } = useLocation();

  const result = state;

  if (!result) {
    return (
      <AppShell>

        <div className="p-10">
          No result found.
        </div>

      </AppShell>
    );
  }

  const ai =
    result.aiResponse || {};

  const risk =
    ai.risk_level || "LOW";

  const riskStyles = {
    HIGH: {
      bg: "from-[#fff1ed] to-[#fff8f6]",
      text: "text-[#df6b57]",
      badge: "bg-[#df6b57]",
      icon: AlertTriangle,
    },

    MEDIUM: {
      bg: "from-[#fff9ef] to-[#fffdf9]",
      text: "text-[#dd8a28]",
      badge: "bg-[#dd8a28]",
      icon: Activity,
    },

    LOW: {
      bg: "from-[#eef8f5] to-[#f8fffc]",
      text: "text-[#2d9b7f]",
      badge: "bg-[#2d9b7f]",
      icon: ShieldCheck,
    },
  };

  const current =
    riskStyles[risk];

  const Icon =
    current.icon;

  return (
    <AppShell>

      <div className="space-y-8">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <h1 className="text-4xl font-bold">
            AI Screening Result
          </h1>

          <p className="text-neutral-500 mt-2">
            Voice-based healthcare analysis summary.
          </p>

        </motion.div>

        {/* HERO */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
        >

          <Card
            className={`
              rounded-[2.5rem]
              border-0
              shadow-xl
              overflow-hidden
              bg-gradient-to-br
              ${current.bg}
              p-8
            `}
          >

            <div className="flex items-center justify-between gap-6 flex-wrap">

              <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-[2rem] bg-white shadow-md flex items-center justify-center">

                  <Icon
                    size={38}
                    className={
                      current.text
                    }
                  />

                </div>

                <div>

                  <div
                    className={`
                      inline-flex
                      px-4 py-1
                      rounded-full
                      text-white
                      text-sm
                      font-semibold
                      ${current.badge}
                    `}
                  >
                    {risk} RISK
                  </div>

                  <h2 className="text-3xl font-bold mt-4">
                    {
                      ai.possible_concern
                    }
                  </h2>

                </div>

              </div>

            </div>

          </Card>

        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* TRANSCRIPT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <Card className="rounded-[2rem] border-0 shadow-sm p-6 h-full">

              <div className="flex items-center gap-3 mb-5">

                <div className="bg-[#eef4ff] p-3 rounded-2xl">

                  <AudioLines
                    size={22}
                    className="text-[#4d78ff]"
                  />

                </div>

                <h2 className="text-2xl font-semibold">
                  Transcript
                </h2>

              </div>

              <p className="text-neutral-600 leading-relaxed text-lg">
                {result.transcript}
              </p>

            </Card>

          </motion.div>

          {/* AI RESPONSE */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <Card className="rounded-[2rem] border-0 shadow-sm p-6 h-full">

              <div className="flex items-center gap-3 mb-5">

                <div className="bg-[#fff1ed] p-3 rounded-2xl">

                  <Brain
                    size={22}
                    className="text-[#df6b57]"
                  />

                </div>

                <h2 className="text-2xl font-semibold">
                  AI Guidance
                </h2>

              </div>

              <p className="text-neutral-600 leading-relaxed text-lg">
                {
                  ai.response_for_user
                }
              </p>

            </Card>

          </motion.div>

        </div>

        {/* WARNING SIGNS */}
        {ai.warning_signs &&
          ai.warning_signs.length >
            0 && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <Card className="rounded-[2rem] border-0 shadow-sm p-6">

              <h2 className="text-2xl font-semibold mb-5">
                Warning Signs
              </h2>

              <div className="flex flex-wrap gap-3">

                {ai.warning_signs.map(
                  (
                    sign,
                    index
                  ) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-full bg-[#fff1ed] text-[#df6b57] font-medium"
                    >
                      {sign}
                    </div>
                  )
                )}

              </div>

            </Card>

          </motion.div>
        )}

      </div>

    </AppShell>
  );
}

export default ResultScreen;