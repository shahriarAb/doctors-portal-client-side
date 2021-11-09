import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';

const Service = ({ service }) => {
    const { name, description, img } = service;
    return (
        <Grid item xs={4} sm={4} md={4}>
            <Card sx={{ minWidth: 275, mt: 5, border: 0, boxShadow: 0 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    style={{ width: 'auto', height: '85px', margin: '0 auto' }}
                    image={img}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Service;