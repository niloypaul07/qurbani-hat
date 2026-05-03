"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [googleError, setGoogleError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const emailTimeoutRef = useRef(null);
    const googleTimeoutRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        return () => {
            if (emailTimeoutRef.current) clearTimeout(emailTimeoutRef.current);
            if (googleTimeoutRef.current) clearTimeout(googleTimeoutRef.current);
        };
    }, []);

    const onSubmit = async (data) => {
        setEmailError("");
        setIsLoading(true);

        emailTimeoutRef.current = setTimeout(() => {
            if (isLoading) {
                setIsLoading(false);
                setEmailError("Something went wrong! Try again.");
                setTimeout(() => setEmailError(""), 3000);
            }
        }, 7000);

        try {
            const { error } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            clearTimeout(emailTimeoutRef.current);

            if (!error) router.push("/");
            else {
                setEmailError("Invalid email or password!");
                setTimeout(() => setEmailError(""), 3000);
            }
        } catch (err) {
            setEmailError("Network error!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleError("");
        setGoogleLoading(true);

        googleTimeoutRef.current = setTimeout(() => {
            setGoogleLoading(false);
            setGoogleError("Something went wrong!");
            setTimeout(() => setGoogleError(""), 3000);
        }, 7000);

        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            clearTimeout(googleTimeoutRef.current);
        } catch (err) {
            setGoogleError("Google login failed!");
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">

            {/* Background glow (like footer style) */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-300/30 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-300/30 blur-[120px]" />

            {/* Card */}
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold bg-linear-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Login to continue QurbaniHat
                    </p>
                </div>

                {/* Error */}
                {(emailError || googleError) && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                        {emailError || googleError}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            {...register("email", { required: true })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-400 outline-none"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">Email required</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...register("password", { required: true })}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-400 outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-slate-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>

                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">Password required</p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl text-white font-semibold bg-linear-to-r from-purple-600 via-pink-500 to-indigo-600 hover:opacity-90 transition"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-5 flex items-center gap-3">
                    <hr className="flex-1 border-slate-300" />
                    <span className="text-xs text-slate-400">OR</span>
                    <hr className="flex-1 border-slate-300" />
                </div>

                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}
                    className="w-full py-3 rounded-xl border border-slate-300 flex items-center justify-center gap-2 hover:bg-slate-50 transition"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6c-.3 1.6-1.3 3-2.8 3.9v3.3h4.5c2.6-2.4 4.1-6 4.1-9.3z" />
                        <path fill="#34A853" d="M12 23c3.2 0 5.9-1 7.9-2.8l-4.5-3.3c-1.2.8-2.7 1.3-4.4 1.3-3.4 0-6.3-2.3-7.3-5.4H-.1v3.4C1.9 20.6 6.6 23 12 23z" />
                        <path fill="#FBBC05" d="M4.7 14.8c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.8H.1C-.7 8.5-1 10.2-1 12s.3 3.5 1.1 5.2l4.6-2.4z" />
                        <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.3 15.2 0 12 0 6.6 0 1.9 2.4-.1 6.8l4.6 3.4C5.7 7.1 8.6 4.8 12 4.8z" />
                    </svg>

                    {googleLoading ? "Please wait..." : "Continue with Google"}
                </button>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-5">
                    Don’t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-purple-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;