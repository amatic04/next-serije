"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("favorites");
        if (saved) {
            setFavorites(JSON.parse(saved));
        }
    }, []);

    function removeFavorite(id) {
        const updatedFavorites = favorites.filter((fav) => fav.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }

    if (favorites.length === 0) {
        return <div className="p-6">Nema spremljenih favorita.</div>;
    }

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-6">⭐ Favoriti</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {favorites.map((show) => (
                    <div key={show.id} className="bg-white shadow rounded-xl p-4 relative">
                        <button
                            onClick={() => removeFavorite(show.id)}
                            className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
                            title="Ukloni iz favorita"
                        >
                            ✖
                        </button>
                        <Link href={`/show/${show.id}`}>
                            <div className="cursor-pointer">
                                {show.image?.medium && (
                                    <Image
                                        src={show.image.medium}
                                        alt={show.name}
                                        width={210}
                                        height={295}
                                        className="rounded"
                                    />
                                )}
                                <h2 className="mt-2 font-semibold text-lg">{show.name}</h2>
                                <p className="text-sm text-gray-600">
                                    {show.genres?.join(", ") || "Bez žanra"}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}
