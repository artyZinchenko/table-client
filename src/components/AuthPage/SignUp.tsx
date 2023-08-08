import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormEvent, useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import signupServices from '../../services/signup';
import { useNavigate } from 'react-router-dom';

interface Props {
    setSignInPage: (arg0: boolean) => void;
}

const SignUp = ({ setSignInPage }: Props) => {
    const navigate = useNavigate();
    const authContext = useAuthContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (!username || !email || !password) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [username, password, email]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setDisabled(true);

            if (!username || !email || !password) return;

            const signup = await signupServices.signup(
                username,
                email,
                password
            );
            if (!signup) return;

            await authContext.login(email, password);
        } finally {
            setDisabled(false);
        }
    };

    useEffect(() => {
        if (authContext.isAuthenticated) navigate('/table');
    }, [authContext]);

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component='h1' variant='h5'>
                    Sign up
                </Typography>
                <Box
                    component='form'
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete='username'
                                name='username'
                                required
                                fullWidth
                                id='username'
                                label='username'
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='new-password'
                            />
                        </Grid>
                    </Grid>
                    <Button
                        disabled={disabled}
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link variant='body2' className='pointer'>
                                <Box onClick={() => setSignInPage(true)}>
                                    Already have an account? Sign in
                                </Box>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;
