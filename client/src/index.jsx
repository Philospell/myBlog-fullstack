import React from 'react';
import ReactDOM from 'react-dom/client';
import PostList from './components/PostLIst';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<PostList />);