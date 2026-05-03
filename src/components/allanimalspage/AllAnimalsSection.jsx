"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Calendar, Weight, Eye } from "lucide-react";
import { GiAges } from "react-icons/gi";

const AllAnimalsSection = () => {
    const [animals, setAnimals] = useState([]);
    const [filteredAnimals, setFilteredAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const res = await fetch("/allanimals.json");
                const data = await res.json();
                setAnimals(data);
                setFilteredAnimals(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimals();
    }, []);

    useEffect(() => {
        let result = [...animals];

        if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
        if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);

        setFilteredAnimals(result);
    }, [sortBy, animals]);

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-US").format(price);

    if (loading) {
        return (
            <div className="py-20 flex justify-center bg-white">
                <div className="h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <section className="py-20 bg-[#faf7ff]">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                        All Animals for <span className="text-purple-600">Qurbani Hat</span>
                    </h1>
                    <p className="text-slate-600 text-sm mt-2">
                        Choose your perfect sacrificial animal
                    </p>
                </div>

                {/* Sort */}
                <div className="mb-8 flex justify-start">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        <option value="default">Sort by Default</option>
                        <option value="price-low">Price Low → High</option>
                        <option value="price-high">Price High → Low</option>
                    </select>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {filteredAnimals.map((animal) => (
                        <div
                            key={animal.id}
                            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                        >

                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={animal.image}
                                    alt={animal.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />

                                {/* Category Badge */}
                                <span className="absolute top-3 right-3 px-3 py-1 text-xs rounded-full bg-purple-500 text-white shadow">
                                    {animal.category === "Large Animal"
                                        ? "Large"
                                        : animal.category === "Medium Animal"
                                            ? "Medium"
                                            : "Small"}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-5">

                                {/* Name */}
                                <h3 className="text-lg font-bold text-slate-800 mb-1 truncate">
                                    {animal.name}
                                </h3>

                                {/* Type Badge */}
                                <h1 className="inline-block px-3 py-1 mb-3 text-xs rounded-full bg-slate-100 text-slate-700 shadow-sm">
                                    {animal.type}
                                </h1>

                                {/* Info */}
                                <div className="flex flex-wrap items-center gap-2 text-slate-500 text-xs mb-3">
                                    <MapPin size={12} />
                                    <span>{animal.location}</span>

                                    <Weight size={12} />
                                    <span>{animal.weight}kg</span>

                                    <GiAges size={12} />
                                    <span>{animal.age}y</span>
                                </div>

                                {/* Price */}
                                <div className="text-lg font-bold text-purple-600 mb-4">
                                    ৳ {formatPrice(animal.price)}
                                </div>

                                {/* Button */}
                                <Link href={`/details-page/${animal.id}`}>
                                    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:scale-105 transition-all">
                                        <Eye size={15} />
                                        View Details
                                    </button>
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllAnimalsSection;