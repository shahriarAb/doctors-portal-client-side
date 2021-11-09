import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Service from '../Service/Service';
import fluoride from '../../../images/fluoride.png';
import cavity from '../../../images/cavity.png';
import whitening from '../../../images/whitening.png';

const services = [
    {
        name: 'Fluoride Treatement',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus incidunt accusantium quos dolores architecto earum ratione impedit labore, quidem voluptatibus provident amet nihil odit est necessitatibus ea rerum recusandae inventore.',
        img: fluoride
    },
    {
        name: 'Cavity Filling',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus incidunt accusantium quos dolores architecto earum ratione impedit labore, quidem voluptatibus provident amet nihil odit est necessitatibus ea rerum recusandae inventore.',
        img: cavity
    },
    {
        name: 'Teeth Whitening',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus incidunt accusantium quos dolores architecto earum ratione impedit labore, quidem voluptatibus provident amet nihil odit est necessitatibus ea rerum recusandae inventore.',
        img: whitening
    },
]

const Services = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography sx={{ fontWeight: 600, color: 'info.main', m: 2 }} variant="h6">
                    OUR SERVICES
                </Typography>
                <Typography sx={{ fontWeight: 700 }} variant="h4">
                    Services We Provide
                </Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        services.map(service => <Service
                            key={service.name}
                            service={service}
                        >
                        </Service>)
                    }
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;