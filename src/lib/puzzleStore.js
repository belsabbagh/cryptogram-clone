import { writable } from "svelte/store";

export default writable({
    hiddenChars: [],
    answerKey: "",
    words: [],
    charMap: {},
    author: "",
    isFinished: false
})