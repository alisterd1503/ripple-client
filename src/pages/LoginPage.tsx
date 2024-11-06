import { useState } from 'react';
import { Container, Box, Typography, Grid2, TextField, Button, Alert, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../api/checkLogin';
import { AuthModel } from '../models/AuthModel';

function LoginPage() {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const validateLogin = async () => {
    const body: AuthModel = {
        username: username,
        password: password
    }
    const result = await checkLogin(body);
    if (result.success) {
        setMessage('');
        setUsername('');
        setPassword('');
        navigate("/contacts");
    } else {
        if (result.message) setMessage(result.message)
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={(e) => { e.preventDefault(); validateLogin(); }} sx={{ mt: 3 }}>
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
            Login
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
            
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
            >
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
