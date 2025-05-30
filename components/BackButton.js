"use client"; // Oznaka da je komponenta klijentska (potrebna za korištenje hookova kao što je useRouter)

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();  // Dohvaća router objekt za navigaciju

    function handleClick() {
        router.back();  // Vraća korisnika na prethodnu stranicu (kao browserov back)
    }

    return (
        <button
            onClick={handleClick}
            className="w-full text-left bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md transition-colors"
        >
            ↩ Back
        </button>
    );
}
