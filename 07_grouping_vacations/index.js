import fs from 'fs';


const path = './data.json';


let data = JSON.parse(fs.readFileSync(path, 'utf8'));
let newData = {};

for (let i = 0; i < data.length; i++) {
    if (data[i].user._id in newData) {
        newData[data[i].user._id].vacations.push({startDate: data[i].startDate, endDate: data[i].endDate});
    } else {
        newData[data[i].user._id] = {
            userId: data[i].user._id,
            userName: data[i].user.name,
            vacations: [
                {startDate: data[i].startDate, endDate: data[i].endDate}
            ]
        };
    }
}

fs.writeFileSync('new_data.json', JSON.stringify(Object.values(newData)));

console.log('Data has been successfully converted!')
