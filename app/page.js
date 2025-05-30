/**
 * Početna stranica aplikacije.
 * Dohvaća i prikazuje listu popularnih serija sa TVmaze API-ja.
 */

'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  // Dohvat popularnih serija s osnovnim informacijama (korišteno iz dokumentacije TVmaze: /shows)
  const [shows, setShows] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);  //prvo prikazujemo 20 serija
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchShows() {
      setLoading(true);
      const res = await fetch("https://api.tvmaze.com/shows");
      const data = await res.json();
      setShows(data);
      setLoading(false);
    }

    fetchShows();
  }, []);
  // Funkcija za učitavanje dodatnih serija prilikom klika na "Učitaj još"
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20); // Povećaj broj prikazanih serija
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">TV shows</h1>

      <SearchBar />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {shows.slice(0, visibleCount).map((show) => (
          <div key={show.id} className="bg-white shadow rounded-xl p-4">
            <Link href={`/show/${show.id}`}>
              <div className="cursor-pointer">
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
                  {show.genres.join(", ")}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {visibleCount < shows.length && (
        <div className="mt-6 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Učitavanje..." : "Učitaj još"}
          </button>
        </div>
      )}
    </main>
  );
}
