<script>
    import Puzzle from "./lib/Puzzle.svelte";
    import { makePuzzle } from "./lib/puzzleMaker";
    import { quotes } from "./assets/quotes.json";

    let difficulties = {
        easy: 0.5,
        normal: 0.65,
        hard: 0.8,
        legendary: 1,
    };
    let difficulty = "easy";
    let puzzle = makePuzzle(getRandomQuote(), difficulties[difficulty]);

    function makePuzzleAction(_e) {
        puzzle = makePuzzle(getRandomQuote(), difficulties[difficulty]);
    }

    function getRandomQuote() {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    function setDifficultyAction(e) {
        puzzle = makePuzzle(getRandomQuote(), difficulties[e.target.value]);
    }

    function submitQuote(e) {
        e.preventDefault();
        const text = e.target.quote.value;
        const author = e.target.author.value;
        quotes.push({ text, author });
        
        e.target.reset();
    }
</script>

<main>
    <h1>Cryptogram</h1>
    Choose difficulty:
    <select on:change={setDifficultyAction} bind:value={difficulty}>
        <option value="easy">Easy</option>
        <option value="normal">Normal</option>
        <option value="hard">Hard</option>
        <option value="legendary">Legendary</option>
    </select>
    <div class="card">
        <Puzzle {puzzle} />
    </div>
    <button class="next" on:click={makePuzzleAction}>Next</button>
    <div>
        <h2>Add a quote</h2>
        <form on:submit={submitQuote}>
            <label for="quote">Quote</label>
            <textarea name="quote" id="quote" cols="30" rows="5" />
            <label for="author">Author</label>
            <input type="text" name="author" id="author" />
            <button type="submit">Submit</button>
        </form>
    </div>
</main>

<style>
    form {
        display: flex;
        flex-direction: column;
        max-width: fit-content;
        margin: auto;
    }
</style>
