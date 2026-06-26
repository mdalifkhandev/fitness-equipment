/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateOrderDataMutation } from '@/redux/fetures/orderData/orderDataApi';
import { Button, Drawer } from 'antd';
import { Banknote, CheckCircle2, MapPin, Phone, ShieldCheck, UserRound, Navigation } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const PaymentCatchOn = ({ deleveryProductsInfo }: any) => {
  const [dataPost] = useCreateOrderDataMutation();
  const {
    userName,
    userEmail,
    userPhone,
    userDivision,
    userDistric,
    userUpzala,
    userAddress,
    productsID,
    quentity,
    totalPrice,
  } = deleveryProductsInfo;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const hendleProcessOrder = async () => {
    setLoading(true);
    const orderData = {
      userName,
      userPhone,
      userEmail,
      userDivision,
      userDistric,
      userUpzala,
      userAddress,
      productsID,
      quentity,
      totalPrice,
    };
    try {
      const data = await dataPost(orderData).unwrap();
      toast.success(data?.message || 'Order placed successfully!');
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to place order');
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
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <Banknote className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-sm font-bold text-slate-900">
              Cash on Delivery
            </span>
            <span className="mt-1 block text-xs font-medium text-slate-500">
              Pay in cash when order arrives.
            </span>
          </div>
        </div>
      </button>

      <Drawer
        title={
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Banknote className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-base font-bold text-slate-900">
                Cash on Delivery
              </span>
              <span className="block text-xs font-medium text-slate-500">
                Review details and confirm order
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
              <MapPin className="h-4 w-4 text-brand-primary" />
              Delivery Details
            </div>
            
            <div className="space-y-4">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <UserRound className="h-4 w-4" />
                  Customer
                </div>
                <p className="text-sm font-bold text-slate-900">{userName}</p>
                <p className="text-sm text-slate-500 mt-0.5">{userEmail}</p>
              </div>
              
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <Phone className="h-4 w-4" />
                  Contact
                </div>
                <p className="text-sm font-bold text-slate-900">{userPhone}</p>
                <p className="text-sm text-slate-500 mt-0.5">
                  {userDivision}, {userDistric}
                </p>
              </div>
              
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <Navigation className="h-4 w-4" />
                  Full Address
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-800">
                  {userAddress}, {userUpzala}, {userDistric}, {userDivision}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
              <div>
                <h4 className="text-sm font-bold text-green-900">Order Confirmation</h4>
                <p className="mt-1 text-sm font-medium leading-relaxed text-green-800/80">
                  Your order will be placed immediately. You can pay the total amount in cash when the delivery team arrives.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <span className="text-base font-bold text-slate-500">Amount to Pay</span>
              <span className="text-3xl font-black text-slate-900">
                ${totalPrice}
              </span>
            </div>
            <Button
              onClick={hendleProcessOrder}
              type="primary"
              loading={loading}
              className="flex h-14 w-full items-center justify-center rounded-xl bg-brand-primary text-base font-bold uppercase tracking-wide text-white transition-all hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/25 border-0"
            >
              Confirm Order
            </Button>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
              <ShieldCheck className="h-4 w-4 text-brand-primary" />
              Delivery team will verify your order before handover.
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default PaymentCatchOn;
