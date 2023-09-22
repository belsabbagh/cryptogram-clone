<script>
    import { makePuzzle } from "./puzzleMaker";

    function isValidInput(input) {
        return /^[a-zA-Z]+$/.test(input);
    }

    function updatePuzzle(e) {
        if (!isValidInput(e.target.value)) {
            e.target.value = "";
        }
        e.target.value = e.target.value.toUpperCase();
        const inputs = document.querySelectorAll("input");
        for (const i of inputs) {
            if (i.name === e.target.name) {
                i.value = e.target.value;
            }
        }
        if (getInput() === puzzle.answerKey) {
            document.getElementById("status").innerHTML = "Correct!";
            inputs.forEach((i) => (i.readOnly = true));
        }
    }

    function charIsHidden(char, puzzle) {
        return puzzle.hiddenChars.includes(char);
    }

    function getInput() {
        const inputs = document.querySelectorAll("input");
        let answer = "";
        for (const i of inputs) {
            answer += i.value;
        }
        return answer;
    }

    let quote = {
        text: "My nana used to say today is a great day for a great day",
        author: "John Nolan",
    };
    const puzzle = makePuzzle(quote.text, 0.9);
</script>

<div id="status" />
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
                    <div
                        class="key"
                        style={charIsHidden(char, puzzle)
                            ? ""
                            : "color: transparent;"}
                    >
                        {puzzle.charMap[char]}
                    </div>
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
    .quote {
        display: inline;
    }
    .key {
        color: rgba(255, 255, 255, 0.35);
    }
    .author {
        padding: 0.5rem 0 0.5rem 0;
        text-align: end;
        color: rgba(255, 255, 255, 0.35);
    }
    #status {
        margin-bottom: 2rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 2rem;
    }
</style>
