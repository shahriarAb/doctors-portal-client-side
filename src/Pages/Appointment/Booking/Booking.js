import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import BookingModal from '../BookingModal/BookingModal';

const Booking = ({ booking, date, setBookingSuccessful }) => {
    const { name, time, space, price } = booking;
    const [openBooking, setOpenBooking] = React.useState(false);
    const handleBookingOpen = () => setOpenBooking(true);
    const handleBookingClose = () => setOpenBooking(false);

    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ py: 3 }}>
                    <Typography gutterBottom variant="h6" color="info.main">
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="p">
                        {time}
                    </Typography>
                    <br />
                    <Typography gutterBottom variant="h6" color="text.secondary">
                        Price: ${price}
                    </Typography>
                    <Typography gutterBottom variant="caption" color="text.secondary">
                        {space} SPACES AVAILABLE
                    </Typography>
                    <br />
                    <Button onClick={handleBookingOpen} sx={{ mt: 2, backgroundColor: 'info.main' }} variant="contained">Book Appoinment</Button>
                </Paper>
            </Grid>
            <BookingModal
                booking={booking}
                openBooking={openBooking}
                handleBookingClose={handleBookingClose}
                date={date}
                setBookingSuccessful={setBookingSuccessful}
            ></BookingModal>
        </>
    );
};

export default Booking;