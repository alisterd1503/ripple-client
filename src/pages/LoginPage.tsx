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
import PasswordInput from '../components/Reusable/PasswordInput';
import { loginUser } from '../api/AuthenticationAPI/loginUser';
import React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import { JSX } from 'react/jsx-runtime';
import chatBackground from '../ripplebg.png';

function SlideTransition(props: JSX.IntrinsicAttributes & SlideProps) {
  return <Slide {...props} direction="right" />;
}

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

  const validateLogin = async () => {
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
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${chatBackground})`,
        backgroundSize: "auto",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        backgroundColor: "transparent",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'primary',
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight={'bold'} gutterBottom>
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
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
  
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
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
  
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          TransitionComponent={SlideTransition}
        >
          <Alert
            onClose={handleClose}
            severity="info"
            variant="filled"
            sx={{ width: "100%" }}
          >
            This may take a moment, please wait.
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
  
}

export default LoginPage;
