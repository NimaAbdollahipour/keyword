import { stopwords } from "../data/english_stop.mjs";

const specialCharacters = [
    ".",
    ",",
    "!",
    "?",
    ":",
    ";",
    "'",
    '"',
    //"-",
    "_",
    "(",
    ")",
    "[",
    "]",
    "{",
    "}",
    "/",
    "\\",
    "|",
    "&",
    "*",
    "#",
    "%",
    "+",
    "=",
    "@",
    "^",
    "~",
    "<",
    ">",
    "$",
    "¶",
    "§",
    "©",
    "®",
    "™",
    "°",
    "¤",
    "€",
    "£",
    "¥",
    "¦",
    "•",
    "†",
    "‡",
    "″",
    "‰",
    "µ",
    "§",
    " ",
    "\t",
    "\n",
    "\r",
];

export function extractWordsEnglish(str) {
    // const cleanedText = str.split("").map((char) => {
    //     if (
    //         (char <= "z" && char >= "a") ||
    //         (char <= "Z" && char >= "A") ||
    //         char === "-" ||
    //         char === "'"
    //     ) {
    //         return char;
    //     } else {
    //         return " ";
    //     }
    // });

    const cleanedText = str.split("").map((char) => {
        if (!specialCharacters.includes(char)) {
            return char;
        } else {
            return " ";
        }
    });

    const words = cleanedText
        .join("")
        .split(" ")
        .map((item) => item.trim())
        .filter((item) => item !== "");

    const wordsWithoutDuplicates = [...new Set(words)];

    const keywords = wordsWithoutDuplicates.filter(
        (item) => !stopwords.includes(item.toLowerCase())
    );

    return keywords;
}
