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
    const [msg, setMsg] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange", // IMPORTANT → real-time validation
    });

    const password = watch("password");

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

    const inputStyle =
        "w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-purple-400 outline-none";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-4">

            <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden">

                {/* LEFT */}
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

                {/* RIGHT */}
                <div className="p-8">

                    <h2 className="text-2xl font-bold text-slate-800">
                        Create Account
                    </h2>

                    <p className="text-sm text-slate-500 mb-6">
                        Start your journey today
                    </p>

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

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">

                        {/* NAME */}
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-purple-500" size={16} />
                            <input
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters",
                                    },
                                })}
                                placeholder="Full Name"
                                className={inputStyle}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.name.message}
                                </p>
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
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email.message}
                                </p>
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
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.photo.message}
                                </p>
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
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password.message}
                                </p>
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

                    {/* LOGIN */}
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