import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, Grid2, Alert, Link, Stack } from '@mui/material';
import validatePassword from '../utils/validatePassword';
import validateUsername from '../utils/validateUsername';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../api/getAllUsers';
import { registerUser } from '../api/registerUser';
import { AuthModel } from '../models/AuthModel';

export default function SignUpPage() {
  const [usedNames, setUsedNames] = useState<string[]>([]);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsernames = async () => {
        try {
            const users = await getAllUsers();
            setUsedNames(users.map(user => user.username));
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    fetchUsernames();
  }, []);

  const handleSubmit = async () => {
    const usernameCheck = validateUsername(username, usedNames);
    const passwordCheck = validatePassword(password);

    if (usernameCheck.valid && passwordCheck.valid) {
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
