/**
 * Gumb za dodavanje serije u favorite.
 * Prikazuje status (spremljeno / spremanje) i deaktivira se kad je već spremljeno.
 */

"use client";
import { useState, useEffect, useTransition } from "react";

export default function FavoriteButton({ id, name, image, genres, initialSaved = false }) {
    const [saved, setSaved] = useState(initialSaved);
    const [isPending, startTransition] = useTransition();

    // Ako show nije već označen kao spremljen, provjeravamo je li u favoritima (GET)
    useEffect(() => {
        if (initialSaved) return;

        fetch("/api/favorites")
            .then((res) => res.json())
            .then((data) => {
                if (data.find((fav) => fav.id === id)) {
                    setSaved(true);
                }
            });
    }, [initialSaved, id]);

    // Dodavanje u favorite (POST na /api/favorites)

    function dodajFavorita() {
        startTransition(async () => {
            const res = await fetch("/api/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, name, image, genres })
            });

            if (res.ok) setSaved(true);
        });
    }

    return (
        <button
            disabled={saved || isPending}
            onClick={dodajFavorita}
            className={`mt-3 px-3 py-1 rounded text-white transition-colors ${saved ? "bg-green-600" : "bg-amber-500 hover:bg-amber-600"
                }`}
        >
            {saved ? "Spremljen!" : isPending ? "Spremam..." : "Dodaj u favorite"}
        </button>
    );
}
