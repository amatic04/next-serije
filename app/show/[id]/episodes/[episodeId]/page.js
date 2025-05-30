
/**
 * Prikaz detalja pojedine epizode.
 * Dohvaća podatke o epizodi (slika, sažetak, broj epizode/sezone).
 */

import Image from 'next/image';
import Link from 'next/link';

async function getEpisode(episodeId) {
    const res = await fetch(`https://api.tvmaze.com/episodes/${episodeId}`);
    if (!res.ok) {
        throw new Error('Greška pri dohvaćanju epizode');
    }
    return res.json();
}

export default async function EpisodeDetailPage({ params }) {
    const episode = await getEpisode(params.episodeId);

    return (
        <main className="p-6 max-w-2xl mx-auto">
            <Link
                href={`/show/${params.id}/episodes`}
                className="text-blue-600 hover:underline block mb-4"
            >
                ← Natrag na epizode
            </Link>

            <h1 className="text-3xl font-bold mb-2">{episode.name}</h1>
            <p className="text-gray-600 mb-4">
                Sezona {episode.season}, Epizoda {episode.number} • {episode.airdate}
            </p>

            {episode.image?.original && (
                <Image
                    src={episode.image.original}
                    alt={episode.name}
                    width={600}
                    height={400}
                    className="rounded-lg mb-6"
                />
            )}

            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: episode.summary || '<p>Nema opisa.</p>' }}
            />
        </main>
    );
}
