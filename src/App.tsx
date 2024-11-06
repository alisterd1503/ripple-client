import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactsPage from './components/pages/ContactsPage';
import LoginPage from './components/pages/LoginPage';
import MessagesPage from './components/pages/MessagesPage';
import RegisterPage from './components/pages/RegisterPage';

interface User {
  id: number;
  username: string;
}

function App() {
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
