import { Box, TextField, Button, Typography, Grid2, Alert, Link, Stack, styled, Snackbar, SlideProps, Slide, SnackbarCloseReason, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import chatBackground from '../../ripplebg.png';
import rippleLogo from '../../ripplebg.png'
import MuiCard from '@mui/material/Card';
import PasswordInput from './PasswordInput';s

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(1),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

function SlideTransition(props: JSX.IntrinsicAttributes & SlideProps) {
    return <Slide {...props} direction="right" />;
}

interface AuthFormProps {
    type: 'login' | 'register',
    username: string,
    password: string,
    message: string | null,
    loading?: boolean,
    open?: boolean,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    handleSubmit: () => void,
    handleClose?: (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => void,
}

export default function AuthForm({
    type, 
    username, 
    password, 
    message,
    loading,
    open,
    setPassword, 
    setUsername, 
    handleSubmit,
    handleClose,
}:AuthFormProps) {

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${chatBackground})`,
        backgroundSize: "auto",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        backgroundColor: "#075e54",
      }}
    >
    <SignUpContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center',   
          }}
        >
          <Box
            component="img"
            src={rippleLogo}
            alt="Ripple Logo"
            sx={{
              width: 200,
              height: 'auto',
              filter: 'invert(1)',
              opacity: 0.9,
            }}
          />
        </Box>

        <Typography variant="h6" fontSize={14} gutterBottom align='center' sx={{opacity: 0.8, mb: 5}}>
          Start a conversation, make a wave.
        </Typography>

        <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginBottom: -2}}
          >
            {type === 'login' ? 'Login' : 'Sign up'}
          </Typography>

        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ mt: 3}}>
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

            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              password={password}
              label="Password"
            />

          </Grid2>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : (type === 'login' ? 'Login' : 'Sign up')}
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
              to={type === 'login' ? "/register" : "/" }
              variant="body2"
            >
              {type === 'login' ? 'Sign Up' : 'Login'}
            </Link>
          </Stack>

          {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
        </Box>
      </Card>
    </SignUpContainer>
    {type === 'login' && (
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
    )}
    </div>
  );
}
