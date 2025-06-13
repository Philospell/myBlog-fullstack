const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

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
            return res.status(401).json({ error: '존재하지 않는 사용자입니다.' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
        }

        // TODO: 로그인 상태 저장 (세션 or JWT)
        res.status(200).json({ message: '로그인 성공', userId: user.id, nickname: user.nickname });
    })
});

module.exports = router;