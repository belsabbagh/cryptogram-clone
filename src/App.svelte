<script>
    import NewQuoteForm from "./lib/NewQuoteForm.svelte";

    import Stopwatch from "./lib/Stopwatch.svelte";
    import { getRandomQuote } from "./core/quotes";
    import Puzzle from "./lib/Puzzle.svelte";
    import { puzzle } from "./stores/puzzle";
    import { getALlInputs } from "./core/dom";
    import { makePuzzle, PRESET_DIFFICULTIES } from "./core/puzzleMaker";
    import { time } from "./stores/time";

    function newPuzzle(quote, difficulty) {
        puzzle.set(makePuzzle(quote, difficulty));
        resetInputs();
        time.set(0);
    }

    function makePuzzleAction(_e) {
        newPuzzle(getRandomQuote(), PRESET_DIFFICULTIES[difficulty]);
    }

    function setDifficultyAction(e) {
        newPuzzle(quote, PRESET_DIFFICULTIES[e.target.value]);
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

    let difficulty = "easy";
    let quote = getRandomQuote();
    puzzle.set(makePuzzle(quote, PRESET_DIFFICULTIES[difficulty]));
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
        <Stopwatch />
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
        <NewQuoteForm />
    </div>
</main>

<style>
    #status {
        margin-bottom: 2rem;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 2rem;
    }
</style>
