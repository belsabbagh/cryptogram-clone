<script>
    import { makePuzzle } from "./puzzleMaker";
    function updatePuzzle(e) {
        e.target.value = e.target.value.toUpperCase();
        // update all the other inputs
        const inputs = document.querySelectorAll("input");
        inputs.forEach((input) => {
            if (input.name === e.target.name) {
                input.value = e.target.value;
            }
        });
    }
    function charIsHidden(char, puzzle) {
        return puzzle.hiddenChars.includes(char);
    }
    let quote = {
        text: "Today is a great day for a great day",
        author: "John Nolan",
    };
    const puzzle = makePuzzle(quote.text, 0.9);
</script>

<div class="quote">
    {#each puzzle.words as word}
        <span class="word">
            {#each word as char}
                <span class="char">
                    <input
                        name={char}
                        type="text"
                        value={charIsHidden(char, puzzle) ? "" : char}
                        on:input={updatePuzzle}
                        maxlength="1"
                        readonly={!charIsHidden(char, puzzle)}
                    />
                    <div class="key">{puzzle.charMap[char]}</div>
                </span>
            {/each}
            <span class="whitespace" />
        </span>
    {/each}
</div>
<div class="author">{quote.author}</div>

<style>
    span {
        display: inline-block;
    }
    span .whitespace {
        margin: 0 0.3rem 0 0.3rem;
    }
    input {
        inherits: none;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid white;
        font-size: larger;
        text-align: center;
        width: 1.5rem;
        margin: 0.3rem;
    }
    div .quote {
        display: inline;
    }
    div .key {
        color: rgba(255, 255, 255, 0.35);
    }
</style>
