import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPost } from '../api/posts';

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        getPost(id).then(setPost);
    }, [id]);

    if (!post) return <>Loading...</>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>작성자: {post.nickname}</small>
        </div>
    )
}