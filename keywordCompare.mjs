import { extractWordsEnglish } from "./src/words.mjs";
import keyword_extractor from "./keyword-extractor/index.mjs";
import { readFileSync, writeFileSync } from "fs";

const passage = `"I'm experiencing frequent internet disconnections throughout the day. The connection drops randomly, and it's affecting my ability to work. Can you check my line for issues or send a technician to resolve this?"`;
console.log(extractWordsEnglish(passage));
console.log(keyword_extractor.extract(passage));

const testData = readFileSync("./test/keyword_tests.txt", {
    encoding: "utf8",
    flag: "r",
});

const texts = testData.split("\n").map((item) => item.trim());
let str = "custom, keyword-extractor from npm\n";

texts.forEach(
    (text) =>
        (str = str.concat(
            `|"${extractWordsEnglish(text).join(",")}"|, |"${keyword_extractor
                .extract(text)
                .join(",")}"|\n`
        ))
);

writeFileSync("keywordsCompare.csv", str);
