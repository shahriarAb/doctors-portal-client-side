import { Alert, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const { token } = useAuth();
    document.title = "Make Admin - Doctors Portal Dental Clinic";

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }
    const handleSubmit = e => {
        const user = { email };
        fetch('https://powerful-mountain-98726.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount) {
                    setSuccess(true);
                }
            })
        e.preventDefault();
    }

    return (
        <Box>
            <Typography sx={{ fontWeight: 600 }} variant="h5" color="info.main">
                Make An Admin
            </Typography>
            {success && <Alert sx={{ display: 'flex', justifyContent: 'center' }} severity="success"><strong>Make Admid Successfull!</strong></Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    name="email"
                    onBlur={handleOnBlur}
                    sx={{ width: '400px', m: 1 }}
                    label="Email"
                    variant="filled"
                />
                <br />
                <Button type="submit" variant="contained">Make Admin</Button>
            </form>
        </Box>
    );
};

export default MakeAdmin;