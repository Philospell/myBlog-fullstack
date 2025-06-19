const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

/**
 * GET
 */

router.get('/profile', isLoggedIn, (req, res) => {
    res.json({
        message: '접근 성공', user: req?.session?.user
    });
})


/**
 * POST
 */

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: '이메일과 비밀번호를 모두 입력하세요' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('DB 조회 오류:', err);
            return res.status(500).json({ error: '서버 오류' });
        }

        if (results.length === 0) {
            console.log(`[Login Failed] 존재하지 않는 사용자: ${email}`);
            return res.status(401).json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' });
        }

        if (req?.session?.user && (req?.session?.user?.email === email)) {
            return res.status(200).json({ message: '이미 로그인된 상태입니다.' });
        } else if (req?.session?.user && (req?.session?.user?.email !== email)) {
            return res.status(403).json({ message: '이미 다른 계정으로 로그인된 상태입니다. 먼저 로그아웃하세요.' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            console.log(`[Login Failed] 비밀번호 불일치: ${email}`);
            return res.status(401).json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' });
        }

        // 로그인 상태 저장 (세션 or JWT)
        req.session.user = {
            id: user.id,
            email: user.email,
            nickname: user.nickname
        }

        res.status(200).json({ message: '로그인 성공', userId: user.id, nickname: user.nickname });
    })
});

router.post('/logout', isLoggedIn, (req, res) => {
    res.clearCookie('connect.sid');
    req.session.destroy(() => {
        res.json({ message: '로그아웃 완료' });
    })
})

module.exports = router;