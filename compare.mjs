import { readFileSync, writeFileSync } from "fs";
import { findWord } from "./src/finder.mjs";
import { simpleFilter } from "./src/fuzzy.mjs";
import FuzzySearch from "./src/fuzzySearch.mjs";
import findClosestWord from "./src/levenshtine.mjs";

const tests = readFileSync("./test/test_data.txt", {
    encoding: "utf8",
    flag: "r",
});
const data = readFileSync("./data/wordlist.txt", {
    encoding: "utf8",
    flag: "r",
});

const testList = tests.split("\n");
const dataList = data.split("\n");

let allResults = "orginial, finder, levenshtein, fuzzy, fuzzySearch\n";
for (let i = 0; i < testList.length; i++) {
    console.log(i + 1);
    const fuzzySearch = new FuzzySearch(dataList);
    const wordToFind = testList[i];
    const str = `${wordToFind.trim()},${findWord(
        wordToFind.trim(),
        dataList
    ).trim()} , ${findClosestWord(
        wordToFind.trim(),
        dataList
    ).trim()}, ${simpleFilter(wordToFind.trim(), dataList)}, ${fuzzySearch
        .search(wordToFind.trim())
        ?.trim()}\n`;
    allResults += str;
}

writeFileSync("./results2.csv", allResults);
