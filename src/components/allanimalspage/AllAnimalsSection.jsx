"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Calendar, Weight, Eye } from "lucide-react";

const AllAnimalsSection = () => {
    const [animals, setAnimals] = useState([]);
    const [filteredAnimals, setFilteredAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await fetch('/allanimals.json');
                const data = await response.json();
                setAnimals(data);
                setFilteredAnimals(data);
            } catch (error) {
                console.error("Error loading animals:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnimals();

        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        let result = [...animals];

        if (searchTerm) {
            result = result.filter(animal =>
                animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                animal.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedType !== "all") {
            result = result.filter(animal => animal.type === selectedType);
        }

        if (sortBy === "price-low") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            result.sort((a, b) => b.price - a.price);
        }

        setFilteredAnimals(result);
    }, [searchTerm, selectedType, sortBy, animals]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US').format(price);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">

            <div className="pt-12 pb-4">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h1 className="text-3xl font-bold text-white text-center">
                        All Animals for <span className="text-emerald-400">Qurbani</span>
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">

                <div className="mt-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Search by name or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />

                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="all">All Types</option>
                            <option value="Cow">Cows</option>
                            <option value="Goat">Goats</option>
                            <option value="Sheep">Sheep</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="default">Sort by: Default</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-slate-400 text-sm">
                        Showing <span className="text-emerald-400 font-semibold">{filteredAnimals.length}</span> animals
                    </p>
                </div>

                {filteredAnimals.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-slate-800">
                        <p className="text-slate-400">No animals found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredAnimals.map((animal) => (
                            <div key={animal.id} className="group bg-slate-900 rounded-xl overflow-hidden border border-black hover:border-black transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">

                                <div className="relative h-48 overflow-hidden bg-slate-800">
                                    <img
                                        src={animal.image}
                                        alt={animal.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 left-2">
                                        <span className="px-2 py-0.5 rounded-full bg-black/70 text-white text-xs">
                                            {animal.type}
                                        </span>
                                    </div>
                                    <div className="absolute top-2 right-2">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${animal.category === "Large Animal"
                                            ? "bg-red-500/80 text-white"
                                            : animal.category === "Medium Animal"
                                                ? "bg-amber-500/80 text-white"
                                                : "bg-emerald-500/80 text-white"
                                            }`}>
                                            {animal.category === "Large Animal" ? "Large" : animal.category === "Medium Animal" ? "Medium" : "Small"}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-3">
                                    <h3 className="text-base font-bold text-white mb-1 truncate">
                                        {animal.name}
                                    </h3>

                                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                                        <MapPin size={11} />
                                        <span>{animal.location}</span>
                                        <Calendar size={11} className="ml-1" />
                                        <span>{animal.age}y</span>
                                        <Weight size={11} className="ml-1" />
                                        <span>{animal.weight}kg</span>
                                    </div>

                                    <div className="text-emerald-400 font-bold text-base mb-3">
                                        BDT {formatPrice(animal.price)}
                                    </div>

                                    <Link href={`/details-page/${animal.id}`}>
                                        <button className="w-full flex items-center justify-center gap-2 py-1.5 bg-slate-800 hover:bg-emerald-500 rounded-lg text-white text-sm transition-all duration-300">
                                            <Eye size={13} />
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="h-12"></div>
            </div>
        </div>
    );
};

export default AllAnimalsSection;