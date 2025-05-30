/**
 * Layout za prikaz detalja o pojedinoj seriji.
 * Uključuje bočnu navigaciju između sekcija (epizode, glumci, favoriti).
 */

import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function ShowLayout({ children, params }) {
    const { id } = params;

    return (
        <div className="min-h-screen flex">
            {/* Bočna traka */}
            <aside className="w-[200px] bg-slate-200 border-r border-gray-400 p-4 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Navigacija</h2>


                {/* linkovi */}
                <div className="flex flex-col gap-2 text-sm text-gray-700">

                    <Link
                        href="/"
                        className="block px-3 py-2 rounded-md bg-white hover:bg-slate-200 transition-colors"
                    >
                        🏠 Početna
                    </Link>

                    <Link
                        href={`/show/${id}/episodes`}
                        className="px-3 py-2 rounded-md bg-white hover:bg-slate-200 transition-colors"
                    >
                        📺 Epizode
                    </Link>

                    <Link
                        href={`/show/${id}/cast`}
                        className="px-3 py-2 rounded-md bg-white hover:bg-slate-200 transition-colors"
                    >
                        🎭 Glumci
                    </Link>

                    <Link
                        href="/favorites"
                        className="px-3 py-2 rounded-md bg-white hover:bg-slate-200 transition-colors"
                    >
                        ⭐ Favoriti
                    </Link>
                    <BackButton />
                </div>
            </aside>

            {/* Glavni sadržaj */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
