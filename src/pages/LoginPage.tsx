import { useState } from 'react';
import { Container, Box, Typography, Grid2, TextField, Button, Alert, Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../api/checkLogin';
import { AuthModel } from '../models/AuthModel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function LoginPage() {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [seePassword, setSeePassword] = useState(false) 
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

        <Box component="form" onSubmit={(e) => { e.preventDefault(); validateLogin(); }} sx={{ mt: 3 }} >
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
                type={seePassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        disableRipple
                        onClick={() => setSeePassword(!seePassword)}
                        edge="end"
                        sx={{
                          '&:hover': {
                            backgroundColor: 'transparent',
                            opacity: 0.7,
                          },
                        }}
                      >
                        {seePassword ? <VisibilityIcon sx={{height: '20px', width: '20px', marginRight: '10px'}}/> : <VisibilityOffIcon sx={{height: '20px', width: '20px', marginRight: '10px'}}/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
