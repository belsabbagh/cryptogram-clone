import { quotes } from "../assets/quotes.json";

export function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

export { quotes }