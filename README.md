# 🎬 Next.js Serije App

Aplikacija za pregledavanje i spremanje omiljenih serija, bazirana na [TVmaze API-ju](https://www.tvmaze.com/api). Omogućuje pretragu, pregled detalja i dodavanje serija u favorite.

🔗 **Online demo:** [https://next-serije.vercel.app](https://next-serije.vercel.app)

📦 **Repozitorij:** [https://github.com/amatic04/next-serije](https://github.com/amatic04/next-serije)

---

## ✨ Funkcionalnosti

- 🏠 **Početna stranica** s listom TV serija
- 🔍 **Pretraga serija** po nazivu
- 📄 **Detaljna stranica serije** s opisom, ocjenom, žanrom i datumom premijere
- 🎭 **Cast stranica** s glumcima za svaku seriju
- 📺 **Epizode stranica** s listom svih epizoda i pojedinačnim prikazom
- ⭐ **Spremanje i brisanje favorita** (lokalno pohranjeno na serverskoj memoriji)
- 📁 **Favorites stranica** sa svim spremljenim serijama
- 🧭 **Navigacija unutar serije** putem bočne trake (layout)
- ✅ **Jednostavan, responzivan dizajn** s Next.js + Tailwind CSS
- ↩  **Povratak** na prethodnu stranicu jednim klikom
- ❌ **404 stranica** kada serija ili epizoda ne postoji
- 🚀 **Deploy na Vercel**

---

## 🚀 Lokalno pokretanje

### Kloniraj repozitorij

```bash
git clone https://github.com/amatic04/next-serije.git
cd next-serije
npm install
npm run dev
```

📌 **Napomena**: Kreiraj `.env.local` datoteku:

    NEXT_PUBLIC_SITE_URL=http://localhost:3000


🛠 **Tehnologije**

    Next.js (App Router)

    React

    Tailwind CSS

    TVmaze API

    Vercel (deploy)


❗ Napomene

   - Favoriti se spremaju u memoriju servera (nema baze podataka).

   - Pošto se memorija "resetira" pri redeployu ili refreshu servera, favoriti nisu trajno pohranjeni.

   - Aplikacija koristi cache: "no-store" kako bi se osigurali svježi podaci prilikom dohvaćanja favorita.