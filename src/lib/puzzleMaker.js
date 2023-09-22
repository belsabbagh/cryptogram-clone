function createCharMap(text) {
    const uniqueChars = text.split("").filter((i, index, self) => self.indexOf(i) === index && i !== " ");
    const uniqueCodes = uniqueChars.map((i) => i.charCodeAt(0)).sort((a, b) => 0.5 - Math.random());
    let charMap = {};
    uniqueChars.forEach((element, index) => {
        charMap[element] = String.fromCharCode(uniqueCodes[index]);
    });
    return charMap;
}
function hideChars(words, difficultyPercent = 0.5) {
    return words.map(word => {
        return word.split("").map(char => {
            return { char, hidden: Math.random() < difficultyPercent }
        })
    })
}
export function makePuzzle(text) {
    text = text.toUpperCase()
    return {
        words: hideChars(text.split(" ")),
        charMap: createCharMap(text)
    }
}