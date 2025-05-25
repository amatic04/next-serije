import { notFound } from "next/navigation";

export default async function CastPage({ params }) {
    const { id } = params;
    const res = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);

    if (!res.ok) return notFound();

    const cast = await res.json();

    if (!cast || cast.length === 0) return notFound();

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Glumačka postava</h2>
            <ul className="space-y-2">
                {cast.map((member, index) => (
                    <li
                        key={`${member.person.id}-${member.character?.id || index}`}
                        className="border-b pb-2"
                    >
                        <strong>{member.person.name}</strong> kao{" "}
                        {member.character?.name || "Nepoznat lik"}
                    </li>
                ))}
            </ul>
        </div>
    );
}
