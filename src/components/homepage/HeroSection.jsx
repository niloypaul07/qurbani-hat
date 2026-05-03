"use client";

import Link from "next/link";
import Image from "next/image";
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
        <section className="bg-white py-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold mb-5">
            🐂 Trusted Qurbani Platform
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-tight">
            Book Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Qurbani Animal
            </span>{" "}
            Easily & Securely
          </h1>

          {/* Description */}
          <p className="text-slate-600 mt-4 text-sm md:text-base max-w-md">
            Discover healthy and verified livestock for your Qurbani. 
            Simple booking, trusted sellers, and a hassle-free experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 mt-6">

            <Link href="/animals">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition-all duration-300">
                Browse Animals
              </button>
            </Link>

            <Link href="/register">
              <button className="px-6 py-3 rounded-xl border border-purple-300 text-purple-600 font-semibold hover:bg-purple-50 transition">
                Get Started
              </button>
            </Link>

          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-8 text-sm text-slate-600">
            <div>
              <p className="text-xl font-bold text-slate-800">500+</p>
              Animals Listed
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">300+</p>
              Happy Buyers
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">100%</p>
              Trusted Sellers
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">

          {/* Glow Background */}
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl"></div>

          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.pexels.com/photos/28308873/pexels-photo-28308873.jpeg" // put your image in public folder
              alt="Qurbani Animal"
              width={600}
              height={400}
              className="w-full h-[350px] md:h-[420px] object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
   
};

export default HeroSection;