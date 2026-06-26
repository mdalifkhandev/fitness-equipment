/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateOrderDataMutation,
  usePaymentIntentPriceMutation,
} from '@/redux/fetures/orderData/orderDataApi';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, Drawer } from 'antd';
import { CreditCard, LockKeyhole, Mail, MapPin, Phone, ShieldCheck, UserRound, Navigation } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const PaymentOnCard = ({ deleveryProductsInfo, setId }: any) => {
  const [dataPost] = useCreateOrderDataMutation();
  const [paymentintentprice] = usePaymentIntentPriceMutation();
  const {
    userName,
    userEmail,
    userPhone,
    userDivision,
    userDistric,
    userUpzala,
    userAddress,
    productsID,
    totalPrice,
    quentity,
  } = deleveryProductsInfo;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const element = useElements();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !element) {
      toast.error('Stripe has not loaded yet');
      return;
    }

    setLoading(true);

    try {
      const clientSecretResponse =
        await paymentintentprice(totalPrice).unwrap();
      const clientSecret = clientSecretResponse?.data;

      if (!clientSecret) {
        toast.error('Failed to retrieve client secret, please check your information.');
        setLoading(false);
        return;
      }

      const card = element.getElement(CardElement);
      if (!card) {
        toast.error('Card information is missing');
        setLoading(false);
        return;
      }

      const { error: paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details: {
          name: userName,
          email: userEmail,
        },
      });
      if (paymentMethodError) {
        toast.error('Invalid card details');
        setLoading(false);
        return;
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: userName,
              email: userEmail,
            },
          },
        });

      if (confirmError) {
        toast.error('Failed to confirm card payment');
        setLoading(false);
        return;
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
          totalPrice,
          quentity,
          productsID,
          paymentID: paymentIntent.id,
        };

        const datapost = await dataPost(paymentDetails);
        toast.success(datapost?.data?.message || 'Payment successful!');
        setId(datapost.data.data.paymentID);
        setOpen(false);
      } else {
        toast.error('Payment failed');
      }
    } catch (err) {
      console.error('Payment intent error', err);
      toast.error('Failed to process payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={showDrawer}
        type="button"
        className="flex h-24 w-full items-center justify-start rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:border-brand-primary hover:ring-1 hover:ring-brand-primary"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-brand-primary">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-sm font-bold text-slate-900">
              Pay by Card
            </span>
            <span className="mt-1 block text-xs font-medium text-slate-500">
              Secure Stripe card payment.
            </span>
          </div>
        </div>
      </button>

      <Drawer
        title={
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-primary">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-base font-bold text-slate-900">
                Secure Payment
              </span>
              <span className="block text-xs font-medium text-slate-500">
                Complete your purchase securely.
              </span>
            </div>
          </div>
        }
        placement="right"
        width={450}
        onClose={onClose}
        open={open}
        className="custom-drawer"
      >
        <div className="flex flex-col gap-6 h-full pb-20">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
              <UserRound className="h-4 w-4 text-brand-primary" />
              Billing Details
            </div>
            
            <div className="space-y-4">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <UserRound className="h-4 w-4" />
                    Customer
                  </div>
                </div>
                <p className="text-sm font-bold text-slate-900">{userName}</p>
                <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> {userEmail}
                </p>
              </div>
              
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <Navigation className="h-4 w-4" />
                  Billing Address
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-800">
                  {userAddress}, {userUpzala}, {userDistric}, {userDivision}
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded-2xl border border-blue-100 bg-blue-50/30 p-5 flex-1"
          >
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <LockKeyhole className="h-4 w-4 text-brand-primary" />
                  Card Payment
                </div>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  Processed securely by Stripe.
                </p>
              </div>
            </div>

            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Card Information
            </label>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm focus-within:ring-2 focus-within:ring-brand-primary/20 focus-within:border-brand-primary transition-all">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '15px',
                      color: '#0f172a',
                      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                      '::placeholder': {
                        color: '#94a3b8',
                      },
                      iconColor: '#2563eb',
                    },
                    invalid: {
                      color: '#ef4444',
                      iconColor: '#ef4444',
                    },
                  },
                }}
              />
            </div>
            
            <div className="mt-auto pt-6 border-t border-slate-200/50">
              <div className="flex items-center justify-between mb-5">
                <span className="text-base font-bold text-slate-500">Amount to Pay</span>
                <span className="text-3xl font-black text-slate-900">
                  ${totalPrice}
                </span>
              </div>
              <Button
                htmlType="submit"
                loading={loading}
                disabled={!stripe}
                className="flex h-14 w-full items-center justify-center rounded-xl bg-brand-primary text-base font-bold uppercase tracking-wide text-white transition-all hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/25 border-0 disabled:bg-slate-300 disabled:shadow-none"
              >
                Pay ${totalPrice}
              </Button>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
                <ShieldCheck className="h-4 w-4 text-brand-primary" />
                256-bit encrypted secure payment.
              </div>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  );
};

export default PaymentOnCard;
