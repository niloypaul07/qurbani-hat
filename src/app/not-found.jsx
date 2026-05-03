"use client";

import Link from "next/link";
import { Home, SearchX, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden px-4">

            {/* Background Glow */}
            <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-linear-to-r from-purple-600 to-pink-500 opacity-20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-linear-to-r from-pink-500 to-purple-600 opacity-20 blur-[120px] rounded-full"></div>

            {/* Card */}
            <div className="relative z-10 max-w-lg w-full bg-white border border-slate-200 shadow-xl rounded-3xl p-8 text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-linear-to-r from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
                        <SearchX size={36} className="text-white" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    404
                </h1>

                <h2 className="text-2xl font-bold text-slate-800 mt-2">
                    Page Not Found
                </h2>

                <p className="text-slate-500 mt-3 text-sm">
                    The page you are looking for doesn’t exist or has been moved.
                </p>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-90 transition"
                    >
                        <Home size={18} />
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition font-medium"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>

                </div>

            </div>
        </div>
    );
}