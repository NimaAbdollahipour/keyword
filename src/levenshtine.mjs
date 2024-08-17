function levenshtein(a, b) {
    let tmp;
    let i, j;
    const alen = a.length;
    const blen = b.length;
    const matrix = [];

    // Ensure the length of a is greater than b
    if (alen === 0) {
        return blen;
    }
    if (blen === 0) {
        return alen;
    }

    // Create matrix
    for (i = 0; i <= alen; i++) {
        matrix[i] = [i];
    }
    for (j = 0; j <= blen; j++) {
        matrix[0][j] = j;
    }

    // Populate matrix
    for (i = 1; i <= alen; i++) {
        for (j = 1; j <= blen; j++) {
            tmp = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // Deletion
                matrix[i][j - 1] + 1, // Insertion
                matrix[i - 1][j - 1] + tmp // Substitution
            );
        }
    }

    return matrix[alen][blen];
}

export default function findClosestWord(misspelledWord, dictionary) {
    let closestWord = "";
    let minDistance = Infinity;

    for (const word of dictionary) {
        const distance = levenshtein(misspelledWord, word);
        if (distance < minDistance) {
            minDistance = distance;
            closestWord = word;
        }
    }

    return closestWord;
}
