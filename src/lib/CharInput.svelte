<script>
    import { isAlpha } from "../core/text";
    import { getALlInputs } from "../core/dom";
    import { puzzle } from "../stores/puzzle";
    const FOCUS_RGBA = "rgba(255, 0, 0, 1)";

    function colorInput(input, name) {
        input.style.color = input.name === name ? FOCUS_RGBA : "white";
        input.style.borderBottom =
            input.name === name ? `1px solid ${FOCUS_RGBA}` : "1px solid white";
    }
    function actionColorOthers(e) {
        if ($puzzle.isFinished) return;
        colorOthers(e.target.name);
    }

    function colorOthers(name) {
        getALlInputs().forEach((i) => colorInput(i, name));
    }
    function updatePuzzle(e) {
        if (!isAlpha(e.target.value)) {
            e.target.value = "";
        }
        e.target.value = e.target.value.toUpperCase();
        const inputs = getALlInputs();
        for (const i of inputs) {
            if (i.name === e.target.name) {
                i.value = e.target.value;
            }
        }
        if (getInput() === $puzzle.answerKey) {
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
        inputs.forEach((i) => {
            i.readOnly = true;
            i.style.color = "white";
            i.style.borderBottom = "1px solid white";
        });
        $puzzle.isFinished = true;
    }

    function getInput() {
        const inputs = getALlInputs();
        let answer = "";
        for (const i of inputs) {
            answer += i.value;
        }
        return answer;
    }

    export let name;
</script>

<input
    {name}
    id={name + Math.random()}
    type="text"
    on:input={updatePuzzle}
    on:focus={actionColorOthers}
    maxlength="1"
/>

<style>
    input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid white;
        font-size: larger;
        text-align: center;
        width: 1.6rem;
        margin: 0 0.3rem 0 0.3rem;
        display: inline-block;
        vertical-align: top;
        line-height: 1.6rem;
        padding: 0;
    }

    input:focus {
        outline: none;
        border-bottom: 1px solid #aa0000;
    }
</style>
