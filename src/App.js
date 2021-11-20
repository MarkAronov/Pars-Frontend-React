import React from 'react';
import { ProvideAuth } from "./components/Auth"
import ThemeEngine from './components/ThemeEngine'

export default function App() {
    return (
        <ProvideAuth>
            <ThemeEngine />
        </ProvideAuth>
    );
}