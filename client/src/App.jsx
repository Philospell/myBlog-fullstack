import { Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<PostList />}></Route>
            <Route path='/posts/:id' element={<PostDetail />}></Route>
        </Routes>
    )
}