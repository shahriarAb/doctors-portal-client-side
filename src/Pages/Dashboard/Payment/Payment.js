import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51JvyLlC5bAtPgG1ZPMumPc6jpISjrWsqXe0JJ2UNwp00OzO5coUfekNVAKsjOuPwPxsMcuUgi9thXhyFevVH1EYf00j0sIu8Ng')

const Payment = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});
    document.title = "Payment"

    useEffect(() => {
        fetch(`http://localhost:5500/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data));
    }, [appointmentId]);

    return (
        <Box>
            <Typography variant="h6">
                Please Pay for: {appointment.serviceName}
            </Typography>
            <Typography variant="p">
                Total Payable Price: <b>${appointment.price}</b>
            </Typography>
            <br />
            <br />
            <Typography variant="body2">
                Appointment Information
            </Typography>

            <Typography variant="body">
                Patient Name: {appointment.patientName}
                <br />
                Date: {appointment.data} at {appointment.time}
            </Typography>
            {
                appointment?.price && <Elements stripe={stripePromise}>
                    <CheckoutForm
                        appointment={appointment}
                    />
                </Elements>
            }
        </Box>
    );
};

export default Payment;

/*
Payment mathod process->
----------------------
1. install stripe and stripe-react
2. set publishable key
3. Elements create
4. Checkout form
5. Create payment method
6. server create payment Intenet api
7. Load client secret
8. confirm card payment
9. hanle user error
*/