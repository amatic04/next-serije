/**
 * Stranica s detaljima o seriji.
 * Dohvaća podatke o seriji i prikazuje ih zajedno s gumbom za dodavanje u favorite.
 */

import Image from "next/image";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";

export default async function ShowPage({ params }) {
    const { id } = params;

    //paralelni fetch
    const showFetch = fetch(`https://api.tvmaze.com/shows/${id}`);
    const favFetch = fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/favorites`, {
        cache: "no-store"  // Koristi "no-store" kako bi se uvijek dohvatili najnoviji podaci (izbjegavanje cache-a za dinamične podatke)
    });
    //cekamo kraj oba zahtjeva
    const [showRes, favRes] = await Promise.all([showFetch, favFetch]);

    if (!showRes.ok) return notFound();

    const show = await showRes.json();
    const favorites = await favRes.json();

    // Provjera je li trenutna serija već u listi favorita
    const spremljen = favorites.some(fav => fav.id === Number(id));

    return (
        <main className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{show.name}</h1>
            <div className="flex flex-col md:flex-row gap-6">
                {show.image?.original && (
                    <Image
                        src={show.image.original}
                        alt={show.name}
                        width={300}
                        height={450}
                        className="rounded-xl"
                    />
                )}
                <div className="flex-1">
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: show.summary }}  // TVmaze vraća HTML opis serije
                    />
                    <p className="mt-4 text-sm text-gray-600">
                        <strong>Status:</strong> {show.status}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Žanrovi:</strong> {show.genres.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Ocjena:</strong> {show.rating?.average || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        <strong>Premijera:</strong> {show.premiered}
                    </p>

                    <FavoriteButton
                        id={show.id}
                        name={show.name}
                        image={show.image}
                        genres={show.genres}
                        initialSaved={spremljen}
                    />
                </div>
            </div>
        </main>
    );
}
