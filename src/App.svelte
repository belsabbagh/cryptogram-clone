<script>
    import NewQuoteForm from "./lib/NewQuoteForm.svelte";

    import Stopwatch from "./lib/Stopwatch.svelte";
    import { getRandomQuote } from "./core/quotes";
    import Puzzle from "./lib/Puzzle.svelte";
    import { puzzle } from "./stores/puzzle";
    import { getALlInputs } from "./core/dom";
    import { makePuzzle, PRESET_DIFFICULTIES } from "./core/puzzleMaker";
    import { time } from "./stores/time";
    import Char from "./lib/Char.svelte";
    import { secondsToTime } from "./core/text";

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

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            if (!$puzzle.isFinished) return;
            document.getElementById("next").click();
        }
    }

    let difficulty = "easy";
    let quote = getRandomQuote();
    puzzle.set(makePuzzle(quote, PRESET_DIFFICULTIES[difficulty]));
</script>

<header>
    <h1>Cryptogram</h1>
</header>
<main>
    <div class="timer" />
    <div id="status">
        <Stopwatch />
        {#if $puzzle.isFinished}
            You solved it!
        {:else}
            Solve the puzzle!
        {/if}
    </div>
    <div class="difficulty">
        Difficulty:
        <select on:change={setDifficultyAction} bind:value={difficulty}>
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
            <option value="legendary">Legendary</option>
        </select>
    </div>

    <div class="card">
        <Puzzle />
    </div>
    <div class="controls">
        <button on:click={startOverAction}>Clear</button>
        <button
            id="next"
            class="next"
            on:click={makePuzzleAction}
            disabled={!$puzzle.isFinished}>Next</button
        >
    </div>

    <!-- <div>
        <h2>Add a quote</h2>
        <NewQuoteForm />
    </div> -->
</main>

<svelte:window on:keydown={handleKeyDown} />

<style>
    #status {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 2rem;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 2rem;
    }
    .controls {
        /* stick to bottom */
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 1rem;
    }

    header {
        display: flex;
        flex-direction: column;
        width: 100%;
        place-content: center;
        position: fixed;
        top: 0;
        left: 0;
    }

    select {
        margin-left: 0.35rem;
        padding-left: 0.2rem;
    }
</style>
