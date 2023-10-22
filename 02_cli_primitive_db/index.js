import inquirer from 'inquirer';
import fs from 'fs';


let db_path = 'db.txt';
let questions = [{type: 'input', name: 'name', message: "Enter the user's name. To Cancel press ENTER: "},
    {
        type: 'list',
        name: 'gender',
        choices: ['male', 'female'],
        message: "Choose the user's gender: "
    },
    {type: 'number', name: 'age', message: "Enter the user's age: "},
    {type: 'confirm', name: 'search', message: "Would you like to search for a specific user in the DB?: "},
    {type: 'input', name: 'name', message: "Enter the name of the user you wanna find in the DB: "},
]


function read_db() {
    if (!fs.existsSync(db_path)) {
        fs.writeFileSync(db_path, '[]');
        return [];
    }
    return JSON.parse(fs.readFileSync(db_path, 'utf8'));
}

function write_db(records) {
    fs.writeFileSync(db_path, JSON.stringify(records));
}

function add_user(user) {
    let records = read_db();
    records.push(user);
    write_db(records);
}

let new_user;
do {
    await inquirer.prompt(questions[0])
        .then(async answers => {
            new_user = answers;
            if (answers.name !== '') {
                await inquirer.prompt(questions.slice(1, 3))
                    .then(async answers => {
                        new_user = {...new_user, ...answers};
                        add_user(new_user);
                    })
            }
        })
} while (new_user.name !== '')

await inquirer.prompt(questions[3]).then(async answers => {
    if (answers.search) {
        let records = read_db();
        console.log(records);
        await inquirer.prompt(questions[4]).then(answers => {
            let user = records.find(user => user.name.toLowerCase() === answers.name.toLowerCase());
            if (user) {
                console.log(`User ${user.name} was found:`);
                console.log(user);
            } else {
                console.log('User not found.');
            }
        })
    }
})
