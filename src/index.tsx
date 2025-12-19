import { Reset } from 'styled-reset';
import { ThemeProvider } from 'styled-components';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Typography from './components/Typography';
import { LightTheme, DarkTheme } from './themes';

function Root() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDark));
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
        <React.StrictMode>
            <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
                <Reset/>
                <Typography/>
                <App isDark={isDark} onThemeToggle={toggleTheme} />
            </ThemeProvider>
        </React.StrictMode>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));
