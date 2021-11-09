import { Container, Grid, Typography, TextField, Button, Box, CircularProgress, Alert, AlertTitle } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import loginimg from '../../../images/login.png'

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, signInWithGoogle, isLoading, authError } = useAuth();
    const location = useLocation();
    const history = useHistory();
    document.title = "Login - Doctors Portal Dental Clinic";

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);

        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={12} md={6}>
                    <Box sx={{ boxShadow: 4, borderRadius: 1, py: 11 }}>
                        {!isLoading && <form onSubmit={handleLoginSubmit}>
                            <Typography sx={{ fontWeight: 600 }} variant="h5" color="info.main">
                                Login
                            </Typography>
                            <TextField
                                name="email"
                                onBlur={handleOnBlur}
                                sx={{ width: '300px', m: 1 }}
                                id="standard-basic"
                                label="Email"
                                variant="standard"
                            />
                            <TextField
                                name="password"
                                onBlur={handleOnBlur}
                                sx={{ width: '300px', m: 1 }}
                                id="standard-basic"
                                label="Password"
                                type="password"
                                variant="standard"
                            />
                            <br />
                            <Box sx={{ display: 'flex', justifyContent: 'right', mr: 15 }}>
                                <NavLink to="/signup">
                                    <Button variant="text">New User? Register here.</Button>
                                </NavLink>
                            </Box>
                            <Button type="submit" sx={{ fontSize: '16px', width: '300px', mt: 4, backgroundColor: 'info.main' }} variant="contained">Login</Button>
                            <p>--------------------or---------------------</p>
                            <Button onClick={handleGoogleSignIn} sx={{ fontSize: '16px', width: '300px', backgroundColor: 'warning.main' }} variant="contained">Google Sign In</Button>
                        </form>}

                        {user.email && <Alert sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Login Successfull
                        </Alert>}

                        {authError && <Alert sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {authError}
                        </Alert>}
                    </Box>

                    {isLoading && <CircularProgress color="info" />}
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={loginimg} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;