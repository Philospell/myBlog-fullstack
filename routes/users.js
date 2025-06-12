const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    db.query('SELECT id, email, nickname, role FROM users', (err, results) => {
        if (err) {
            console.error('쿼리 에러', err);
            res.status(500).json({ error: 'DB 조회 실패' });
        } else {
            res.json(results);
        }
    });
});

router.post('/', async (req, res) => {
    const { email, password, nickname } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: '이메일과 비밀번호는 필수입니다.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (email, password_hash, nickname) VALUES (?, ?, ?)';
        db.query(query, [email, hashedPassword, nickname || null], (err, result) => {
            if (err) {
                console.error('사용자 등록 실패:', err);
                return res.status(500).json({ error: 'DB 저장 중 오류 발생' });
            }

            res.status(201).json({ message: '사용자 등록 완료', userId: result.insertId });
        });
    } catch (err) {
        console.error('비밀번호 해싱 실패:', err);
        res.status(500).json({ error: '해싱 중 오류 발생' });
    }
});

module.exports = router;