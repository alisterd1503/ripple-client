import { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Grid2, Alert, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthModel } from '../models/AuthModel';
import { registerUser } from '../api/AuthenticationAPI/registerUser';
import chatBackground from '../ripplebg.png';

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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Typography variant="h4" fontWeight={'bold'} gutterBottom>
          Sign Up
        </Typography>

        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ mt: 3 }}>
          <Grid2 container spacing={2}>

            <Grid2 size={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
              />
            </Grid2>

            <Grid2 size={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
              />
            </Grid2>

          </Grid2>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Link
              component={RouterLink}
              to="/"
              variant="body2"
            >
              Login
            </Link>
          </Stack>

          {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
        </Box>
      </Box>
    </Container>
    </div>
  );
}
