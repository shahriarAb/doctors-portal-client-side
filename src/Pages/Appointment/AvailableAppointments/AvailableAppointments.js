import { Alert, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import Booking from '../Booking/Booking';

const bookings = [
    {
        id: 1,
        name: 'Teeth Orthodonics',
        time: '08.00 AM - 09.00 AM',
        space: 10,
    },
    {
        id: 2,
        name: 'Cosmetic Dentistry',
        time: '09.00 AM - 10.00 AM',
        space: 8,
    },
    {
        id: 3,
        name: 'Teeth Cleaning',
        time: '10.00 AM - 11.00 AM',
        space: 9,
    },
    {
        id: 4,
        name: 'Cavity Protection',
        time: '11.00 AM - 12.00 PM',
        space: 5,
    },
    {
        id: 5,
        name: 'Pediatric Dental',
        time: '06.00 PM - 07.00 PM',
        space: 10,
    },
    {
        id: 6,
        name: 'Oral Surgery',
        time: '07.00 PM - 08.00 PM',
        space: 10,
    },
]

const AvailableAppointments = ({ date }) => {
    const [bookingSuccessful, setBookingSuccessful] = useState(false);

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" color="info.main">
                Available Appointments on {date.toDateString()}
            </Typography>

            {bookingSuccessful && <Alert sx={{ display: 'flex', justifyContent: 'center' }} severity="success"><strong>Appointment Booked Successfully!</strong></Alert>}

            <Grid sx={{ my: 2 }} container spacing={4}>
                {
                    bookings.map(booking => <Booking
                        key={booking.id}
                        booking={booking}
                        date={date}
                        setBookingSuccessful={setBookingSuccessful}
                    ></Booking>)
                }
            </Grid>
        </Container>
    );
};

export default AvailableAppointments;