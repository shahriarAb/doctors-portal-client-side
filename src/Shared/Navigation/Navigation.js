import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from './../../images/dental.png';

const Navigation = () => {
    const { user, logOut } = useAuth();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', flexGrow: 1 }}>
                        <img style={{ width: 80 }} src={logo} alt="dental logo" />
                        <Typography sx={{ mt: 2 }} variant="h5" component="div">
                            Doctors Portal Dental Clinic
                        </Typography>
                    </Box>
                    <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/appointment"><Button color="inherit">Appointment</Button></NavLink>
                    <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/dashboard"><Button color="inherit">Dashboard</Button></NavLink>
                    {
                        user.email ?
                            <Box>
                                <Typography variant="p" component="div">
                                    {user.displayName}
                                </Typography>
                                <Button onClick={logOut} variant="outlined" color="inherit">Logout</Button>
                            </Box>
                            :
                            <NavLink style={{ color: 'white', textDecoration: 'none' }} to="/login"><Button color="inherit">Login</Button></NavLink>
                    }
                </Toolbar>
            </AppBar>
        </Box >
    );
};

export default Navigation;