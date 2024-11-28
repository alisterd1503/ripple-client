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
import FavouritesPage from './pages/FavouritesPage';
import { logoutUser } from './api/AuthenticationAPI/logoutUser';


function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

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

  useEffect(() => {
    const handleBeforeUnload = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        await logoutUser();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/settings" element={<SettingsPage toggleTheme={toggleTheme} mode={mode} />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
