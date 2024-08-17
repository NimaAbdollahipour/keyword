export function simpleFilter(pattern, array) {
    return String(array.filter((str) => test(pattern, str))[0]).trim();
}

export function test(pattern, str) {
    return match(pattern, str) !== null;
}

export function match(pattern, str, opts = {}) {
    let patternIdx = 0,
        result = [],
        len = str.length,
        totalScore = 0,
        currScore = 0,
        pre = opts.pre || "",
        post = opts.post || "",
        compareString = opts.caseSensitive ? str : str.toLowerCase(),
        ch;

    pattern = opts.caseSensitive ? pattern : pattern.toLowerCase();

    for (let idx = 0; idx < len; idx++) {
        ch = str[idx];
        if (compareString[idx] === pattern[patternIdx]) {
            ch = pre + ch + post;
            patternIdx += 1;
            currScore += 1 + currScore;
        } else {
            currScore = 0;
        }
        totalScore += currScore;
        result.push(ch);
    }

    if (patternIdx === pattern.length) {
        totalScore = compareString === pattern ? Infinity : totalScore;
        return { rendered: result.join(""), score: totalScore };
    }

    return null;
}

export function filter(pattern, arr, opts = {}) {
    if (!arr || arr.length === 0) {
        return [];
    }
    if (typeof pattern !== "string") {
        return arr;
    }
    return arr
        .reduce((prev, element, idx) => {
            let str = element;
            if (opts.extract) {
                str = opts.extract(element);
            }
            const rendered = match(pattern, str, opts);
            if (rendered != null) {
                prev.push({
                    string: rendered.rendered,
                    score: rendered.score,
                    index: idx,
                    original: element,
                });
            }
            return prev;
        }, [])
        .sort((a, b) => {
            const compare = b.score - a.score;
            return compare !== 0 ? compare : a.index - b.index;
        });
}
