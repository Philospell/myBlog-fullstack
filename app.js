const express = require('express');
require('dotenv').config();
const session = require('express-session');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

app.use(express.json())

// 아래 내용에 의해 express-session이 session에 변화가 있으면 미들웨어로 set-cookie 등 세션 관리를 알아서 처리 해준다.
app.use(
    session({
        secret: 'myblog-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 // 1시간
        }
    })
);

app.get('/', (req, res) => {
    res.send('서버가 잘 돌아갑니당.');
});

app.listen(port, () => {
    console.log(`서버 실행 중: http://localhost:${port}`);
})

app.use('/users', userRoutes);
app.use('/auth', authRoutes);