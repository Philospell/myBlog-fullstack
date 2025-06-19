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

router.get('/:id', async (req, res) => {
    const postId = req?.params?.id;

    try {
        const sql = 'SELECT * FROM posts WHERE id = ?';
        const [rows] = await db.promise().query(sql, [postId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error('게시글 조회 실패', error);
        return res.status(500).json({ message: '서버 오류로 게시글을 불러오지 못했습니다.' });
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

/**
 * PUT
 */

router.put('/:id', isLoggedIn, async (req, res, next) => {
    const postId = req.params.id;
    const { title, content } = req.body;

    try {
        const [rows] = await db.promise().query('SELECT * FROM posts WHERE id = ?', [postId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
        }

        if (rows[0].user_id !== req.session.user.id) {
            return res.status(403).json({ message: '수정 권한이 없습니다.' });
        }


        await db.promise().query('UPDATE posts SET title = ?, content = ?, updated_at = NOW() WHERE id = ?', [title, content, postId]);

        res.status(200).json({ message: '게시글이 수정되었습니다.' });
    } catch (error) {
        next(err);
    }
});

/**
 * DELETE
 */

router.delete('/:id', isLoggedIn, async (req, res, next) => {
    const postId = req.params.id;

    try {
        const [rows] = await db.promise().query('SELECT * FROM posts WHERE id = ?', [postId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
        }

        if (rows[0].user_id !== req.session.user.id) {
            return res.status(403).json({ message: '삭제 권한이 없습니다.' });
        }

        await db.promise().query('DELETE FROM posts WHERE id = ?', [postId]);
        res.status(200).json({ message: '게시글이 삭제되었습니다.' });
    } catch (error) {
        next(error);
    }
})

module.exports = router;