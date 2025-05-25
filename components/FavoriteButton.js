"use client";
import { useState, useEffect, useTransition } from "react";

export default function FavoriteButton({ id, name, image, genres = [] }) {
    const [saved, setSaved] = useState(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const alreadySaved = storedFavorites.some((fav) => fav.id === id);
        setSaved(alreadySaved);
    }, [id]);

    async function dodajFavorita() {
        startTransition(async () => {
            const res = await fetch("/api/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, name, image, genres }),
            });

            if (res.ok) {
                const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
                const updatedFavorites = [...storedFavorites, { id, name, image, genres }];
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                setSaved(true);
            }
        });
    }

    return (
        <button
            disabled={saved || isPending}
            onClick={dodajFavorita}
            className={`mt-2 text-xs px-3 py-1 rounded-md border border-gray-300 
                        ${saved ? "bg-green-100 text-green-800" : "bg-white text-gray-700 hover:bg-gray-100"}
                        transition-colors duration-200`}
        >
            {saved ? "✔ Spremljeno" : isPending ? "⏳ Spremam..." : "⭐ Dodaj u favorite"}
        </button>
    );
}
