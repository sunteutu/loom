/** Mapare nu e încă funcțională — pe live (build de producție) pagina
    și toate intrările spre ea dispar; local, în `npm run dev`, rămâne. */
export const MAPARE_ENABLED = process.env.NODE_ENV === "development";
