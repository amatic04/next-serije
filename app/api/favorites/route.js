/**
 * API ruta za upravljanje favoritima (memorija samo u RAM-u).
 * Koristi in-memory niz `favorites` za čuvanje podataka – nestaje pri restartu servera.
 */

let favorites = [];

// GET metoda vraća trenutno spremljene favorite
export async function GET() {
    return Response.json(favorites);
}

// POST metoda dodaje novi show u favorite ako već ne postoji
export async function POST(request) {
    const body = await request.json();
    const { id, name, image, genres } = body;

    // Osnovna validacija podataka – ID i naziv moraju postojati
    if (!id || !name) {
        return Response.json({ error: "Missing id or name" }, { status: 400 });
    }

    // Provjera postoji li već show u favoritima (prema ID-u)
    const exists = favorites.find((show) => show.id === id);
    if (exists) {
        return Response.json({ error: "Already exists" }, { status: 409 });
    }

    favorites.push({ id, name, image, genres });
    return Response.json({ ok: true });
}

// DELETE metoda uklanja show iz favorita prema ID-u
export async function DELETE(request) {
    const { id } = await request.json();

    const index = favorites.findIndex((show) => show.id === id);
    if (index === -1) {
        return Response.json({ error: "Not found" }, { status: 404 });
    }

    favorites.splice(index, 1);
    return Response.json({ ok: true });
}
