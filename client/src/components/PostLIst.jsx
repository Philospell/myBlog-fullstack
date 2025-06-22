import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api/posts';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts()
            .then(data => setPosts(data))
            .catch((err) => console.error('게시글 목록 불러오기 실패:', err));
    }, []);

    return (
        <div>
            <h2>게시글 목록</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}><strong>{post.title}</strong></Link> - {post.content}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PostList;