//-Path: "vite-extra-react-ssr-ts/src/App.tsx"
import Home from './pages/Home';
import About from './pages/About';
import Socket from './pages/Socket';
import Layout from './components/layout/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='socket' element={<Socket />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Route>
        </Routes>
    );
}
