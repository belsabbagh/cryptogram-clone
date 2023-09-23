<script>
    const FOCUS_RGBA = "rgba(255, 0, 0, 1)";
    let finished = false;
    function isValidInput(input) {
        return /^[a-zA-Z]+$/.test(input);
    }

    function getALlInputs() {
        return document.querySelectorAll("input");
    }

    function colorInput(input, name) {
        input.style.color = input.name === name ? FOCUS_RGBA : "white";
        input.style.borderBottom =
            input.name === name ? `1px solid ${FOCUS_RGBA}` : "1px solid white";
    }

    function colorOthers(name) {
        getALlInputs().forEach((i) => colorInput(i, name));
    }

    function actionColorOthers(e) {
        if (finished) return;
        colorOthers(e.target.name);
    }

    function updatePuzzle(e) {
        if (!isValidInput(e.target.value)) {
            e.target.value = "";
        }
        e.target.value = e.target.value.toUpperCase();
        const inputs = getALlInputs();
        for (const i of inputs) {
            if (i.name === e.target.name) {
                i.value = e.target.value;
            }
        }
        if (getInput() === puzzle.answerKey) {
            finishPuzzle(inputs);
            return;
        }
        let found = false;
        for (const i of inputs) {
            if (i.id === e.target.id) {
                found = true;
            }
            if (found && i.readOnly === false) {
                i.focus();
                break;
            }
        }
    }

    function finishPuzzle(inputs) {
        document.getElementById("status").innerHTML = "Correct!";
        inputs.forEach((i) => {
            i.readOnly = true;
            i.style.color = "white";
            i.style.borderBottom = "1px solid white";
        });
        finished = true;
    }

    function charIsHidden(char, puzzle) {
        return puzzle.hiddenChars.includes(char);
    }

    function getInput() {
        const inputs = getALlInputs();
        let answer = "";
        for (const i of inputs) {
            answer += i.value;
        }
        return answer;
    }
    export let puzzle;
</script>

<div id="status" />
<div class="quote">
    {#each puzzle.words as word}
        <span class="word">
            {#each word as char}
                <span class="char">
                    {#if isValidInput(char)}
                        <input
                            name={char}
                            id={char + Math.random()}
                            type="text"
                            value={charIsHidden(char, puzzle) ? "" : char}
                            on:input={updatePuzzle}
                            on:focus={actionColorOthers}
                            maxlength="1"
                            readonly={!charIsHidden(char, puzzle)}
                        />
                        {#if charIsHidden(char, puzzle)}
                            <div class="key">
                                {puzzle.charMap[char]}
                            </div>
                        {/if}
                    {:else}
                        <div class="special-char">
                            {char}
                        </div>
                    {/if}
                </span>
            {/each}
            <span class="whitespace" />
        </span>
    {/each}
</div>
<div class="author">{puzzle.author}</div>

<style>
    span {
        display: inline-block;
        vertical-align: top;
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

    input:focus {
        outline: none;
        border-bottom: 1px solid #aa0000;
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
    .special-char {
        margin: 0.3rem;
    }
    #status {
        margin-bottom: 2rem;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        font-size: 2rem;
    }
</style>
