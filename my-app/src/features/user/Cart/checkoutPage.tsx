import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Observer, observer } from 'mobx-react';
import { useStore } from '../../../app/stores/store';
import { PaymentProcess } from '../../../app/models/Stripe/PaymentProcess';
import { useStripe, Elements, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51NByv0LIvU3mbLX7aWldO7KAtClxzQGp9QZTxf4hWm3fv9BMUBMCnGfGIJGDieBi6ddmT8g1DjwhCibZwnvaoJYi00TJeg65Ve');

const CheckoutPage = () => {
  const { cartStore, userStore } = useStore();
  const navigate = useNavigate();
  const { user } = userStore;
  const { calculateCartTotalForCheckout, cartTotal } = cartStore;
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();

  useEffect(() => {
    setLoading(true); // Start loading
    calculateCartTotalForCheckout(user?.id!).then(() => {
      setLoading(false); // Stop loading when calculation is finished
    });
  }, [calculateCartTotalForCheckout, user?.id]);

  const [payment, setPayment] = useState<PaymentProcess>({
    userId: user?.id!,
    stripeCustomer: {
      email: '',
      name: '',
      cardToken: '',
    },
    paymentIntent: {
      amount: cartTotal!,
      currency: 'EUR',
      description: 'test',
      deliveryAddress: '',
      paymentMethod: '',
      stripeCustomerId: '',
    },
  });

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
      },
    },
  };

  async function handleFormSubmit(payment: PaymentProcess) {
    await calculateCartTotalForCheckout(user?.id!).then(async () => {
      if (!elements || !stripe) {
        return;
      }
      if (user?.stripeCustomerId == null) {
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          return;
        }
        const { token, error } = await stripe.createToken(cardElement);
        if (error) {
          console.log(error);
        } else {
          let newPayment = {
            ...payment,
            ...payment.paymentIntent,
            ...payment.stripeCustomer,
          };
          newPayment.stripeCustomer.cardToken = token.id;
          newPayment.paymentIntent.amount = cartTotal!;
          await cartStore.processPayment(newPayment).then(() => {
            navigate('/menu');
          });
        }
      } else {
        let newPayment = {
          ...payment,
          ...payment.paymentIntent,
          ...payment.stripeCustomer,
        };
        newPayment.paymentIntent.amount = cartTotal!;

        await cartStore.processPayment(newPayment).then(()=>{
            cartStore.cartTotal = null;
            navigate('/menu');
        });
       }
      }
      else{
        let newPayment = {
          ...payment,
          ...payment.paymentIntent,
          ...payment.stripeCustomer
        }
        newPayment.paymentIntent.amount = cartTotal!;
        
        await cartStore.processPayment(newPayment).then(() => {
          navigate('/menu');
        });
      }
  }

  return (
    <main className="flex justify-center items-center mt-10">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="w-full max-w-md p-4">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Card Payment</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Formik initialValues={payment} enableReinitialize onSubmit={handleFormSubmit}>
              {formik => (
                <Form className="space-y-4">
                  {user?.stripeCustomerId == null ? (
                    <div className="my-3">
                      <label htmlFor="cardInformation" className="block text-gray-700 font-bold mb-2">Card Information:</label>
                      <CardElement
                        id="cardInformation"
                        className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                        options={cardElementOptions}
                      />
                    </div>
                  ) : null}

                  <label htmlFor="deliveryAddress" className="block text-gray-700 font-bold mb-2">
                    Delivery Address:
                  </label>
                  <Field
                    className="border border-gray-400 p-2 w-full rounded-md focus:outline-none"
                    type="text"
                    name="paymentIntent.deliveryAddress"
                    id="deliveryAddress"
                    placeholder="Enter the delivery address"
                  />
                  <ErrorMessage
                    name="paymentIntent.deliveryAddress"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />

                  <p className="text-gray-700 font-semibold">Total: {cartTotal! / 100}$</p>

                  <div className="flex justify-end space-x-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 ease-in-out disabled:opacity-50"
                      type="submit"
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      {formik.isSubmitting ? 'Processing...' : 'Pay Now'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </main>
  );
};

const Wrapper = () => (
  <Elements stripe={stripePromise}>
    <CheckoutPage />
  </Elements>
);

export default Wrapper;
