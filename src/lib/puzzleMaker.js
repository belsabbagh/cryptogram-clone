function createCharMap(text) {
    const uniqueChars = text.split("").filter((i, index, self) => self.indexOf(i) === index && i !== " ");
    const uniqueCodes = uniqueChars.map((i) => i.charCodeAt(0)).sort((a, b) => 0.5 - Math.random());
    let charMap = {};
    uniqueChars.forEach((element, index) => {
        charMap[element] = String.fromCharCode(uniqueCodes[index]);
    });
    return charMap;
}
export function makePuzzle(text) {
    text = text.toUpperCase()
    return {
        words: text.split(" "),
        charMap: createCharMap(text)
    }
}