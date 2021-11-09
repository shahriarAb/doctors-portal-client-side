import { Container, Grid, Typography, TextField, Button, Box, CircularProgress, Alert, AlertTitle } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import loginimg from '../../../images/login.png';
import useAuth from '../../../hooks/useAuth';

const Signup = () => {
    const [registerData, setRegisterData] = useState({});
    const location = useLocation();
    const history = useHistory();

    const { user, registerUser, signInWithGoogle, isLoading, authError, } = useAuth();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newRegisterData = { ...registerData };
        newRegisterData[field] = value;
        setRegisterData(newRegisterData);
    }

    const handleLoginSubmit = e => {
        if (registerData.password !== registerData.password2) {
            alert('password did not match!');
            return
        }
        registerUser(registerData.userName, registerData.email, registerData.password, location, history);
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={12} md={6}>
                    <Box sx={{ boxShadow: 4, borderRadius: 1, py: 6 }}>
                        {!isLoading && <form onSubmit={handleLoginSubmit}>
                            <Typography sx={{ fontWeight: 600 }} variant="h5" color="info.main">
                                Create An Account(Register)
                            </Typography>
                            <TextField
                                name="userName"
                                onBlur={handleOnBlur}
                                sx={{ width: '300px', m: 1 }}
                                id="standard-basic"
                                label="User Name"
                                variant="standard"
                            />
                            <TextField
                                name="email"
                                onBlur={handleOnBlur}
                                sx={{ width: '300px', m: 1 }}
                                id="standard-basic"
                                label="Email"
                                type="email"
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
                            <TextField
                                name="password2"
                                onBlur={handleOnBlur}
                                sx={{ width: '300px', m: 1 }}
                                id="standard-basic"
                                label="Re-enter Password"
                                type="password"
                                variant="standard"
                            />
                            <br />
                            <Box sx={{ display: 'flex', justifyContent: 'right', mr: 15 }}>
                                <NavLink to="/login">
                                    <Button variant="text">Already Registered? Login here.</Button>
                                </NavLink>
                            </Box>
                            <Button type="submit" sx={{ fontSize: '16px', width: '300px', mt: 2, backgroundColor: 'info.main' }} variant="contained">Register</Button>
                            <p>--------------------or---------------------</p>
                            <Button onClick={handleGoogleSignIn} sx={{ fontSize: '16px', width: '300px', backgroundColor: 'warning.main' }} variant="contained">Google Sign In</Button>
                        </form>}


                        {user.email && <Alert sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} severity="success">
                            <AlertTitle>Success</AlertTitle>
                            User Created Successfully.
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

export default Signup;