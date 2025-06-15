const express = require('express');
const router = express.Router();
const db = require('../db');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

/**
 * GET
 */

router.get('/', async (req, res) => {
    try {
        const query = `
        SELECT posts.id, posts.title, posts.created_at, users.nickname
        FROM posts
        JOIN users ON posts.user_id = users.id
        ORDER BY posts.created_at DESC
        `;

        const [rows] = await db.promise().query(query);

        res.status(200).json(rows);
    } catch (error) {
        console.error('게시글 목록 조회 실패:', error);
        res.status(500).json({ message: '서버 오류' });
    }
})

/**
 * POST
 */

router.post('/', isLoggedIn, async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.session.user.id;

        if (!title || !content) {
            return res.status(400).json({ message: '제목과 내용을 입력해주세요.' });
        }

        const sql = 'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)';
        const result = await db.execute(sql, [title, content, userId]);

        res.status(201).json({ message: '글이 작성되었습니다.', postId: result.insertId });
    } catch (error) {
        console.error('글 작성 실패:', error);
        res.status(500).json({ message: '서버 오류로 인해 글 작성에 실패했습니다.' });
    }
})

module.exports = router;