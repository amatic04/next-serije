let favorites = [];

export async function GET() {
    return Response.json(favorites);
}

export async function POST(request) {
    const body = await request.json();
    const { id, name, image } = body;

    if (!id || !name) {
        return Response.json({ error: "Missing id or name" }, { status: 400 });
    }

    const exists = favorites.find(show => show.id === id);
    if (exists) {
        return Response.json({ error: "Already exists" }, { status: 409 });
    }

    favorites.push({ id, name, image });
    return Response.json({ ok: true });
}
