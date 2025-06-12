const express = require('express');
require('dotenv').config();
const userRoutes = require('./routes/users');

const app = express();
const port = 3000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('서버가 잘 돌아갑니당.');
});

app.listen(port, () => {
    console.log(`서버 실행 중: http://localhost:${port}`);
})

app.use('/users', userRoutes);