"use client";

import { Award, ShieldCheck, CheckCircle2, Building2 } from "lucide-react";

export function GovernmentRecognitionTicker() {
  const honors = [
    { title: "UP Chief Minister State Award", desc: "Best Professional Psychologist (2019)", icon: Award, color: "text-amber-600 bg-amber-100" },
    { title: "Ministry of Home Affairs", desc: "FCRA Registered NGO", icon: ShieldCheck, color: "text-teal-600 bg-teal-100" },
    { title: "Income Tax Department", desc: "100% Tax Exemption (80G & 12A)", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-100" },
    { title: "National Trust of India", desc: "Registered for Autism, CP, MR & Multiple Disabilities", icon: Building2, color: "text-blue-600 bg-blue-100" },
  ];

  return (
    <section className="w-full py-8 bg-[#FFF9EE] border-b border-amber-200/80 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {honors.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-shadow"
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${h.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                    {h.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5 leading-tight">
                    {h.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
