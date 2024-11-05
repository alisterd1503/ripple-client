import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContactsPage from './components/pages/ContactsPage';
import LoginPage from './components/pages/LoginPage';
import MessagesPage from './components/pages/MessagesPage';
import RegisterPage from './components/pages/RegisterPage';

interface User {
  id: number;
  username: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      setCurrentUser(currentUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
