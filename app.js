const express = require('express');

const {readDB, writeDB} = require('./utils/DBoperations');
const {validator} = require('./utils/validator');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const db = await readDB();
    res.status(200)
        .json(db);
});

app.get('/users/:id', async(req, res) => {
    const db = await readDB();
    let {id} = req.params;
    id = +id;

    if(id > 0 && id <= db.length - 1) {
        res.status(200).json({results: db[id - 1]});
    } else {
        res.status(404).json({results: 'user has not been found'});
    }
})

app.post('/users', async (req, res) => {
    const db = await readDB();
    const newUser = req.body;
    const isValid = await validator(newUser);

    if (isValid) {

        db.push(newUser);
        await writeDB(db);
        res.status(201).json({results: newUser});

    } else {
        res.status(400).json({results: 'Wrong data'})
    }
});

app.put('/users/:id', async (req, res) => {
    const db = await readDB();
    let {id} = req.params;
    id = +id;
    const userForUpdate = req.body;
    const isValid = await validator(userForUpdate);

    if (isValid && id <= db.length - 1 && id > 0) {

        db[id - 1] = userForUpdate;
        await writeDB(db);
        res.status(200)
            .json({results: userForUpdate});

    } else if (id > db.length - 1) {
        res.status(404)
            .json({results: 'User has not been found'});
    } else {
        res.status(400)
            .json({results: 'Wrong data'});
    }
});

app.delete('/users/:id', async(req, res) => {
    const db = await readDB();
    const {id} = req.params;

    if(+id <= db.length && id > 0) {

        db.splice(id - 1, 1);
        await writeDB(db);
        res.status(200).json({results: 'user has been deleted'});

    } else {
        res.status(404).json({results: 'user has not been found'});
    }
})


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`);
})
