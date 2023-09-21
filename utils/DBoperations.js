const path = require('path');
const fs = require('fs/promises');

const dbPath = path.resolve('db.json');

const readDB = async () => {
    return JSON.parse(await fs.readFile(dbPath, {encoding: 'utf-8'}));
}

const writeDB = async (db) => {
    await fs.writeFile(dbPath, JSON.stringify(db));
}

module.exports = {
    readDB,
    writeDB
}


