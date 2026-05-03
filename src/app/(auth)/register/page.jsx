"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
        formState: { errors },
    } = useForm();

    const password = watch("password");

    // submit
    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            const { error } = await authClient.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
                image: data.photo,
            });

            if (!error) {
                setMsg("success");
                router.push("/login");
            } else {
                setMsg("error");
            }
        } catch {
            setMsg("error");
        } finally {
            setIsLoading(false);
        }
    };

    // Google login
    const handleGoogle = async () => {
        setGoogleLoading(true);
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    const inputStyle =
        "w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-purple-400 outline-none";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-4">

            {/* CARD */}
            <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden">

                {/* LEFT SIDE */}
                <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br  from-purple-600 to-pink-500 text-white">
                    <h1 className="text-3xl font-bold">Join QurbaniHat</h1>
                    <p className="mt-3 text-sm text-white/80">
                        Buy and book livestock easily for Qurbani season with trusted sellers.
                    </p>

                    <div className="mt-6 space-y-2 text-sm text-white/90">
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
                                {...register("name", { required: true })}
                                placeholder="Full Name"
                                className={inputStyle}
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-purple-500" size={16} />
                            <input
                                {...register("email", { required: true })}
                                placeholder="Email"
                                className={inputStyle}
                            />
                        </div>

                        {/* IMAGE */}
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-3 text-purple-500" size={16} />
                            <input
                                {...register("photo")}
                                placeholder="Photo URL"
                                className={inputStyle}
                            />
                        </div>

                        {/* PASSWORD */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-purple-500" size={16} />
                            <input
                                type={showPass ? "text" : "password"}
                                {...register("password")}
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
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-purple-500" size={16} />
                            <input
                                type={showConfirm ? "text" : "password"}
                                {...register("confirmPassword")}
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
                        </div>

                        {/* SUBMIT */}
                        <button
                            disabled={isLoading}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r  from-purple-600 to-pink-500 text-white font-semibold flex items-center justify-center gap-2"
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

                    {/* GOOGLE BUTTON */}
                    <button
                        onClick={handleGoogle}
                        className="w-full py-2.5 border border-slate-200 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition"
                    >
                        {/* GOOGLE ICON */}
                        <svg width="18" height="18" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.6 20.5H24v8h11.3C33.8 32.1 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.4 5.1 29.5 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.3-.4-3.5z"/>
                        </svg>

                        Continue with Google
                    </button>

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