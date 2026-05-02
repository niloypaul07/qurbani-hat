"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Calendar, Weight, Eye } from "lucide-react";

const FeaturedAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await fetch('/allanimals.json');
                const data = await response.json();

                const cows = data.filter(a => a.type === "Cow").slice(0, 2);
                const goats = data.filter(a => a.type === "Goat").slice(0, 1);
                const sheeps = data.filter(a => a.type === "Sheep").slice(0, 1);

                setAnimals([...cows, ...goats, ...sheeps]);
            } catch (error) {
                console.error("Error loading animals:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnimals();
    }, []);

    const formatPrice = (price) =>
        new Intl.NumberFormat('en-US').format(price);

    if (loading) {
        return (
            <div className="py-16 flex justify-center">
                <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <section className="py-20 bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#000000] text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 backdrop-blur-md rounded-full px-5 py-1.5 mb-5">
                        <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse"></span>
                        <span className="text-xs text-purple-300 font-medium">
                            Premium Collection
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold">
                        Featured{" "}
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                            Animals
                        </span>
                    </h2>

                    <p className="text-gray-400 text-sm mt-3">
                        Handpicked high-quality animals for your Qurbani
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {animals.map((animal) => (
                        <div
                            key={animal.id}
                            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.03] transition-all duration-500 shadow-lg hover:shadow-purple-500/20"
                        >

                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={animal.image}
                                    alt={animal.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Type Badge */}
                                <span className="absolute top-3 left-3 px-3 py-1 text-xs rounded-full bg-black/60 backdrop-blur text-white">
                                    {animal.type}
                                </span>

                                {/* Category Badge */}
                                <span className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full font-medium backdrop-blur
                                    ${animal.category === "Large Animal"
                                        ? "bg-pink-500/80"
                                        : animal.category === "Medium Animal"
                                            ? "bg-indigo-500/80"
                                            : "bg-purple-500/80"
                                    } text-white`}>
                                    {animal.category === "Large Animal"
                                        ? "Large"
                                        : animal.category === "Medium Animal"
                                            ? "Medium"
                                            : "Small"}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold mb-2 truncate">
                                    {animal.name}
                                </h3>

                                <div className="flex flex-wrap items-center gap-2 text-gray-400 text-xs mb-3">
                                    <MapPin size={12} />
                                    <span>{animal.location}</span>

                                    <Calendar size={12} />
                                    <span>{animal.age}y</span>

                                    <Weight size={12} />
                                    <span>{animal.weight}kg</span>
                                </div>

                                {/* Price */}
                                <div className="text-xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    ৳ {formatPrice(animal.price)}
                                </div>

                                {/* Button */}
                                <Link href={`/details-page/${animal.id}`}>
                                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white text-sm font-semibold shadow-lg hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300">
                                        <Eye size={15} />
                                        View Details
                                    </button>
                                </Link>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedAnimals;