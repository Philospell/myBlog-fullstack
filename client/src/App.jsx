import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';
import Login from './components/Login';
import Header from './components/layout/Header';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<PostList />} />
                <Route path='/login' element={<Login />} />
                <Route path='/posts/:id' element={<PostDetail />} />
                <Route path='/new' element={<NewPost />} />
            </Routes>
        </BrowserRouter>
    )
}