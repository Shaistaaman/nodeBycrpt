const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.json());

const users = []
app.get('/users', (req, res) => {

    console.log(users)
    res.json(users)
});

app.post('/users', async (req, res) => {
    const hashedpas = await bcrypt.hash(req.body.password, 10)
    console.log(hashedpas)

    const user = { name: req.body.name, password: hashedpas }
    users.push(user)
    res.status(201).send('user created')
})

app.post('/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
        if (user) {
        await bcrypt.compare(req.body.password, user.password)
        console.log('success')
    }
    else
    console.log('not allowed')
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});