import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const AddDoctor = () => {
    document.title = "Add Doctor - Doctors Portal Dental Clinic";

    return (
        <Box>
            <Typography sx={{ fontWeight: 600 }} variant="h5" color="info.main">
                Add A Doctor
            </Typography>
        </Box>
    );
};

export default AddDoctor;