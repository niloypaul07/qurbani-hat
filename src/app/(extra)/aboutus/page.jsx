"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.jpg";
import {
    FaShieldAlt,
    FaTruck,
    FaHandshake,
    FaUsers,
    FaArrowRight,
    FaCheckCircle
} from "react-icons/fa";

const AboutPage = () => {

    const stats = [
        { number: "500+", label: "Animals" },
        { number: "100+", label: "Sellers" },
        { number: "5K+", label: "Users" },
        { number: "24/7", label: "Support" },
    ];

    const features = [
        {
            icon: FaShieldAlt,
            title: "Verified Platform",
            desc: "All sellers and listings are verified for safety and trust."
        },
        {
            icon: FaHandshake,
            title: "Fair Pricing",
            desc: "Transparent pricing with no hidden cost or manipulation."
        },
        {
            icon: FaTruck,
            title: "Fast Process",
            desc: "Smooth booking and delivery coordination system."
        },
        {
            icon: FaUsers,
            title: "Human Support",
            desc: "Real people ready to help you anytime."
        },
    ];

    return (
        <section className="min-h-screen bg-white text-slate-800">

            {/* HERO */}
            <div className="relative overflow-hidden">

                {/* background glow */}
                <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-purple-500/20 blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/20 blur-[120px]" />

                <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 grid lg:grid-cols-2 gap-14 items-center">

                    {/* LEFT */}
                    <div>

                        <span className="px-4 py-2 text-sm rounded-full bg-purple-50 text-purple-700 font-medium">
                            About QurbaniHat
                        </span>

                        <h1 className="text-4xl md:text-6xl font-extrabold mt-5 leading-tight">
                            Smarter Way to Buy{" "}
                            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                                Qurbani Animals
                            </span>
                        </h1>

                        <p className="mt-6 text-slate-600 text-lg leading-8">
                            A modern livestock marketplace that connects buyers
                            with trusted sellers across Bangladesh with speed,
                            trust, and simplicity.
                        </p>

                        <div className="mt-8 flex gap-4 flex-wrap">
                            <Link
                                href="/animals"
                                className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-90 transition"
                            >
                                Browse Animals
                            </Link>

                            <Link
                                href="/"
                                className="px-7 py-3 rounded-xl border border-slate-200 hover:border-purple-500 hover:text-purple-600 transition"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative">
                        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                            <img
                                src="https://images.pexels.com/photos/32401115/pexels-photo-32401115.jpeg"
                                className="w-full h-[420px] object-cover"
                            />
                        </div>

                        {/* floating badge */}
                        <div className="absolute -bottom-6 left-6 bg-white shadow-xl border rounded-2xl px-5 py-3">
                            <p className="text-purple-600 font-bold text-lg">100% Trusted</p>
                            <p className="text-xs text-slate-500">Verified Sellers</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* STATS */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                    <div
                        key={i}
                        className="bg-white border rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition"
                    >
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                            {s.number}
                        </h2>
                        <p className="text-slate-500 mt-2 text-sm">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* FEATURES */}
            <div className="bg-slate-50 py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-10">

                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-5xl font-bold">
                            Why Choose Us
                        </h2>
                        <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                            Built for trust, simplicity and a better buying experience
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div
                                    key={i}
                                    className="bg-white border rounded-3xl p-6 hover:-translate-y-2 transition shadow-sm"
                                >
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
                                        <Icon />
                                    </div>

                                    <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                                    <p className="text-sm text-slate-500 leading-6">
                                        {f.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>

            {/* CTA */}
            <div className="max-w-5xl mx-auto text-center py-24 px-6">
                <h2 className="text-3xl md:text-5xl font-bold">
                    Ready to explore animals?
                </h2>

                <p className="text-slate-500 mt-5">
                    Start your Qurbani journey with trusted sellers today.
                </p>

                <Link
                    href="/animals"
                    className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-90 transition"
                >
                    Browse Now
                    <FaArrowRight />
                </Link>
            </div>

        </section>
    );
};

export default AboutPage;