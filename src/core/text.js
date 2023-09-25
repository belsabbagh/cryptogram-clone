export function isAlpha(input) {
    return /^[a-zA-Z]+$/.test(input);
}

export function sanitizeInput(val) {
    if (!isAlpha(val)) {
        val = "";
    }
    if (val > 1) {
        val = val[0];
    }
    val = val.toUpperCase();
    return val;
}