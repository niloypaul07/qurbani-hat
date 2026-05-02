"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Calendar, Weight, ArrowLeft, User, Mail, Phone, Map, CheckCircle, X, Loader2 } from "lucide-react";

const AnimalDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const response = await fetch("/allanimals.json");
                const data = await response.json();
                const foundAnimal = data.find(a => a.id === parseInt(id));

                if (foundAnimal) {
                    setAnimal(foundAnimal);
                } else {
                    router.push("/animals");
                }
            } catch (error) {
                console.error("Error loading animal:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimal();
    }, [id, router]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-US").format(price);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) errors.name = "Name is required";

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (!formData.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (!/^[0-9]{11}$/.test(formData.phone)) {
            errors.phone = "Phone must be 11 digits";
        }

        if (!formData.address.trim()) errors.address = "Address is required";

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        setShowSuccess(true);

        setFormData({
            name: "",
            email: "",
            phone: "",
            address: ""
        });

        setSubmitting(false);

        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading animal details...</p>
                </div>
            </div>
        );
    }

    if (!animal) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-6 px-4">

            {showSuccess && (
                <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right-5 fade-in duration-300">
                    <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/50 rounded-xl p-4 flex items-center gap-3 shadow-2xl">
                        <CheckCircle className="text-emerald-400" size={20} />

                        <div>
                            <p className="text-emerald-400 font-semibold text-sm">
                                Booking Successful!
                            </p>
                            <p className="text-slate-300 text-xs">
                                Your booking request has been sent.
                            </p>
                        </div>

                        <button
                            onClick={() => setShowSuccess(false)}
                            className="text-slate-400 hover:text-white transition"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">

                <Link
                    href="/animals"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition group text-sm mt-6"
                >
                    <ArrowLeft
                        size={18}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    <span>Back to All Animals</span>
                </Link>

                <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">

                    <div className="grid md:grid-cols-2 gap-8 p-6">

                        <div className="space-y-5">

                            <div className="relative rounded-xl overflow-hidden bg-slate-800">
                                <img
                                    src={animal.image}
                                    alt={animal.name}
                                    className="w-full h-[320px] md:h-[360px] object-cover rounded-xl"
                                />

                                <div className="absolute top-3 left-3">
                                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
                                        {animal.type}
                                    </span>
                                </div>

                                <div className="absolute top-3 right-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${animal.category === "Large Animal"
                                            ? "bg-red-500/80 text-white"
                                            : animal.category === "Medium Animal"
                                                ? "bg-amber-500/80 text-white"
                                                : "bg-emerald-500/80 text-white"
                                            }`}
                                    >
                                        {animal.category === "Large Animal"
                                            ? "Large"
                                            : animal.category === "Medium Animal"
                                                ? "Medium"
                                                : "Small"}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                                    <MapPin
                                        size={18}
                                        className="text-emerald-400 mx-auto mb-1"
                                    />
                                    <p className="text-white text-sm font-medium truncate">
                                        {animal.location}
                                    </p>
                                    <p className="text-slate-500 text-xs">
                                        Location
                                    </p>
                                </div>

                                <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                                    <Calendar
                                        size={18}
                                        className="text-emerald-400 mx-auto mb-1"
                                    />
                                    <p className="text-white text-sm font-medium">
                                        {animal.age} years
                                    </p>
                                    <p className="text-slate-500 text-xs">
                                        Age
                                    </p>
                                </div>

                                <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                                    <Weight
                                        size={18}
                                        className="text-emerald-400 mx-auto mb-1"
                                    />
                                    <p className="text-white text-sm font-medium">
                                        {animal.weight} kg
                                    </p>
                                    <p className="text-slate-500 text-xs">
                                        Weight
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">

                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                    {animal.name}
                                </h1>
                                <p className="text-emerald-400 text-sm mb-3">
                                    {animal.breed}
                                </p>
                                <div className="text-emerald-400 font-bold text-2xl mb-4">
                                    BDT {formatPrice(animal.price)}
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    {animal.description}
                                </p>
                            </div>

                            <div className="border-t border-slate-700/50 my-4"></div>

                            <div>
                                <h2 className="text-lg font-bold text-white mb-3">
                                    Book This Animal
                                </h2>
                                <p className="text-slate-400 text-xs mb-4">
                                    Fill out the form below to request booking
                                </p>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >

                                    <div>
                                        <div className="relative">
                                            <User
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your Full Name"
                                                className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-slate-950/50 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>

                                        {formErrors.name && (
                                            <p className="text-red-400 text-xs mt-1">
                                                {formErrors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <div className="relative">
                                            <Mail
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Your Email Address"
                                                className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-slate-950/50 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>

                                        {formErrors.email && (
                                            <p className="text-red-400 text-xs mt-1">
                                                {formErrors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <div className="relative">
                                            <Phone
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Your Phone Number (11 digits)"
                                                className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-slate-950/50 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>

                                        {formErrors.phone && (
                                            <p className="text-red-400 text-xs mt-1">
                                                {formErrors.phone}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <div className="relative">
                                            <Map
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="Your Full Address"
                                                className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-slate-950/50 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>

                                        {formErrors.address && (
                                            <p className="text-red-400 text-xs mt-1">
                                                {formErrors.address}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2
                                                    size={18}
                                                    className="animate-spin"
                                                />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle size={18} />
                                                Confirm Booking
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimalDetailsPage;