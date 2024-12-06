import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthModel } from '../models/AuthModel';
import { loginUser } from '../api/AuthenticationAPI/loginUser';
import React from 'react';
import AuthForm from '../components/Reusable/AuthForm';
import { SnackbarCloseReason } from '@mui/material';

function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setOpen(true)
    const body: AuthModel = {
      username: username,
      password: password,
    };
    try {
      const result = await loginUser(body);
      if (result.success) {
        setMessage('');
        setUsername('');
        setPassword('');
        navigate('/contacts');
      } else {
        if (result.message) setMessage(result.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm 
      type='login' 
      username={username} 
      password={password}
      message={message}
      open={open}
      loading={loading}
      setUsername={setUsername} 
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
    />
  );
  
}

export default LoginPage;
