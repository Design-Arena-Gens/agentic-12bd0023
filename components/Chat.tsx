"use client";
import { useMemo, useRef, useState } from "react";
import countriesData from "@/data/countries.json";

type Country = {
  name: string;
  capital: string;
  region: string;
  population: number;
  code: string;
};

type Message = { role: "user" | "bot"; text: string };

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function findCountry(query: string, list: Country[]): Country | undefined {
  const q = normalize(query);
  return list.find(
    c => c.name.toLowerCase() === q || c.name.toLowerCase().includes(q)
  );
}

function answer(query: string, countries: Country[]): string {
  const q = normalize(query);
  const country = findCountry(q, countries);
  if (country) {
    if (q.includes("capital")) {
      return `The capital of ${country.name} is ${country.capital}.`;
    }
    if (q.includes("population")) {
      return `${country.name} has a population of ${country.population.toLocaleString()}.`;
    }
    if (q.includes("region") || q.includes("continent")) {
      return `${country.name} is in the ${country.region} region.`;
    }
    return `${country.name}: capital ${country.capital}, region ${country.region}, population ${country.population.toLocaleString()}.`;
  }
  // fuzzy: try to parse 'capital of X', 'X capital'
  const capitalMatch = q.match(/capital of ([a-zA-Z ]+)/);
  if (capitalMatch) {
    const c = findCountry(capitalMatch[1], countries);
    if (c) return `The capital of ${c.name} is ${c.capital}.`;
  }
  const popMatch = q.match(/population of ([a-zA-Z ]+)/);
  if (popMatch) {
    const c = findCountry(popMatch[1], countries);
    if (c) return `${c.name} has a population of ${c.population.toLocaleString()}.`;
  }
  return "I couldn't find that. Try 'capital of Japan' or 'France population'.";
}

export default function Chat() {
  const countries = useMemo(() => countriesData as Country[], []);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! Ask me about any country." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function onSend() {
    const value = input.trim();
    if (!value) return;
    setMessages(prev => [...prev, { role: "user", text: value }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const reply = answer(value, countries);
      setMessages(prev => [...prev, { role: "bot", text: reply }]);
      setLoading(false);
      inputRef.current?.focus();
    }, 200);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") onSend();
  }

  return (
    <div>
      <div className="inputRow">
        <input
          ref={inputRef}
          className="input"
          placeholder="Ask about capital, population, region?"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button className="button" onClick={onSend} disabled={loading}>
          {loading ? "?" : "Ask"}
        </button>
      </div>
      <div className="chat">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role === "user" ? "user" : "bot"}`}>
            <span className="small mono">{m.role === "user" ? "You" : "Atlas"}</span>
            <div>{m.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
