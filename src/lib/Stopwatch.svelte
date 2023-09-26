<script>
    import { secondsToTime } from "../core/text";
    import { time } from "../stores/time";
</script>

<div id="stopwatch">{secondsToTime($time)}</div>

<style>
    div {
        display: inline-block;
        vertical-align: top;
        color: rgba(255, 255, 255, 0.35);
        padding: 0;
        font-size: x-large;
    }
</style>
