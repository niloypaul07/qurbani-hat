"use client";

import Image from "next/image";
import Link from "next/link";

const breeds = [
  {
    name: "Deshi Cow",
    origin: "Bangladesh",
    image: "https://images.pexels.com/photos/30264563/pexels-photo-30264563.jpeg",
  },
  {
    name: "Brahman",
    origin: "USA / India",
    image: "https://images.pexels.com/photos/13313742/pexels-photo-13313742.jpeg",
  },
  {
    name: "Sahiwal",
    origin: "Pakistan",
    image: "https://images.pexels.com/photos/7421867/pexels-photo-7421867.jpeg",
  },
  {
    name: "Black Bengal Goat",
    origin: "Bangladesh",
    image: "https://images.pexels.com/photos/20668461/pexels-photo-20668461.jpeg",
  },
];

const TopBreeds = () => {
  return (
    <section className="py-20 bg-[#faf7ff]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Top <span className="text-purple-600">Breeds</span>
          </h2>
          <p className="text-slate-600 mt-3 text-sm md:text-base">
            Explore the most popular and trusted Qurbani animal breeds
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {breeds.map((breed, index) => (
            <div
              key={index}
              className="group relative h-[320px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <Image
                src={breed.image}
                alt={breed.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 p-5 w-full">

                <h3 className="text-white text-lg font-bold">
                  {breed.name}
                </h3>

                <p className="text-slate-300 text-sm mb-3">
                  Origin: {breed.origin}
                </p>

                {/* Hidden Button (Hover Reveal) */}
                <Link href="/animals">
                  <button className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium shadow-md">
                    View Animals
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

export default TopBreeds;