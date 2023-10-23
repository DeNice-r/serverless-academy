import {readdir, readFile} from 'fs/promises';


const start = Date.now();
let data = {}, occurrence_count;

await readdir('./data').then(async files => {
        let promises = [];
        for (let file of files) {
            promises.push(
                readFile(`./data/${file}`, 'utf8').then(content => {
                    // Make sure to remove duplicates as they carry no value for this task
                    data[file] = [...new Set(content.split('\n'))];
                }));
        }
        await Promise.all(promises);
    }
)


console.log(`Time taken to load the data: ${Date.now() - start}ms`);
console.log(`Number of unique usernames: ${uniqueValues()}`);
console.log(`Number of usernames that exist in all files: ${existInAllFiles()}`);
console.log(`Number of usernames that exist in at least ten files: ${existInAtLeastTen()}`);
console.log(`Overall time taken: ${Date.now() - start}ms`);


function getOccurrenceCount() {
    if (occurrence_count !== undefined)
        return occurrence_count;

    occurrence_count = {};
    for (const [key, list] of Object.entries(data)) {
        for (const value of list) {
            if (value in occurrence_count)
                occurrence_count[value]++;
            else
                occurrence_count[value] = 1;
        }
    }

    return occurrence_count;
}


function hasAtLeastNOccurrences(n) {
    let occurrence_count = getOccurrenceCount();
    let result = 0;
    for (const [key, value] of Object.entries(occurrence_count)) {
        if (value >= n)
            result++;
    }
    return result;
}


function uniqueValues() {
    return Object.keys(getOccurrenceCount()).length;
}

function existInAllFiles() {
    return hasAtLeastNOccurrences(Object.keys(data).length);
}

function existInAtLeastTen() {
    return hasAtLeastNOccurrences(10);
}
