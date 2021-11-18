import { Alert, Button, Input, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useState } from 'react';

const AddDoctor = () => {
    document.title = "Add Doctor - Doctors Portal Dental Clinic";

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = e => {
        if (!image) {
            alert('Please add a image and then upload');
            return
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', image);

        fetch('https://powerful-mountain-98726.herokuapp.com/doctors', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    setSuccess('Your data has recorded successfully.')
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

        e.preventDefault();
    }

    return (
        <Box>
            <Typography sx={{ fontWeight: 600, mb: 3 }} variant="h5" color="info.main">
                Add A Doctor
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ width: '350px', mb: 2 }}
                    type="text"
                    name="name"
                    label="Name"
                    onBlur={e => setName(e.target.value)}
                    variant="filled"
                    required
                    size="small" />
                <br />
                <TextField
                    sx={{ width: '350px', mb: 2 }}
                    type="email"
                    name="email"
                    label="Email"
                    onBlur={e => setEmail(e.target.value)}
                    variant="filled"
                    required
                    size="small" />
                <br />
                <Input
                    sx={{ width: '350px', mb: 2 }}
                    accept="image/*"
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                />
                <br />
                <Button variant="contained" type="submit">
                    Add Doctor
                </Button>
            </form>
            {success && <Alert sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} severity="success"><strong>{success}</strong></Alert>}
        </Box>
    );
};

export default AddDoctor;