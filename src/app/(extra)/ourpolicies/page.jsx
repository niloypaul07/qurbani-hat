"use client";

import Link from "next/link";
import { Shield, Lock, RefreshCcw, AlertTriangle, ArrowRight } from "lucide-react";

const PoliciesPage = () => {

    const policies = [
        {
            icon: Shield,
            title: "Privacy Policy",
            color: "from-purple-600 to-pink-500",
            desc: "We respect your privacy and only use your data to improve your experience. Your information is never sold or shared without consent.",
        },
        {
            icon: Lock,
            title: "Buying Policy",
            color: "from-indigo-600 to-purple-500",
            desc: "All listings are user-submitted. Buyers should verify details before purchase. We encourage direct seller communication.",
        },
        {
            icon: RefreshCcw,
            title: "Refund Policy",
            color: "from-pink-500 to-rose-500",
            desc: "Refunds apply only in verified fraud or mismatch cases. Always confirm details before completing any transaction.",
        },
        {
            icon: AlertTriangle,
            title: "Safety Policy",
            color: "from-amber-400 to-pink-500",
            desc: "We actively monitor listings to maintain a safe marketplace. Report suspicious activity for quick action.",
        },
    ];

    return (
        <div className="min-h-screen bg-white relative overflow-hidden px-4 py-16">

            {/* Background Glow */}
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-gradient-to-r from-purple-600 to-pink-500 opacity-10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-gradient-to-r from-pink-500 to-purple-600 opacity-10 blur-[120px] rounded-full"></div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl font-extrabold">
                        Our{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                            Policies
                        </span>
                    </h1>

                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        Transparency, trust, and safety are the foundation of our platform.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-6">

                    {policies.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="group bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >

                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg mb-5 group-hover:scale-110 transition`}>
                                    <Icon size={22} />
                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-bold text-slate-800 mb-3">
                                    {item.title}
                                </h2>

                                {/* Description */}
                                <p className="text-slate-500 leading-7 text-sm">
                                    {item.desc}
                                </p>

                            </div>
                        );
                    })}

                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-14">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-90 transition shadow-lg"
                    >
                        Back to Home
                        <ArrowRight size={18} />
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default PoliciesPage;