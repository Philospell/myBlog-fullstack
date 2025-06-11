const express = require('express');
const router = express.Router();
const db = require('../db');

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

module.exports = router;