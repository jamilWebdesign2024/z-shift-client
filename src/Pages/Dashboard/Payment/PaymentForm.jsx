import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const {user}=useAuth();
    const axiosSecure = useAxiosSecure();
    console.log(parcelId);


    const [error, setError] = useState('')


    const { isPending, data: parcelInfo } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    if (isPending) {
        return '...loading'
    }

    console.log(parcelInfo);
    const price = parcelInfo.data?.cost;
    const priceInCents = price * 100;
    console.log(priceInCents);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        // validate the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error);
            setError(error.message)
        }
        else {
            setError('');
            console.log('payment method', paymentMethod);
            //step-3 create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                priceInCents,
                parcelId
            })
            const clientSecret = res.data.clientSecret;


            // step3 confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                
            } else {
                setError('')
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    console.log(result);
                    // step-4 mark parcel paid also create payment history
                    const paymentData = {
                        parcelId,
                        email: user.email,
                        amount: price,
                        transactionId: result.paymentIntent.id,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }

                }
            }
        }




        


    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                <CardElement className="p-2 border rounded">

                </CardElement>
                <button
                    type='submit'
                    disabled={!stripe}
                    className="btn btn-primary mt-4 w-full text-black"
                >
                    Pay ${price}
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;