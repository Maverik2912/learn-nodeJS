const {readDB} = require('./DBoperations');
const validator = async (user) => {
    const db = await readDB();

    return (JSON.stringify(Object.keys(db[0])) === JSON.stringify(Object.keys(user))) &&
        (user.name.length > 3 && user.age > 0 && ['male', 'female'].includes(user.gender));
}

module.exports = {
    validator
}