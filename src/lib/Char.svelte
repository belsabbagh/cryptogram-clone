<script>
    import CharInput from "./CharInput.svelte";

    import { isAlpha } from "../core/text";
    import { puzzle } from "../stores/puzzle";

    function specialCharStyle(char) {
        return `special-char ${char === "," ? "comma" : ""}`;
    }
    export let char;
</script>

<span class="char">
    {#if isAlpha(char)}
        {#if $puzzle.hiddenChars.includes(char)}
            <CharInput name={char} />
            <span class="key">
                {$puzzle.charMap[char]}
            </span>
        {:else}
            <div class="solved-char">
                {char}
            </div>
        {/if}
    {:else}
        <span class={specialCharStyle(char)}>
            {char}
        </span>
    {/if}
</span>

<style>
    span {
        display: inline-block;
        vertical-align: top;
    }

    .whitespace {
        margin: 0 0.3rem 0 0.3rem;
    }

    .solved-char {
        border: none;
        border-bottom: 1px solid white;
        font-size: larger;
        text-align: center;
        width: 1.6rem;
        margin: 0 0.3rem 0 0.3rem;
        vertical-align: top;
        line-height: 1.6rem;
        padding: 0;
    }

    .key {
        display: block;
        color: rgba(255, 255, 255, 0.35);
    }

    .comma {
        margin-top: 0.5rem;
    }
</style>
