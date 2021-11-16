import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #5bc0de',
    boxShadow: 24,
    p: 4,
};

const BookingModal = ({ openBooking, handleBookingClose, booking, date, setBookingSuccessful }) => {
    const { name, time, price } = booking;
    const { user } = useAuth();

    const initialInfo = { patientName: user.displayName, email: user.email, phone: '' };
    const [bookingInfo, setBookingInfo] = useState(initialInfo);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...bookingInfo };
        newInfo[field] = value;
        setBookingInfo(newInfo);
    }

    const handleBookingSubmit = e => {
        //collecting the appoinment data
        const appoinment = {
            ...bookingInfo,
            time,
            price,
            serviceName: name,
            date: date.toLocaleDateString()
        };
        //send data to the server
        fetch('https://powerful-mountain-98726.herokuapp.com/appointments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appoinment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    handleBookingClose();
                    setBookingSuccessful(true);
                }
            })

        e.preventDefault();
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openBooking}
                onClose={handleBookingClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openBooking}>
                    <Box sx={style}>
                        <Typography sx={{ color: 'info.main' }} id="transition-modal-title" variant="h6" component="h2">
                            {name}
                        </Typography>

                        <form onSubmit={handleBookingSubmit}>
                            <TextField
                                sx={{ mt: 2, width: '100%' }}
                                id="outlined-textarea"
                                defaultValue={time}
                                label="Available Time"
                                size="small"
                                disabled
                            />
                            <TextField
                                sx={{ mt: 2, width: '100%' }}
                                id="outlined-textarea"
                                defaultValue={user.displayName}
                                name='patientName'
                                onBlur={handleOnBlur}
                                label="Your Name"
                                size="small"
                            />
                            <TextField
                                sx={{ mt: 2, width: '100%' }}
                                id="outlined-textarea"
                                defaultValue={user.email}
                                type="email"
                                name='email'
                                onBlur={handleOnBlur}
                                label="Your Email"
                                size="small"
                            />
                            <TextField
                                sx={{ mt: 2, width: '100%' }}
                                id="outlined-textarea"
                                type="number"
                                name='phone'
                                onBlur={handleOnBlur}
                                label="Phone Number"
                                size="small"
                            />
                            <TextField
                                disabled
                                sx={{ mt: 2, width: '100%' }}
                                id="outlined-textarea"
                                defaultValue={date.toDateString()}
                                label="Date"
                                size="small"
                            />
                            <Button type="submit" sx={{ mt: 2, px: 4, float: 'right', backgroundColor: 'info.main' }} variant="contained">Submit</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default BookingModal;