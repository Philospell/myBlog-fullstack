const express = require('express');
const cors = require('cors')
require('dotenv').config();
const session = require('express-session');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');

const app = express();
const port = 3000;

app.use(express.json())

// CORS 처리
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}))

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
app.use('/posts', postsRoutes);

/**
 * 전역 404, 오류 처리 함수 추가
 */
app.use((req, res, next) => {
    res.status(404).json({ message: '요청하신 페이지를 찾을 수 없습니다.' })
})

app.use((err, req, res, next) => {
    console.error('[서버 오류]', err);
    res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' })
})