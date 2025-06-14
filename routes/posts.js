const express = require('express');
const router = express.Router();
const db = require('../db');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

router.post('/', isLoggedIn, async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.session.user.id;

        if (!title || !content) {
            return res.status(400).json({ message: '제목과 내용을 입력해주세요.' });
        }

        const query = 'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)';
        const result = await db.execute(query, [title, content, userId]);

        res.status(201).json({ message: '글이 작성되었습니다.', postId: result.insertId });
    } catch (error) {
        console.error('글 작성 실패:', error);
        res.status(500).json({ message: '서버 오류로 인해 글 작성에 실패했습니다.' });
    }
})

module.exports = router;