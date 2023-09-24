<script>
    import Char from "./Char.svelte";
    export let word;
</script>

<span class="word">
    {#each word as char}
        <Char {char} />
    {/each}
    <span class="whitespace" />
</span>

<style>
    span {
        display: inline-block;
        vertical-align: top;
    }
    .whitespace {
        margin: 0 0.3rem 0 0.3rem;
    }
</style>
