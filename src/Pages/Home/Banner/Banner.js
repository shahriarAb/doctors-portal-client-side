import React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import chair from '../../../images/chair.png';
import bg from '../../../images/bg.png';
import { Link } from 'react-router-dom';

const bannerBg = {
    background: `url(${bg})`
}
const verticleCenter = {
    display: 'flex',
    alignItems: 'center',
    height: 400
}

const Banner = () => {
    return (
        <Container style={bannerBg} sx={{ flexGrow: 1, mt: 5 }}>
            <Grid container spacing={2}>
                <Grid item style={{ ...verticleCenter, textAlign: 'left' }} xs={12} md={7}>
                    <Box>
                        <Typography variant="h3" sx={{ mb: 3 }}>
                            Your New Smile <br />
                            Starts Here
                        </Typography>
                        <Typography variant="p" sx={{ fontSize: 14.5, color: 'gray' }}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, praesentium, iure voluptatem hic quo sunt laboriosam neque nulla, nihil itaque consequuntur libero molestiae ratione ea! Nisi ullam similique impedit necessitatibus.
                        </Typography>
                        <br />
                        <Link style={{ textDecoration: 'none' }} to="/appointment">
                            <Button sx={{ mt: 3, backgroundColor: 'info.main' }} variant="contained">Get Appoinment</Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item style={verticleCenter} xs={12} md={5}>
                    <img style={{ width: '350px' }} src={chair} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Banner;