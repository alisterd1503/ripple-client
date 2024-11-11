import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactsPage from './pages/ContactsPage';
import LoginPage from './pages/LoginPage';
import MessagesPage from './pages/MessagesPage';
import RegisterPage from './pages/RegisterPage';
import SettingsPage from './pages/SettingsPage';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import ProfilePage from './pages/ProfilePage';


function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    const storedMode = localStorage.getItem('mode') as 'light' | 'dark' | null;
    if (storedMode === 'light' || storedMode === 'dark') {
      setMode(storedMode);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => {
        const newMode = prevMode === 'dark' ? 'light' : 'dark';
        localStorage.setItem("mode", newMode);
        return newMode;
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/settings" element={<SettingsPage toggleTheme={toggleTheme} mode={mode} />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
