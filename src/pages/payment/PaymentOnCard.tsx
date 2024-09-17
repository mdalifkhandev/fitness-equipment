/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateOrderDataMutation,
  usePaymentIntentPriceMutation,
} from '@/redux/fetures/orderData/orderDataApi';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';

const PaymentOnCard = ({ deleveryProductsInfo, setId }: any) => {
  const [dataPost] = useCreateOrderDataMutation();
  const [paymentintentprice] = usePaymentIntentPriceMutation();
  // const [dataPost,{data }]=useCreateOrderDataMutation()
  const {
    userName,
    userEmail,
    userPhone,
    userDivision,
    userDistric,
    userUpzala,
    userAddress,
    productsImage,
    productsName,
    productsPrice,
    productsQuentity,
    productsShipping,
    productsTotalPrice,
    productsID,
  } = deleveryProductsInfo;

  const [open, setOpen] = useState(false);
  const stripe = useStripe();
  const element = useElements();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: any) => {
    setOpen(false);
    event.preventDefault();
    const price = {
      price: productsPrice,
    };
    const claint_secret = await paymentintentprice(price).unwrap();

    if (claint_secret) {
      if (!stripe || !element) {
        return;
      }
      const card = element.getElement(CardElement);
      if (card === null) {
        return;
      }
      const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
      if (error) {
        toast.error('payment information invalid');
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(claint_secret.data, {
          payment_method: {
            card: card,
            billing_details: {
              name: userName,
              email: userEmail,
            },
          },
        });

      if (confirmError) {
        toast.error('payment information invalid');
      }

      if (paymentIntent?.status === 'succeeded') {
        const paymentDetails = {
          userName,
          userEmail,
          userPhone,
          userDivision,
          userDistric,
          userUpzala,
          userAddress,
          productsImage,
          productsName,
          productsPrice,
          productsQuentity,
          productsShipping,
          productsTotalPrice,
          productsID,
          paymentID: paymentIntent.id,
        };
        const datapost = await dataPost(paymentDetails);
        toast.success(datapost?.data?.message);
        setId(datapost.data.data.paymentID);
      }
    }
  };

  return (
    <div>
      <Button
        onClick={showDrawer}
        className=" w-52 h-20 rounded-xl  bg-black text-white text-center pt-5 text-2xl"
      >
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 mx-20"
          >
            <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
            <path
              fillRule="evenodd"
              d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
              clipRule="evenodd"
            />
          </svg>

          <h1>Pay As Stripe</h1>
        </div>
      </Button>
      <Drawer
        title="Catch on Delevary"
        placement="top"
        onClose={onClose}
        open={open}
      >
        <div className="flex gap-28 items-center">
          <div>
            <p>Address </p>
            <div>
              <p> {userName} </p>
              <p> {userEmail} </p>
              <p> {userPhone}</p>
              <p> {userDivision} </p>
              <p> {userDistric} </p>
              <p> {userUpzala} </p>
              <p> {userAddress} </p>
            </div>
          </div>
          <div>
            <p>Products </p>
            <div>
              <img width="150px" src={productsImage} alt="" />
              <p> {productsName} </p>
              <p> Price : {productsPrice} </p>
              <p>Qit: {productsQuentity} </p>

              <p>Total Price : {productsTotalPrice + productsShipping} </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-72 ">
            <CardElement />
            <button type="submit" className="btn mt-5" disabled={!stripe}>
              Pay ${productsPrice}
            </button>
          </form>
        </div>
      </Drawer>
    </div>
  );
};

export default PaymentOnCard;
