import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactsPage from './pages/ContactsPage';
import LoginPage from './pages/LoginPage';
import MessagesPage from './pages/MessagesPage';
import RegisterPage from './pages/RegisterPage';
import SettingsPage from './pages/SettingsPage';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

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
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
