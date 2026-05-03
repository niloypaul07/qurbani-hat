"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    MapPin,
    Calendar,
    Weight,
    ArrowLeft,
    User,
    Mail,
    Phone,
    Map,
    CheckCircle,
    X,
    Loader2
} from "lucide-react";

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
                const res = await fetch("/allanimals.json");
                const data = await res.json();
                const found = data.find(a => a.id === parseInt(id));

                if (found) setAnimal(found);
                else router.push("/animals");
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimal();
    }, [id, router]);

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-US").format(price);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setFormErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };

    const validate = () => {
        const err = {};

        if (!formData.name) err.name = "Required";
        if (!formData.email) err.email = "Required";
        if (!formData.phone) err.phone = "Required";
        if (!formData.address) err.address = "Required";

        setFormErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);

        await new Promise(res => setTimeout(res, 1800));

        setShowSuccess(true);
        setSubmitting(false);

        setFormData({
            name: "",
            email: "",
            phone: "",
            address: ""
        });

        setTimeout(() => setShowSuccess(false), 3000);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f7f7ff]">
                <Loader2 className="animate-spin text-purple-500" />
            </div>
        );
    }

    if (!animal) return null;

    return (
        <div className="min-h-screen bg-[#f7f7ff] py-10 px-4">

            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed top-6 right-6 bg-white border border-green-200 shadow-xl rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle className="text-pink-500" />
                    <div>
                        <p className="text-sm font-semibold text-purple-600">
                            Booking Successful
                        </p>
                        <p className="text-xs text-slate-500">
                            We received your request
                        </p>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">

                {/* Back */}
                <Link href="/animals" className="flex items-center gap-2 text-slate-600 mb-6">
                    <ArrowLeft size={18} />
                    Back to Animals
                </Link>

                {/* MAIN CARD */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2 gap-8 p-6">

                    {/* LEFT SIDE */}
                    <div>

                        {/* IMAGE */}
                        <div className="relative rounded-2xl overflow-hidden">
                            <img
                                src={animal.image}
                                alt={animal.name}
                                className="w-full h-[360px] object-cover"
                            />

                            <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                                {animal.type}
                            </span>

                            <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                                {animal.category}
                            </span>
                        </div>

                        {/* INFO CARDS */}
                        <div className="grid grid-cols-3 gap-3 mt-5">

                            <div className="bg-purple-50 rounded-xl p-3 text-center">
                                <MapPin className="mx-auto text-purple-500" size={18} />
                                <p className="text-sm font-medium mt-1">{animal.location}</p>
                            </div>

                            <div className="bg-pink-50 rounded-xl p-3 text-center">
                                <Calendar className="mx-auto text-pink-500" size={18} />
                                <p className="text-sm font-medium mt-1">{animal.age}y</p>
                            </div>

                            <div className="bg-indigo-50 rounded-xl p-3 text-center">
                                <Weight className="mx-auto text-indigo-500" size={18} />
                                <p className="text-sm font-medium mt-1">{animal.weight}kg</p>
                            </div>

                        </div>

                        {/* DETAILS */}
                        <div className="mt-6">
                            <h1 className="text-2xl font-bold">{animal.name}</h1>
                            <p className="text-slate-500 text-sm mt-1">{animal.breed}</p>

                            <div className="text-2xl font-extrabold text-purple-600 mt-3">
                                ৳ {formatPrice(animal.price)}
                            </div>

                            <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                                {animal.description}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE - FORM */}
                    <div className="bg-[#faf7ff] rounded-2xl p-6">

                        <h2 className="text-xl font-bold mb-4">
                            Book This Animal
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {[
                                { name: "name", icon: User, placeholder: "Full Name" },
                                { name: "email", icon: Mail, placeholder: "Email" },
                                { name: "phone", icon: Phone, placeholder: "Phone" },
                                { name: "address", icon: Map, placeholder: "Address" }
                            ].map(({ name, icon: Icon, placeholder }) => (
                                <div key={name}>
                                    <div className="relative">
                                        <Icon className="absolute left-3 top-3 text-slate-400" size={18} />
                                        <input
                                            name={name}
                                            value={formData[name]}
                                            onChange={handleChange}
                                            placeholder={placeholder}
                                            className="w-full pl-10 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 outline-none bg-white"
                                        />
                                    </div>

                                    {formErrors[name] && (
                                        <p className="text-red-500 text-xs mt-1">
                                            Required
                                        </p>
                                    )}
                                </div>
                            ))}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition"
                            >
                                {submitting ? "Processing..." : "Confirm Booking"}
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AnimalDetailsPage;