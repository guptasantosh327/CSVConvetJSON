const db = require('./db');

exports.calculateAgeDistribution = async() => {
    const res = await db.getQueryData('SELECT age FROM users');

    const ages = res.rows.map(row => row.age);

    const distribution = {
        '<20': 0,
        '20-40': 0,
        '40-60': 0,
        '>60': 0,
    };
    const temp = [];


    ages.forEach(age => {
        if (age < 20) distribution['<20']++;
        else if (age <= 40) distribution['20-40']++;
        else if (age <= 60) distribution['40-60']++;
        else distribution['>60']++;
    });

    const total = ages.length;
    for (let key in distribution) {
        distribution[key] = parseFloat(((distribution[key] / total) * 100).toFixed(2));
        temp.push({ 'Age-Group': key, '% Distribution': distribution[key]})
    }

    console.table(temp)
}
