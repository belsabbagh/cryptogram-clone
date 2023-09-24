<script>
    import Puzzle from "./lib/Puzzle.svelte";
    import puzzle from "./lib/puzzleStore";
    import { quotes } from "./assets/quotes.json";
    import { getALlInputs } from "./lib/dom";
    import { makePuzzle } from "./lib/puzzleMaker";
    import { time } from "./lib/time";
    import { onDestroy } from "svelte";
    let difficulties = {
        easy: 0.5,
        normal: 0.65,
        hard: 0.8,
        legendary: 1,
    };

    function newPuzzle(quote, difficulty) {
        puzzle.set(makePuzzle(quote, difficulty));
        resetInputs();
        time.set(0);
    }

    function makePuzzleAction(_e) {
        newPuzzle(getRandomQuote(), difficulties[difficulty]);
    }

    function getRandomQuote() {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    function setDifficultyAction(e) {
        newPuzzle(quote, difficulties[e.target.value]);
    }

    function resetInputs() {
        const inputs = getALlInputs();
        for (const i of inputs) {
            i.value = "";
            i.readOnly = false;
        }
    }

    function startOverAction(e) {
        resetInputs();
    }

    function secondsToTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const r = seconds % 60;
        return `${minutes}:${r < 10 ? "0" : ""}${r}`;
    }

    function submitQuote(e) {
        e.preventDefault();
        const text = e.target.quote.value;
        const author = e.target.author.value;
        quotes.push({ text, author });

        e.target.reset();
    }
    let difficulty = "easy";
    let quote = getRandomQuote();
    puzzle.set(makePuzzle(quote, difficulties[difficulty]));
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
    <div class="timer">
        <span>Time: </span>
        <span>{secondsToTime($time)}</span>
    </div>
    <div class="card">
        <div id="status">
            {#if $puzzle.isFinished}
                Correct!
            {/if}
        </div>
        <Puzzle />
    </div>
    <button class="next" on:click={makePuzzleAction}>Next</button>
    <button on:click={startOverAction}>Clear</button>
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
    #status {
        margin-bottom: 2rem;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 2rem;
    }
</style>
