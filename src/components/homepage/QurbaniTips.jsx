"use client";

import { CheckCircle } from "lucide-react";

const tips = [
  {
    title: "Choose Healthy Animals",
    desc: "Select animals that are active, healthy, and free from visible defects or illness.",
  },
  {
    title: "Verify Age Requirements",
    desc: "Ensure the animal meets Islamic age criteria (e.g., cows 2+ years, goats/sheep 1+ year).",
  },
  {
    title: "Check Teeth & Physical Condition",
    desc: "Proper teeth growth and strong body condition indicate a good animal.",
  },
  {
    title: "Avoid Sick or Injured Animals",
    desc: "Animals with injuries, blindness, or disease are not suitable for Qurbani.",
  },
  {
    title: "Buy from Trusted Sources",
    desc: "Always purchase from reliable sellers or verified marketplaces.",
  },
  {
    title: "Maintain Hygiene",
    desc: "Ensure clean environment and proper care before and after Qurbani.",
  },
];

const QurbaniTips = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 animate__animated animate__fadeInDown">
            Qurbani <span className="text-purple-600 animate__animated animate__fadeInDown">Tips</span>
          </h2>
          <p className="text-slate-600 mt-3 text-sm md:text-base animate__animated animate__fadeInDown">
            Follow these important guidelines for a proper and meaningful Qurbani.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {tips.map((tip, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                
                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md">
                  <CheckCircle size={18} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {tip.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default QurbaniTips;