"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
    ArrowLeft,
    ShieldCheck,
    Edit3,
    CalendarDays,
    Mail,
    User
} from "lucide-react";

const MyProfilePage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [memberSince, setMemberSince] = useState("");

    useEffect(() => {
        const getSession = async () => {
            try {
                const { data: session } = await authClient.getSession();

                if (!session?.user) {
                    router.push("/login");
                    return;
                }

                setUser(session.user);

                const date = new Date(session.user.createdAt || Date.now());
                setMemberSince(
                    date.toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                    })
                );

                setLoading(false);
            } catch (err) {
                router.push("/login");
            }
        };

        getSession();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-14 h-14 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-3 text-slate-500 text-sm">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-white px-4 py-10">

            <div className="max-w-3xl mx-auto">

                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-pink-600 mb-6 transition"
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>

                {/* MAIN CARD */}
                <div className="rounded-3xl border border-slate-200 shadow-xl overflow-hidden">

                    {/* LEFT SECTION ONLY */}
                    <div className="p-10 flex flex-col items-center text-center bg-white relative">

                        {/* TOP GRADIENT BAR */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-pink-500"></div>

                        {/* PROFILE IMAGE */}
                        <div className="relative mt-4">
                            <Image
                                src={user?.image || "/avatar.png"}
                                alt="profile"
                                width={130}
                                height={130}
                                className="rounded-full border-4 border-white shadow-lg ring-4 ring-pink-100"
                            />

                            
                        </div>

                        {/* NAME */}
                        <h2 className="mt-5 text-2xl font-bold text-slate-800">
                            {user?.name}
                        </h2>

                        {/* EMAIL */}
                        <div className="flex items-center gap-2 text-slate-500 mt-2 text-sm">
                            <Mail size={14} />
                            {user?.email}
                        </div>


                        {/* BUTTON */}
                        <Link href="/update-profile" className="w-full mt-6">
                            <button className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg">
                                <Edit3 size={16} />
                                Edit Profile
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;