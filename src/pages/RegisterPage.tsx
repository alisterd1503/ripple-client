import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthModel } from '../models/AuthModel';
import { registerUser } from '../api/AuthenticationAPI/registerUser';
import AuthForm from '../components/Reusable/AuthForm';

export default function SignUpPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleSubmit = async () => {

    const registeration: AuthModel = {
      username: username,
      password: password
    }

    const result = await registerUser(registeration);
    
    if (result.success) {
        setUsername('');
        setPassword('');
        setMessage(result.message);
        navigate('/');
    } else {
        setMessage(result.message);
    }

  };

  return (
    <AuthForm 
      type='register' 
      username={username} 
      password={password}
      message={message} 
      setUsername={setUsername} 
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
}
