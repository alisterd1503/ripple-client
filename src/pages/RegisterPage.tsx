import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, Grid2, Alert, Link, Stack } from '@mui/material';
import axios from 'axios';
import validatePassword from '../utils/validatePassword';
import validateUsername from '../utils/validateUsername';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
}

export default function SignUpPage() {
  const [usedNames, setUsedNames] = useState<string[]>([]);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch the usernames from the API
    axios.get<User[]>('http://localhost:5002/api/getUsers')
      .then(response => setUsedNames(response.data.map(user => user.username)))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = () => {
    const usernameCheck = validateUsername(username, usedNames);
    const passwordCheck = validatePassword(password);

    if (usernameCheck.valid && passwordCheck.valid) {
      axios.post('http://localhost:5002/api/register', { username, password })
        .then(() => {
          setUsername('');
          setPassword('');
          setMessage('Registration successful!');
          navigate('/');
        })
        .catch(error => setMessage('Error registering user.'));
    } else {
      setMessage(usernameCheck.valid ? passwordCheck.message : usernameCheck.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Typography variant="h4" gutterBottom>
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
  );
}
