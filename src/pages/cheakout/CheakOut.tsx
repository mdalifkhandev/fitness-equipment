/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductsCheakOutQuery } from '@/redux/fetures/products/productsApi';
import { useCurrentProductsInfo } from '@/redux/fetures/products/productsSlice';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import Loding from '@/utils/Loding';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import {
  BadgeCheck,
  CreditCard,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck,
  UserRound,
} from 'lucide-react';
import { useState } from 'react';
import PaymentCatchOn from '../payment/PaymentCatchOn';
import PaymentOnCard from '../payment/PaymentOnCard';
import UserInfo, { FieldUserType } from '../products/userinfo/UserInfo';

const stripepk = import.meta.env.VITE_SECRET_KEY;

const stripePromis: Promise<Stripe | null> = loadStripe(stripepk);

type TDeleveryProductInfo = {
  userName: string | undefined;
  userEmail: string | undefined;
  userPhone: string | number | undefined;
  userDivision: string | undefined;
  userDistric: string | undefined;
  userUpzala: string | undefined;
  userAddress: string | undefined;
  productsID: string[];
  quentity: unknown;
  totalPrice: number;
};

const CheakOut = () => {
  const [userinfo, setUserInfo] = useState<FieldUserType | undefined>(
    undefined,
  );
  const { ids, quentity } = useAppSelector((state: RootState) =>
    useCurrentProductsInfo(state),
  ) as { ids: string[]; quentity: { [key: string]: number } };
  const { data } = useGetProductsCheakOutQuery(ids);
  const [id, setId] = useState();

  if (!data) {
    return <Loding />;
  }

  const product = data?.data || [];

  const totalPrice = Math.ceil(
    product.reduce((total: any, item: any) => {
      const itemQuantity = quentity[item._id] || 1;
      const price = item.price - (item.price / 100) * item.discount;
      return total + price * itemQuantity;
    }, 0),
  );
  const shipping = Math.ceil(totalPrice / 200 < 10 ? 10 : totalPrice / 200);
  const grandTotal = totalPrice + shipping;
  const idArray = product.map((item: any) => item.productID);
  const totalItems = product.reduce((total: number, item: any) => {
    return total + (quentity[item._id] || 1);
  }, 0);

  const deleveryProductsInfo: TDeleveryProductInfo = {
    userName: userinfo?.name,
    userEmail: userinfo?.email,
    userPhone: userinfo?.phonNumber,
    userDivision: userinfo?.division,
    userDistric: userinfo?.distric,
    userUpzala: userinfo?.upzelea,
    userAddress: userinfo?.address,
    productsID: idArray,
    totalPrice: grandTotal,
    quentity,
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-2 text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Complete Your Order
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Add delivery information, review your products, and select a payment method.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7 space-y-6">
            
            {/* Delivery Address Section */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary-light text-brand-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Delivery Address</h2>
                    <p className="text-sm text-slate-500">Where should we send your order?</p>
                  </div>
                </div>
                {userinfo && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-700 ring-1 ring-inset ring-green-600/20">
                    <BadgeCheck className="h-4 w-4" />
                    Added
                  </span>
                )}
              </div>

              {userinfo ? (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <UserRound className="h-4 w-4 text-brand-primary" />
                      Customer
                    </div>
                    <p className="text-sm font-bold text-slate-900 truncate">{userinfo.name}</p>
                    <p className="text-sm font-medium text-slate-600 truncate">{userinfo.email}</p>
                  </div>
                  
                  <div className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <Phone className="h-4 w-4 text-brand-primary" />
                      Contact
                    </div>
                    <p className="text-sm font-bold text-slate-900 truncate">{userinfo.phonNumber}</p>
                    <p className="text-sm font-medium text-slate-600 truncate">
                      {userinfo.division}, {userinfo.distric}
                    </p>
                  </div>
                  
                  <div className="sm:col-span-2 flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <MapPin className="h-4 w-4 text-brand-primary" />
                      Full Address
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-slate-800">
                      {userinfo.address}, {userinfo.upzelea}, {userinfo.distric}, {userinfo.division}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-xl border-2 border-dashed border-brand-primary/20 bg-brand-primary-light/30 p-8 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-slate-900">Please provide your address</h3>
                  <p className="mt-2 text-sm text-slate-600 max-w-lg">
                    Add your name, phone number, email and delivery location so we can prepare your order correctly.
                  </p>
                  <div className="mt-6">
                    <UserInfo setUserInfo={setUserInfo} />
                  </div>
                </div>
              )}
            </section>

            {/* Payment Method Section */}
            {userinfo && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary-light text-brand-primary">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
                    <p className="text-sm text-slate-500">Choose how you want to pay.</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <PaymentCatchOn deleveryProductsInfo={deleveryProductsInfo} />
                  <Elements stripe={stripePromis}>
                    <PaymentOnCard
                      setId={setId}
                      deleveryProductsInfo={deleveryProductsInfo}
                    />
                  </Elements>
                </div>

                {id && (
                  <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-green-50 p-4 border border-green-100">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-bold text-green-800">Payment ID: {id}</span>
                  </div>
                )}
              </section>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
              <div className="bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <PackageCheck className="h-6 w-6 text-brand-primary" />
                  <h2 className="text-xl font-bold">Order Summary</h2>
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} ready for checkout
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {product.map((products: any) => {
                    const quantity = quentity[products._id] || 1;
                    const price = Math.ceil(
                      products.price - (products.price / 100) * products.discount,
                    );
                    const lineTotal = price * quantity;

                    return (
                      <div
                        key={products._id}
                        className="flex items-start gap-4 rounded-xl border border-slate-100 p-3 bg-white"
                      >
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-50 border border-slate-100">
                          <img
                            className="h-full w-full object-contain p-2 mix-blend-multiply"
                            src={products?.image}
                            alt={products.name}
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between min-w-0">
                          <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
                            {products.name}
                          </h3>
                          <div className="mt-1 flex items-center gap-3 text-xs font-medium text-slate-500">
                            <span>Qty: {quantity}</span>
                            <span>x</span>
                            <span>${price}</span>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                              Item Total
                            </span>
                            <span className="text-sm font-black text-slate-900">
                              ${lineTotal}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-500">Subtotal</span>
                    <span className="font-bold text-slate-900">${totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-500">Shipping</span>
                    <span className="font-bold text-slate-900">${shipping}</span>
                  </div>
                  <div className="rounded-lg bg-blue-50/50 p-3 text-xs font-medium leading-relaxed text-blue-800 border border-blue-100">
                    Shipping is calculated from your selected cart total (min $10).
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-5">
                    <span className="text-base font-bold text-slate-900">Total Price</span>
                    <span className="text-3xl font-black tracking-tight text-brand-primary">
                      ${grandTotal}
                    </span>
                  </div>
                </div>

                <div className="mt-8 space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <Truck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-700">Delivery Details</p>
                      <p className="text-xs text-slate-500 mt-0.5">Confirmed securely before final payment.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-700">Secure Checkout</p>
                      <p className="text-xs text-slate-500 mt-0.5">Protected with 256-bit encryption.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-700">Order Receipt</p>
                      <p className="text-xs text-slate-500 mt-0.5">Confirmation will be sent to your email.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default CheakOut;
