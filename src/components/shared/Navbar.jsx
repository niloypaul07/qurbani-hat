"use client";

import logo from "@/assets/logo.jpg";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            try {
                const { data: session } = await authClient.getSession();
                if (session?.user) setUser(session.user);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getSession();
    }, []);

    const handleLogout = async () => {
        await authClient.signOut();
        setUser(null);
        router.push("/");
        router.refresh();
    };

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src={logo}
                            alt="QurbaniHat"
                            width={48}
                            height={48}
                            className="rounded-full"
                        />
                        <h1 className="text-xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                            QurbaniHat
                        </h1>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className={`font-medium ${pathname === "/" ? "text-purple-600" : "text-slate-700"}`}>
                            Home
                        </Link>

                        <Link href="/animals" className={`font-medium ${pathname === "/animals" ? "text-purple-600" : "text-slate-700"}`}>
                            All Animals
                        </Link>
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-4">

                        {loading ? (
                            <div className="w-20 h-9 bg-slate-200 animate-pulse rounded-lg" />
                        ) : user ? (
                            <div className="flex items-center gap-3">

                                {/* PROFILE AVATAR (FIXED SIZE) */}
                                <Link href="/my-profile" className="flex gap-2 items-center" >
                                    <Image
                                        src={user?.image || "/avatar.png"}
                                        alt="profile"
                                        width={25}
                                        height={25}
                                        className="rounded-full border-2 border-purple-500 object-cover cursor-pointer"
                                    />
                                    <span className="font-medium text-slate-700">
                                    My Profile
                                </span>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link href="/login" className="px-4 py-2 border rounded-xl text-purple-600 border-purple-300">
                                    Login
                                </Link>

                                <Link href="/register" className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                                    Register
                                </Link>
                            </div>
                        )}

                    </div>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-3xl text-purple-600"
                    >
                        ☰
                    </button>
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="md:hidden pb-5 space-y-4 border-t border-slate-200 pt-4">

                        <Link href="/" onClick={() => setOpen(false)} className="block text-slate-700">
                            Home
                        </Link>

                        <Link href="/animals" onClick={() => setOpen(false)} className="block text-slate-700">
                            Animals
                        </Link>

                        {/* MOBILE PROFILE (FIXED) */}
                        {user && (
                            <Link
                                href="/my-profile"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 py-2"
                            >
                                <Image
                                    src={user?.image || "/avatar.png"}
                                    alt="profile"
                                    width={45}
                                    height={45}
                                    className="rounded-full border-2 border-purple-500"
                                />

                                <span className="font-medium text-slate-700">
                                    My Profile
                                </span>
                            </Link>
                        )}

                        {/* Auth Buttons */}
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 rounded-xl bg-linear-to-r from-purple-600 to-pink-500 text-white"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link href="/login" className="px-4 py-2 border rounded-xl text-center text-purple-600">
                                    Login
                                </Link>

                                <Link href="/register" className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center">
                                    Register
                                </Link>
                            </div>
                        )}

                    </div>
                )}

            </div>
        </nav>
    );
};

export default Navbar;