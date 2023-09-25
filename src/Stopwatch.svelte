<script>
    import { time } from "./lib/time";

    function secondsToTime(seconds) {
        const r = seconds % 60;
        return `${Math.floor(seconds / 60)}:${r < 10 ? "0" : ""}${r}`;
    }
</script>

<span id="stopwatch">{secondsToTime($time)}</span>

<style>
</style>
