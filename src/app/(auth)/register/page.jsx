"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    User,
    Mail,
    Image as ImageIcon,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    CheckCircle,
    AlertCircle
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
    const router = useRouter();

    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
    });

    const password = watch("password");

    // REGISTER
    const onSubmit = async (data) => {
        setIsLoading(true);
        setMsg("");

        try {
            const { error } = await authClient.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
                image: data.photo,
            });

            if (!error) {
                setMsg("success");
                setTimeout(() => router.push("/login"), 1200);
            } else {
                setMsg("error");
            }
        } catch {
            setMsg("error");
        } finally {
            setIsLoading(false);
        }
    };

    // GOOGLE LOGIN
    const handleGoogle = async () => {
        setGoogleLoading(true);
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch {
            setGoogleLoading(false);
        }
    };

    const inputStyle =
        "w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-purple-400 outline-none";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-4">

            <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden">

                {/* LEFT SIDE */}
                <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-purple-600 to-pink-500 text-white">
                    <h1 className="text-3xl font-bold">Join QurbaniHat</h1>
                    <p className="mt-3 text-sm text-white/80">
                        Buy and book livestock easily for Qurbani season.
                    </p>

                    <div className="mt-6 space-y-2 text-sm">
                        <p>✔ Verified Animals</p>
                        <p>✔ Secure Booking</p>
                        <p>✔ Fast Support</p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="p-8">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Create Account
                    </h2>

                    <p className="text-sm text-slate-500 mb-6">
                        Start your journey today
                    </p>

                    {/* MESSAGE */}
                    {msg === "success" && (
                        <p className="text-green-600 text-sm flex items-center gap-2">
                            <CheckCircle size={16} /> Account created successfully
                        </p>
                    )}

                    {msg === "error" && (
                        <p className="text-red-500 text-sm flex items-center gap-2">
                            <AlertCircle size={16} /> Something went wrong
                        </p>
                    )}

                    {/* FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">

                        {/* NAME */}
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-purple-500" size={16} />
                            <input
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Minimum 2 characters required",
                                    },
                                })}
                                placeholder="Full Name"
                                className={inputStyle}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* EMAIL */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-purple-500" size={16} />
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Invalid email format",
                                    },
                                })}
                                placeholder="Email"
                                className={inputStyle}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* PHOTO */}
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-3 text-purple-500" size={16} />
                            <input
                                {...register("photo", {
                                    pattern: {
                                        value: /^https?:\/\/.*\.(jpg|jpeg|png|webp)$/i,
                                        message: "Enter valid image URL",
                                    },
                                })}
                                placeholder="Photo URL"
                                className={inputStyle}
                            />
                            {errors.photo && (
                                <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-purple-500" size={16} />
                            <input
                                type={showPass ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters required",
                                    },
                                })}
                                placeholder="Password"
                                className={inputStyle}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-3 text-slate-400"
                            >
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>

                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-purple-500" size={16} />
                            <input
                                type={showConfirm ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: "Confirm password required",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                                placeholder="Confirm Password"
                                className={inputStyle}
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-3 text-slate-400"
                            >
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>

                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* SUBMIT */}
                        <button
                            disabled={isLoading || !isValid}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={16} />
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/* DIVIDER */}
                    <div className="flex items-center my-5">
                        <hr className="flex-grow border-slate-200" />
                        <span className="mx-3 text-xs text-slate-400">OR</span>
                        <hr className="flex-grow border-slate-200" />
                    </div>

                    {/* GOOGLE LOGIN */}
                    <button
                        type="button"
                        onClick={handleGoogle}
                        disabled={googleLoading}
                        className="w-full py-2.5 border border-slate-200 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition font-medium text-slate-700 disabled:opacity-60"
                    >
                        {googleLoading ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            <>
                                {/* Google Icon */}
                                <svg width="18" height="18" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.6 20.5H24v8h11.3C33.8 32.1 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.4 5.1 29.5 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.3-.4-3.5z"/>
                                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.2 18.9 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.4 5.1 29.5 3 24 3 16.3 3 9.5 7.4 6.3 14.7z"/>
                                    <path fill="#4CAF50" d="M24 43c5.4 0 10.4-2 14.2-5.3l-6.6-5.4C29.5 34.6 27 35.5 24 35.5c-5.1 0-9.5-3.2-11.1-7.6l-6.6 5.1C9.5 38.6 16.3 43 24 43z"/>
                                    <path fill="#1976D2" d="M43.6 20.5H24v8h11.3c-1.1 3.3-3.7 6-7.3 7.2l6.6 5.4C41.8 36.6 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"/>
                                </svg>

                                Continue with Google
                            </>
                        )}
                    </button>

                    {/* LOGIN LINK */}
                    <p className="text-center text-sm mt-5 text-slate-500">
                        Already have account?{" "}
                        <Link href="/login" className="text-purple-600 font-medium">
                            Login
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default RegisterPage;