// -Path: "Vite-React-TypeScript/src/main.tsx"
import './index.css';
import App from './App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Providers from './components/layout/Providers';
import env from './secure/env';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Providers>
            <BrowserRouter basename={env.BASE}>
                <App />
            </BrowserRouter>
        </Providers>
    </StrictMode>,
);
