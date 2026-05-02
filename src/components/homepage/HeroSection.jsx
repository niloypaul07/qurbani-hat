"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

const HeroSection = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            try {
                const { data: session } = await authClient.getSession();
                if (session?.user) {
                    setUser(session.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Session check failed:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        getSession();
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: session } = await authClient.getSession();
            setUser(session?.user || null);
        };

        const interval = setInterval(checkAuth, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-slate-950 py-15 px-4">
            <div className="max-w-6xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative shadow-xl">

                <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full"></div>

                <div className="relative z-10 px-6 py-10 md:px-10 lg:py-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">

                        <div>
                            <p className="inline-block px-3 py-1.5 rounded-full bg-slate-800 text-amber-400 text-xs font-medium mb-3 border border-slate-700">
                                Trusted Livestock Marketplace
                            </p>

                            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
                                Find Your Perfect{" "}
                                <span className="bg-gradient-to-r from-emerald-400 to-lime-300 bg-clip-text text-transparent">
                                    Qurbani Animal
                                </span>
                            </h1>

                            <p className="mt-4 text-slate-300 text-base leading-6 max-w-xl">
                                Explore healthy cows, goats, sheep, and premium breeds from verified sellers across Bangladesh.
                            </p>

                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <Link
                                    href="/animals"
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 transition font-bold text-black text-center shadow-md hover:scale-105"
                                >
                                    Browse Animals
                                </Link>

                                {!loading && !user && (
                                    <Link
                                        href="/register"
                                        className="px-6 py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 transition font-semibold text-center"
                                    >
                                        Join Now
                                    </Link>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-8 max-w-sm">
                                <div>
                                    <h3 className="text-xl font-bold text-emerald-400">
                                        500+
                                    </h3>
                                    <p className="text-xs text-slate-400">Animals</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-amber-400">
                                        100+
                                    </h3>
                                    <p className="text-xs text-slate-400">Sellers</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-cyan-400">
                                        24/7
                                    </h3>
                                    <p className="text-xs text-slate-400">Support</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <img
                                src="https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=600&q=80"
                                alt="Qurbani Animal"
                                className="w-full max-w-sm h-auto object-cover rounded-2xl shadow-xl border border-slate-700/50 hover:scale-[1.02] transition duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;