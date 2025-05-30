/**
 * Prikaz popisa svih epizoda određene serije.
 * Prikazuje sve epizode u listi s linkom na detalje pojedine epizode.
 */

import Link from "next/link";

export default async function EpisodesPage({ params }) {
    const { id } = params;
    const res = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
    const episodes = await res.json();

    if (!res.ok) {
        throw new Error("Greška pri dohvatu epizoda.");
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Epizode</h2>
            <ul className="space-y-2">
                {episodes.map((ep) => (
                    <li key={ep.id} className="border-b pb-2">
                        <Link
                            href={`/show/${id}/episodes/${ep.id}`}  //link na detalje epizode
                            className="text-blue-600 hover:underline"
                        >
                            <strong>Sezona {ep.season}, Epizoda {ep.number}:</strong> {ep.name}
                        </Link>

                    </li>
                ))}
            </ul>
        </div>
    );
}
