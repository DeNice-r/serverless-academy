import * as readline from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';

const rl = readline.createInterface({
    input: input,
    output: output
});

// beta 1 alpha 9 delta Kappa 3 gamma 4 zeta 5 eta 11 epsilon -7 iota -8 theta -8 kappa Beta

await main().then(() => rl.close());

async function main() {
    let values, words, numbers, choice,
        question = "Please enter a few words or numbers separated by a space: ",
        menu = "Please choose an option:\n" +
            "1. Sort words alphabetically\n" +
            "2. Show numbers from lesser to greater\n" +
            "3. Show numbers from bigger to smaller\n" +
            "4. Display words in ascending order by number of letters in the word\n" +
            "5. Show only unique words\n" +
            "6. Display only unique values from the set of words and numbers\n" +
            "exit. Stop the application\n" +
            "Your choice: ";

    do {
        values = undefined;
        while (typeof values !== "object" || values.length < 2) {
            await rl.question(question).then((answer) => {
                values = answer.split(" ");
                words = [];
                numbers = [];

                for (let i = 0; i < values.length; i++) {
                    if (isNaN(values[i]))
                        words.push(values[i]);
                    else {
                        values[i] = +values[i];
                        numbers.push(+values[i]);
                    }
                }
            });

            if (values.length < 2)
                if (values[0] === "exit")
                    return;
                else
                    console.log("Please enter at least two values.");
        }


        choice = await rl.question(menu);

        switch (choice) {
            case "1":
                words.sort((a, b) => a.localeCompare(b));
                console.log(words)
                break;
            case "2":
                numbers.sort((a, b) => a - b)
                console.log(numbers)
                break;
            case "3":
                numbers.sort((a, b) => b - a)
                console.log(numbers)
                break;
            case "4":
                words.sort((a, b) => a.length - b.length)
                console.log(words)
                break;
            case "5":
                // In context of words, words written in non-identical cases are considered identical.
                // Yet to preserve the original case of one of the copies, the words are not converted to lowercase.
                let uniqueWords = {};

                let lcWord;
                for (let i = 0; i < words.length; i++) {
                    lcWord = words[i].toLowerCase();
                    if (!(lcWord  in uniqueWords))
                        uniqueWords[lcWord] = words[i];
                }

                console.log(Object.values(uniqueWords))
                break;
            case "6":
                // In context of values, words written in non-identical cases are considered different
                values = [...new Set(values)];
                console.log(values)
                break;
            case "exit":
                break;
            default:
                console.log("Chosen option must be valid.");
        }

    } while (choice !== "exit");
}
