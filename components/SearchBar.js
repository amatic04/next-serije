"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState(""); // Lokalno stanje za unos korisnika
    const router = useRouter();  // Omogućava navigaciju programatski

    function handleSubmit(e) {
        e.preventDefault();  // Sprječava reload forme
        if (!query.trim()) return;  // Ako je unos prazan, ne traži
        router.push(`/search?q=${encodeURIComponent(query)}`);  // Preusmjeri na search stranicu s query parametrom
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pretraži serije..."
                className="px-3 py-2 border rounded-md w-full text-black"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Traži
            </button>
        </form>
    );
}
