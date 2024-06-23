const csvParser = require('./csvParser');
const db = require('./db');
const calculator = require('./calculateAgeDistribution');

(async() => {
    await db.createTable();
    const users = await csvParser.parseCSV();
    await db.insertData(users);
    await calculator.calculateAgeDistribution();
})()