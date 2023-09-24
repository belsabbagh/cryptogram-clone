import { isAlpha } from "./text";

function _createCharMap(uniqueChars) {
    const uniqueCodes = uniqueChars.map((i) => i.charCodeAt(0)).sort((a, b) => 0.5 - Math.random());
    let charMap = {};
    uniqueChars.forEach((element, index) => {
        charMap[element] = String.fromCharCode(uniqueCodes[index]);
    });
    return charMap;
}
function _hideChars(uniqueChars, difficultyPercent) {
    let chars = []
    for (const i of uniqueChars) {
        if (Math.random() < difficultyPercent) {
            chars.push(i)
        }
    }
    return chars
}
function _makeAnswerKey(text, hiddenChars) {
    let key = ""
    for (const i of text) {
        if (hiddenChars.indexOf(i) !== -1) {
            key += i
        }
    }
    return key
}

export function makePuzzle(quote, difficultyPercent = 0.7) {
    let text = quote.text.toUpperCase()
    let uniqueChars = text.split("").filter((i, index, self) => self.indexOf(i) === index && i !== " " && isAlpha(i))
    const hiddenChars = _hideChars(uniqueChars, difficultyPercent);
    return {
        hiddenChars,
        answerKey: _makeAnswerKey(text, hiddenChars),
        words: text.split(" "),
        charMap: _createCharMap(uniqueChars),
        author: quote.author,
        isFinished: false
    }
}