import Link from "next/link";
import Image from "next/image";

export default async function SearchPage({ searchParams }) {
    const query = searchParams.q;  // Dohvaća query string iz URL-a

    if (!query) {
        return <div className="p-6">Unesite pojam za pretragu.</div>;  // Ako nema upita, obavijesti korisnika  
    }
    // Poziv prema TVmaze API-u
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const results = await res.json(); // Rezultat je niz objekata s ključem "show"

    if (results.length === 0) {
        return <div className="p-6">Nema rezultata za "{query}".</div>; // Ako nema rezultata
    }

    return (
        <main className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Rezultati za: "{query}"</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {results.map(({ show }) => (
                    <Link href={`/show/${show.id}`} key={show.id}>
                        <div className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition cursor-pointer">
                            {show.image?.medium && (
                                <Image
                                    src={show.image.medium}
                                    alt={show.name}
                                    width={210}
                                    height={295}
                                    className="rounded"
                                />
                            )}
                            <h2 className="mt-2 font-semibold text-gray-700">{show.name}</h2>
                            <p className="text-sm text-gray-600">
                                {show.genres?.join(", ") || "Bez žanra"}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

        </main>
    );
}
