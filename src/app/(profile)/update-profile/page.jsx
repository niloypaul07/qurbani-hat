"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import {
    User,
    Image as ImageIcon,
    Save,
    X,
    ArrowLeft,
    Loader2,
    Edit3,
    CheckCircle,
    AlertCircle
} from "lucide-react";

const UpdateProfilePage = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const [oldName, setOldName] = useState("");
    const [oldImage, setOldImage] = useState("");

    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const [isValidImage, setIsValidImage] = useState(false);
    const [isCheckingImage, setIsCheckingImage] = useState(false);
    const [imageError, setImageError] = useState("");

    useEffect(() => {
        const getSession = async () => {
            const { data: session } = await authClient.getSession();

            if (!session?.user) {
                router.push("/login");
                return;
            }

            setName(session.user.name || "");
            setImage(session.user.image || "");
            setOldName(session.user.name || "");
            setOldImage(session.user.image || "");

            setLoading(false);
        };

        getSession();
    }, [router]);

    const handleSave = async () => {
        setSaving(true);
        setMessage("");

        try {
            await authClient.updateUser({
                name,
                image: image || null,
            });

            setOldName(name);
            setOldImage(image);
            setEditMode(false);

            setMessage("Profile updated successfully!");
            setTimeout(() => setMessage(""), 2500);
        } catch (error) {
            setMessage("Update failed!");
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setName(oldName);
        setImage(oldImage);
        setEditMode(false);
        setMessage("");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="animate-spin text-pink-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">

            {/* TOP GRADIENT BAR */}
            <div className="h-2 w-full bg-gradient-to-r from-purple-600 to-pink-500"></div>

            <div className="max-w-2xl mx-auto px-4 py-10">

                {/* BACK */}
                <Link
                    href="/my-profile"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-pink-600 mb-6"
                >
                    <ArrowLeft size={18} />
                    Back
                </Link>

                {/* CARD */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">

                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white text-center">
                        <h1 className="text-xl font-bold">Update Profile</h1>
                        <p className="text-sm opacity-90">Edit your account information</p>
                    </div>

                    <div className="p-6 space-y-5">

                        {/* IMAGE PREVIEW */}
                        <div className="flex flex-col items-center">
                            <img
                                src={image || "/avatar.png"}
                                className="w-24 h-24 rounded-full border-4 border-pink-200 object-cover"
                            />
                            <p className="mt-2 font-semibold text-slate-700">
                                {name || "Your Name"}
                            </p>
                        </div>

                        {/* NAME */}
                        <div>
                            <label className="text-sm text-slate-600">Full Name</label>
                            <div className="relative mt-1">
                                <User className="absolute left-3 top-3 text-slate-400" size={16} />
                                <input
                                    value={name}
                                    disabled={!editMode}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-3 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                                />
                            </div>
                        </div>

                        {/* IMAGE */}
                        <div>
                            <label className="text-sm text-slate-600">Image URL</label>
                            <div className="relative mt-1">
                                <ImageIcon className="absolute left-3 top-3 text-slate-400" size={16} />
                                <input
                                    value={image}
                                    disabled={!editMode}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full pl-10 pr-3 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
                                />
                            </div>
                        </div>

                        {/* MESSAGE */}
                        {message && (
                            <p className="text-center text-sm text-emerald-600">
                                {message}
                            </p>
                        )}

                        {/* BUTTONS */}
                        {!editMode ? (
                            <button
                                onClick={() => setEditMode(true)}
                                className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 flex items-center justify-center gap-2"
                            >
                                <Edit3 size={16} />
                                Edit Profile
                            </button>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">

                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center gap-2"
                                >
                                    {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                    Save
                                </button>

                                <button
                                    onClick={handleCancel}
                                    className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-2"
                                >
                                    <X size={16} />
                                    Cancel
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfilePage;