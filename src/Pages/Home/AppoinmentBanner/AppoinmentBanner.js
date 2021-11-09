import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import doctor from '../../../images/doctor.png';
import bg from '../../../images/appointment-bg.png';
import { Button, Typography } from '@mui/material';

const appoinmentBg = {
    background: `url(${bg})`,
    backgroundColor: 'rgba(45,58,74,.85)',
    backgroundBlendMode: 'darken',
    marginTop: 150
}

const AppoinmentBanner = () => {
    return (
        <Box style={appoinmentBg} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                    <img
                        style={{ width: 450, marginTop: '-115px' }}
                        src={doctor} alt="" />
                </Grid>
                <Grid item xs={12} md={7} sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'left'
                }}>
                    <Box>
                        <Typography sx={{ color: 'info.main', mb: 10 }} variant="h6">
                            APPOINMENT
                        </Typography>
                        <Typography sx={{ color: 'white', mb: 4 }} variant="h4">
                            Make An Appoinment Today
                        </Typography>
                        <Typography sx={{ color: 'white' }} variant="9">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.Esse vitae magnam odio, maxime ab porro sunt tempore necessitatibus quibusdam aperiam facilis aliquam illo quod quam!
                        </Typography>
                        <br />
                        <Button sx={{ mt: 3, backgroundColor: 'info.main' }} variant="contained">Learn More</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
};

export default AppoinmentBanner;