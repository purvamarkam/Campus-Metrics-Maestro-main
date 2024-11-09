import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Box, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth, provider } from '../components/firebase';
import glogo from '../images/glogo.png';
import './LoginPage.css';

const allowedDomains = ['walchandsangli.ac.in'];

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [typedMessage, setTypedMessage] = useState('');
    const [messageColor] = useState('#f2ff00');
    const [openForgotPassword, setOpenForgotPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const welcomeMessage = "🎊Welcome To Campus Metrics Maestro🎊";
        let currentIndex = 0;

        const typeEffect = () => {
            if (currentIndex < welcomeMessage.length) {
                setTypedMessage((prev) => prev + welcomeMessage[currentIndex]);
                currentIndex++;
                setTimeout(typeEffect, 100);
            }
        };

        setTypedMessage('');
        typeEffect();

        return () => {
            currentIndex = welcomeMessage.length;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Please enter your credentials.');
            return;
        }

        const emailDomain = email.split('@')[1];

        if (!allowedDomains.includes(emailDomain)) {
            setErrorMessage('Invalid email domain. Please use an organizational email.');
            return;
        }

        try {
            if (isSignup) {
                await createUserWithEmailAndPassword(auth, email, password);
                setErrorMessage('Account created successfully! You can now log in.');
                setIsSignup(false);
            } else {
                await login(email, password);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate('/dashboard');
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setErrorMessage('');
    };

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setErrorMessage('Password reset email sent! Check your inbox.');
            setOpenForgotPassword(false);
        } catch (error) {
            console.error('Password reset error:', error);
            setErrorMessage('Failed to send password reset email. Please check your email address.');
        }
    };

    return (
        <Box 
            className="login-background" 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100vh', 
                padding: { xs: '20px', md: '0' }  
            }}
        >
            <Typography 
                variant="h3" 
                align="center" 
                sx={{ 
                    color: messageColor, 
                    marginBottom: 4, 
                    fontWeight: 'bold', 
                    textAlign: 'center', 
                    fontSize: { xs: '1.5rem', md: '2.1rem' }  
                }} 
            >
                {typedMessage}
            </Typography>

            <Paper 
                className="login-box" 
                elevation={6} 
                sx={{ 
                    width: { xs: '100%', sm: '80%', md: '450px' },  
                    padding: '30px', 
                    textAlign: 'center', 
                    margin: { xs: '10px', sm: '0' }  
                }}
            >
                <Typography variant="h4" align="center" marginBottom={2} sx={{ color: '#333' }}>
                    {isSignup ? 'Sign Up' : 'Login'}
                </Typography>
                
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        className="login-button"
                        fullWidth
                        sx={{ mt: 2, backgroundColor: '#4A90E2', color: '#fff' }} 
                    >
                        {isSignup ? 'Sign Up' : 'Login'}
                    </Button>
                </form>

                <Button
                    variant="outlined"
                    className="google-button"
                    fullWidth
                    sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}
                    onClick={handleGoogleSignIn}
                >
                    <img 
                        src={glogo} 
                        alt="Sign in with Google" 
                        style={{ width: '30px', height: '30px', marginRight: '8px' }} 
                    />
                    Sign in with Google
                </Button>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 3,
                        padding: '10px 20px',
                        borderTop: '1px solid #ddd', 
                    }}
                >
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => setIsSignup((prev) => !prev)} 
                        sx={{ 
                            color: '#333', 
                            fontSize: '0.875rem',
                            padding: '5px 15px',
                            border: '1px solid #4A90E2',
                            borderRadius: '8px',
                        }} 
                    >
                        {isSignup ? 'Already have an account? Login' : 'New user? Sign Up'}
                    </Button>

                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => setOpenForgotPassword(true)}
                        sx={{ 
                            color: '#333', 
                            fontSize: '0.875rem',
                            padding: '5px 15px',
                            border: '1px solid #4A90E2',
                            borderRadius: '8px',
                        }}
                    >
                        Forgot Password?
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={Boolean(errorMessage)}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={errorMessage}
            />

            {/* Forgot Password Dialog */}
            <Dialog open={openForgotPassword} onClose={() => setOpenForgotPassword(false)}>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your email address to receive a password reset link.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenForgotPassword(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleForgotPassword} color="primary">
                        Send Reset Link
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Login;
