import { quotes } from "../assets/quotes.json";

/**
 * Retrieves a random quote from the 'quotes' array that includes at least one of the specified tags.
 * Defaults to filtering for quotes tagged with 'programming' if no tags are provided.
 *
 * @param {string[]} tags An array of tags to filter quotes by (e.g., ['programming', 'javascript']).
 * Defaults to ['programming'].
 * @returns {object} A random quote object that matches one or more tags, or null if no matching quote is found.
 */
export function getRandomQuoteByTags(tags = ["programming"]) {
	// 1. Filter the quotes array to only include quotes that contain at least one of the input tags
	const taggedQuotes = quotes.filter((quote) => {
		// Ensure the quote has tags and that the quote's tags array has some intersection with the input tags array.
		// Array.prototype.some() checks if at least one element in the 'tags' array satisfies the condition.
		return quote.tags && tags.some((tag) => quote.tags.includes(tag));
	});

	// 2. Check if any quotes were found
	if (taggedQuotes.length === 0) {
		console.warn(
			`No quotes found matching any of the tags: ${tags.join(", ")}`,
		);
		return null;
	}

	// 3. Select a random quote from the filtered array
	const randomIndex = Math.floor(Math.random() * taggedQuotes.length);
	return taggedQuotes[randomIndex];
}

export { quotes };

