<script>
    import { makePuzzle } from "./puzzleMaker";
    let quote = {
        text: "Today is a great day for a great day",
        author: "John Nolan",
    };
    const puzzle = makePuzzle(quote.text);
</script>

<div class="quote">
    {#each puzzle.words as word}
        <span class="word">
            {#each word as char}
                <span class="char">
                    <input
                        type="text"
                        value={char.hidden? "" : char.char}
                        maxlength="1"
                        readonly={!char.hidden}
                    />
                    <div class="key">{puzzle.charMap[char.char]}</div>
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
