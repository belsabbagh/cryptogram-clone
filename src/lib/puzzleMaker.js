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
export function makePuzzle(text, difficultyPercent = 0.7) {
    text = text.toUpperCase()
    let uniqueChars = text.split("").filter((i, index, self) => self.indexOf(i) === index && i !== " ")
    const hiddenChars = _hideChars(uniqueChars, difficultyPercent);
    return {
        hiddenChars,
        words: text.split(" "),
        charMap: _createCharMap(uniqueChars)
    }
}