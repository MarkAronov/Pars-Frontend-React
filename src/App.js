import React from 'react';
import { ProvideAuth } from "./hooks/useAuth"
import ThemeEngine from './components/organisms/ThemeEngine'

export default function App() {
    return (
        <ProvideAuth>
            <ThemeEngine />
        </ProvideAuth>
    );
}