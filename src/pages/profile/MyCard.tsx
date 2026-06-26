/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetAddToCardQuery,
  useRemoveToCardMutation,
} from '@/redux/fetures/mycard/cardProcuct';
import { setProductsCheakout } from '@/redux/fetures/products/productsSlice';
import { useAppDispatch } from '@/redux/hooks';
import DataNotFound from '@/utils/DataNotFound';
import Loding from '@/utils/Loding';
import { Button, Checkbox } from 'antd';
import {
  Heart,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const MyCard = () => {
  const { data } = useGetAddToCardQuery(undefined);
  const [remove] = useRemoveToCardMutation();
  const [quentity, setQuentity] = useState<Record<string, number>>({});
  const [clicked, setClicked] = useState<Record<string, boolean>>({});
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {},
  );
  const dispatch = useAppDispatch();

  if (!data) {
    return <Loding />;
  }

  if (data.data.length === 0) {
    return <DataNotFound />;
  }

  const cartItems = data.data;
  const totalSelectItemId = Object.keys(selectedItems).filter(
    id => selectedItems[id],
  );

  const totalItems = totalSelectItemId.reduce((sum, id) => {
    return sum + (quentity[id] || 1);
  }, 0);

  const totalPrice: number = cartItems.reduce((sum: number, card: any) => {
    const isChecked = selectedItems[card._id];
    const quantity = quentity[card._id] || 1;
    const discountPrice = card.price - (card.price / 100) * card.discount;
    return isChecked ? sum + discountPrice * quantity : sum;
  }, 0);

  const shipping: number = totalItems
    ? Math.floor(totalPrice / 100 > 10 ? totalPrice / 100 : 10)
    : 0;
  const orderTotal = Math.ceil(totalPrice + shipping);

  const hendleRemoveDataFormCard = async (id: any) => {
    try {
      const res = await remove(id).unwrap();
      toast.success(res.message || 'Item removed from cart');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to remove item');
    }
  };

  const togolLikeButton = (id: any) => {
    setClicked(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const updateQuantity = (id: string, amount: number, maxStock: number) => {
    setQuentity(prevState => ({
      ...prevState,
      [id]: Math.max(
        1,
        Math.min(prevState[id] ? prevState[id] + amount : 1 + amount, maxStock),
      ),
    }));
  };

  const hendleCheakboxChange = (id: string, checked: boolean) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const hendelCheakOut = () => {
    const productsInfo = {
      ids: totalSelectItemId,
      quentity,
    };
    dispatch(setProductsCheakout(productsInfo));
  };

  // Helper to toggle all items
  const isAllSelected = cartItems.length > 0 && totalSelectItemId.length === cartItems.length;
  const toggleAllItems = (checked: boolean) => {
    const newSelectedItems: Record<string, boolean> = {};
    cartItems.forEach((item: any) => {
      if (item.instock > 0) {
        newSelectedItems[item._id] = checked;
      }
    });
    setSelectedItems(newSelectedItems);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-16">
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Your Cart
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Not ready to checkout?{' '}
              <Link to="/products" className="font-semibold text-brand-primary hover:underline">
                Continue shopping
              </Link>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <div className="mb-4 flex items-center justify-between rounded-xl bg-white px-5 py-3 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={isAllSelected}
                  onChange={(e) => toggleAllItems(e.target.checked)}
                  className="font-medium text-slate-700"
                >
                  Select All Items
                </Checkbox>
              </div>
              <span className="text-sm font-medium text-slate-500">{cartItems.length} items total</span>
            </div>

            <div className="flex flex-col gap-4">
              {cartItems.map((card: any) => {
                const quantity = card.instock > 0 ? quentity[card._id] || 1 : 0;
                const discountPrice = Math.ceil(
                  card.price - (card.price / 100) * card.discount,
                );
                const lineTotal = discountPrice * quantity;
                const isSelected = !!selectedItems[card._id] && card.instock > 0;

                return (
                  <article
                    key={card._id}
                    className={`relative flex flex-col sm:flex-row gap-5 rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md ${
                      isSelected ? 'border-brand-primary ring-1 ring-brand-primary/20' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4 sm:items-start">
                      <Checkbox
                        disabled={card.instock === 0}
                        checked={isSelected}
                        onChange={e => hendleCheakboxChange(card._id, e.target.checked)}
                        className="mt-0 sm:mt-8 scale-110"
                      />
                      <Link
                        to={`/products/${card.productID}`}
                        className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-50 sm:h-32 sm:w-32 border border-slate-100"
                      >
                        <img
                          src={card.image}
                          alt={card.name}
                          className="h-full w-full object-contain p-2 mix-blend-multiply transition-transform hover:scale-105 duration-300"
                        />
                      </Link>
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                        <div className="pr-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-1">
                            {card.catagory || 'FIT-EQ'}
                          </p>
                          <Link to={`/products/${card.productID}`} className="group">
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-2">
                              {card.name}
                            </h3>
                          </Link>
                          <p className="mt-1 text-sm font-medium text-slate-500">
                            {card.instock === 0 ? (
                              <span className="text-red-500">Out of stock</span>
                            ) : (
                              <span className="text-green-600">In stock ({card.instock} available)</span>
                            )}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-2xl font-black text-slate-900">${discountPrice}</p>
                          {card.discount > 0 && (
                            <div className="flex items-center sm:justify-end gap-2 mt-1">
                              <p className="text-sm font-medium text-slate-400 line-through">${card.price}</p>
                              <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-bold text-red-600">
                                -{card.discount}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
                          <button
                            type="button"
                            disabled={quantity <= 1}
                            onClick={() => updateQuantity(card._id, -1, card.instock)}
                            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm disabled:opacity-50 transition-all"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center text-sm font-bold text-slate-900">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            disabled={quantity === card.instock || card.instock === 0}
                            onClick={() => updateQuantity(card._id, 1, card.instock)}
                            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm disabled:opacity-50 transition-all"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-700 hidden sm:block mr-2">
                            Total: ${lineTotal}
                          </p>
                          <button
                            type="button"
                            onClick={() => togolLikeButton(card._id)}
                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                              clicked[card._id]
                                ? 'bg-red-50 text-red-500'
                                : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                            }`}
                          >
                            <Heart className="h-5 w-5" fill={clicked[card._id] ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            type="button"
                            onClick={() => hendleRemoveDataFormCard(card._id)}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
              <div className="bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-6 w-6 text-brand-primary" />
                  <h2 className="text-xl font-bold">Order Summary</h2>
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  {totalSelectItemId.length} {totalSelectItemId.length === 1 ? 'item' : 'items'} selected for checkout
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-500">Subtotal</span>
                    <span className="font-bold text-slate-900">${Math.ceil(totalPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-500">Shipping</span>
                    <span className="font-bold text-slate-900">${shipping}</span>
                  </div>
                  <div className="rounded-lg bg-blue-50/50 p-3 text-xs font-medium leading-relaxed text-blue-800 border border-blue-100">
                    Shipping is calculated as min $10 or max 1% of the selected item total.
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                  <span className="text-base font-bold text-slate-900">Estimated Total</span>
                  <span className="text-3xl font-black tracking-tight text-brand-primary">
                    ${totalItems ? orderTotal : 0}
                  </span>
                </div>

                <Button
                  href="/products/checkout"
                  onClick={hendelCheakOut}
                  disabled={!totalSelectItemId.length}
                  className="group mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-xl border-0 bg-brand-primary text-base font-bold uppercase tracking-wide text-white transition-all hover:bg-brand-primary-hover disabled:bg-slate-200 disabled:text-slate-400 shadow-lg shadow-brand-primary/25 disabled:shadow-none"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>

                <div className="mt-8 space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-700">Secure Checkout</p>
                      <p className="text-xs text-slate-500 mt-0.5">Your payment information is encrypted and secure.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <div>
                      <p className="text-sm font-bold text-slate-700">Fast Delivery</p>
                      <p className="text-xs text-slate-500 mt-0.5">Quick processing and delivery to your address.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyCard;
