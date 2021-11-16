import { Button, CircularProgress } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = ({ appointment }) => {
    const { patientName, price, _id } = appointment;
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const { user } = useAuth()

    useEffect(() => {
        fetch('http://localhost:5500/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        setProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
            setSuccess('');
            setProcessing(false);
        }
        else {
            setError('');
            console.log(paymentMethod);
        }

        //payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: user.email
                    },
                },
            },
        );
        if (intentError) {
            setError(intentError.message);
            setSuccess('');
            setProcessing(false)
        }
        else {
            setError('');
            setSuccess("Your payment processed successfully!");
            console.log(paymentIntent);
            setProcessing(false);

            //save to DataBase
            const payment = {
                amount: paymentIntent.amount,
                currency: paymentIntent.currency,
                create: paymentIntent.created,
                last4Dgt: paymentMethod.card.last4,
                transaction: paymentIntent.client_secret.slice('_sercet')[0]
            }
            const url = `http://localhost:5500/appointments/${_id}`
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                })
        }
    }

    return (
        <div>
            <h2>Checkout Form</h2>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    processing ?
                        <CircularProgress />
                        :
                        <Button sx={{ px: 3, py: 1 }} variant="contained" color="success" type="submit" disabled={!stripe || success}>
                            Pay ${price}
                        </Button>}
            </form>
            {
                error && <p style={{ color: 'red' }}>{error}</p>
            }
            {
                success && <p style={{ color: 'green' }}>{success}</p>
            }
        </div>
    );
};

export default CheckoutForm;