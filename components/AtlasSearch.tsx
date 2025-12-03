"use client";
import { useMemo, useState } from "react";
import countries from "@/data/countries.json";

type Country = {
  name: string;
  capital: string;
  region: string;
  population: number;
  code: string;
};

export default function AtlasSearch() {
  const all = useMemo(() => countries as Country[], []);
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const n = q.toLowerCase().trim();
    if (!n) return all.slice(0, 12);
    return all.filter(c => c.name.toLowerCase().includes(n)).slice(0, 24);
  }, [q, all]);

  return (
    <div>
      <input
        className="input search"
        placeholder="Search countries?"
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <ul className="list">
        {list.map((c) => (
          <li key={c.code} className="card">
            <h4>{c.name} <span className="badge">{c.code}</span></h4>
            <div className="small">Capital: <strong>{c.capital}</strong></div>
            <div className="small">Region: <strong>{c.region}</strong></div>
            <div className="small">Population: <strong>{c.population.toLocaleString()}</strong></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
