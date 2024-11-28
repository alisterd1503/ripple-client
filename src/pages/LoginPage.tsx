import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Alert,
  Link,
  Stack,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthModel } from '../models/AuthModel';
import { checkLogin } from '../api/AuthenticationAPI/checkLogin';
import PasswordInput from '../components/Reusable/PasswordInput';

function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateLogin = async () => {
    setLoading(true);
    const body: AuthModel = {
      username: username,
      password: password,
    };
    try {
      const result = await checkLogin(body);
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
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            validateLogin();
          }}
          sx={{ mt: 3 }}
        >
          <TextField
            required
            fullWidth
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            password={password}
            label="Password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading} // Disable button while loading
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Forgot Password
            </Link>

            <Link component={RouterLink} to="/register" variant="body2">
              Sign Up
            </Link>
          </Stack>

          {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
