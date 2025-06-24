import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPost } from '../api/posts'


const NewPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await setPost({ title, content });
            navigate('/');
        } catch (error) {
            console.error('게시글 작성 실패', error);
            alert('에러 발생: 게시글을 작성할 수 없습니다.');
        }
    };

    return (
        <div>
            <h2>새 게시글 작성</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>내용</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <button type="submit">작성하기</button>
            </form>
        </div>
    )
}

export default NewPost;