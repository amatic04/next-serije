import Image from "next/image";
import { notFound } from 'next/navigation';
import FavoriteButton from "@/components/FavoriteButton";

export default async function ShowPage({ params }) {
    const { id } = params;
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await res.json();

    if (!res.ok) {
        return notFound()
    }


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
                        dangerouslySetInnerHTML={{ __html: show.summary }}
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
                    />

                </div>

            </div>
        </main>
    );
}
