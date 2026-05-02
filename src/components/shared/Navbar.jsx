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
    const [showAvatar, setShowAvatar] = useState(true);
    const [isSessionLoading, setIsSessionLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            try {
                const { data: session } = await authClient.getSession();
                if (session?.user) setUser(session.user);
            } catch (err) {
                console.error(err);
            } finally {
                setIsSessionLoading(false);
            }
        };
        getSession();
    }, []);

    useEffect(() => {
        if (!user) return;
        let timeoutId;

        const startCycle = () => {
            setShowAvatar(true);
            timeoutId = setTimeout(() => {
                setShowAvatar(false);
                timeoutId = setTimeout(startCycle, 2000);
            }, 3000);
        };

        startCycle();
        return () => clearTimeout(timeoutId);
    }, [user]);

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            setUser(null);
            router.push("/");
            router.refresh();
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const getLinkClass = (path) =>
        `text-base font-medium transition ${
            pathname === path
                ? "text-purple-600"
                : "text-slate-700 hover:text-purple-500"
        }`;

    const getMobileLinkClass = (path) =>
        `block py-2 text-base ${
            pathname === path
                ? "text-purple-600 font-semibold"
                : "text-slate-700 hover:text-purple-500"
        }`;

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src={logo}
                            alt="QurbaniHat Logo"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <h2 className="text-xl md:text-2xl font-extrabold text-slate-800">
                            QurbaniHat
                        </h2>
                    </Link>

                    {/* Menu */}
                    <div className="hidden md:flex items-center gap-10">
                        <Link href="/" className={getLinkClass("/")}>
                            Home
                        </Link>
                        <Link href="/animals" className={getLinkClass("/animals")}>
                            All Animals
                        </Link>
                    </div>

                    {/* Auth */}
                    <div className="hidden md:flex items-center gap-4">
                        {isSessionLoading ? (
                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
                                <div className="w-20 h-9 bg-slate-200 rounded-lg animate-pulse" />
                            </div>
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <Link href="/my-profile">
                                     <Image
                                            src={user?.image || "/avatar.png"}
                                            alt="Profile"
                                            width={25}
                                            height={15}
                                            className="rounded-full border border-slate-200"
                                        />
                                </Link>

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium shadow-md hover:scale-105 transition-all"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">

                                {/* Login */}
                                <Link
                                    href="/login"
                                    className="px-5 py-2 rounded-xl border border-purple-300 text-purple-600 font-semibold hover:bg-purple-50 transition"
                                >
                                    Login
                                </Link>

                                {/* Register */}
                                <Link
                                    href="/register"
                                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 transition-all"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-2xl text-purple-500"
                        onClick={() => setOpen(!open)}
                    >
                        ☰
                    </button>
                </div>

                {/* Mobile */}
                {open && (
                    <div className="md:hidden pb-5 space-y-3">
                        <Link href="/" onClick={() => setOpen(false)} className={getMobileLinkClass("/")}>
                            Home
                        </Link>

                        <Link href="/animals" onClick={() => setOpen(false)} className={getMobileLinkClass("/animals")}>
                            All Animals
                        </Link>

                        <div className="pt-3 border-t border-slate-200">
                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm"
                                >
                                    Logout
                                </button>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link
                                        href="/login"
                                        className="px-4 py-2 rounded-xl border border-purple-300 text-purple-600 text-center"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/register"
                                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;