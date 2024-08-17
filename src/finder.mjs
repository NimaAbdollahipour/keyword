export function match(query, item) {
    // Early exit if either string is empty
    if (!query || !item) return { score: 0, word: item };

    let score = 0;
    const long = query.length >= item.length ? query : item;
    const short = query.length < item.length ? query : item;

    // Create an array to keep track of matching positions
    const matchedIndices = new Set();

    let consecutiveBonus = 0;
    let lastMatchIndex = -1;

    for (let i = 0; i < short.length; i++) {
        const char = short[i];
        const foundIndex = long.indexOf(char, lastMatchIndex + 1);

        if (foundIndex !== -1) {
            matchedIndices.add(foundIndex);

            // Reward consecutive matches
            if (foundIndex === lastMatchIndex + 1) {
                consecutiveBonus += 2; // Increase bonus for consecutive characters
            } else {
                consecutiveBonus += 1; // Smaller bonus for non-consecutive matches
            }

            lastMatchIndex = foundIndex;
        }
    }

    // Calculate the base score as the ratio of matched characters
    const baseScore = (matchedIndices.size / short.length) * 10;

    // Final score calculation with penalties for length differences and bonuses for consecutive matches
    const lengthPenalty = Math.abs(query.length - item.length);
    score = baseScore + consecutiveBonus - lengthPenalty;

    // Ensure score is not negative
    score = Math.max(0, score);

    return { word: item, score: score };
}

export function findWord(query, list) {
    const results = list.map((item) => match(query, item));
    results.sort((a, b) => b.score - a.score);
    return results[0].word;
}

export function findList(query, list, limit = 100) {
    const results = list.map((item) => match(query, item));
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit);
}
