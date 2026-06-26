/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateAddToCardMutation } from '@/redux/fetures/mycard/cardProcuct';
import { useGetSingleProductsQuery } from '@/redux/fetures/products/productsApi';
import Loding from '@/utils/Loding';
import { Button, Rate } from 'antd';
import {
  BadgeCheck,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Tag,
  Truck,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleProductsQuery(id);
  const [CardData, { isLoading: isAddingToCart }] = useCreateAddToCardMutation();
  const [quentity, setQuentity] = useState(1);

  if (!data) {
    return <Loding />;
  }

  const dat = data?.data;

  if (!dat) {
    return <Loding />;
  }

  const imageUrl =
    dat.image && typeof dat.image === 'object' ? dat.image.img1 : dat.image;
  const rating = dat?.rating || 0;
  const reviews = dat?.review || 0;
  const discount = dat?.discount || 0;
  const originalPrice = dat?.price || 0;
  const finalPrice = Math.ceil(originalPrice - (originalPrice / 100) * discount);
  const isOutOfStock = !dat?.instock || dat.instock === 0;

  const handleAddToCard = async () => {
    const addToCardInfo = {
      name: dat?.name,
      productID: dat?._id,
      image: imageUrl,
      rating,
      price: originalPrice,
      discreption: dat?.discreption,
      extarDiscreption: {
        header: dat?.extarDiscreption?.header || '',
        details: dat?.extarDiscreption?.details || '',
      },
      catagory: dat?.catagory,
      review: dat?.review,
      instock: dat?.instock,
      discount: dat?.discount,
    };

    try {
      const res = await CardData(addToCardInfo).unwrap();
      toast.success(res?.message || 'Product added to cart');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to add product to cart');
      console.log(error);
    }
  };

  return (
    <main className="bg-slate-50/70">
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500">
          <Link to="/products" className="hover:text-brand-primary transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900 line-clamp-1">{dat.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="sticky top-8">
              <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
                {discount > 0 && (
                  <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full bg-red-600 px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-sm">
                    <Tag className="h-3.5 w-3.5" />
                    Save {discount}%
                  </div>
                )}
                <div className="aspect-[4/3] bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={dat.name}
                    className="h-full w-full object-contain p-6 sm:p-10"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[Truck, ShieldCheck, RotateCcw].map((Icon, index) => {
                  const labels = ['Fast delivery', 'Secure checkout', 'Easy returns'];
                  return (
                    <div
                      key={labels[index]}
                      className="flex min-h-[76px] items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-brand-primary" />
                      <span className="text-xs font-bold text-gray-700">
                        {labels[index]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-7 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary-light px-3 py-1.5 text-xs font-black uppercase tracking-wider text-brand-primary">
                  <PackageCheck className="h-3.5 w-3.5" />
                  {dat.catagory}
                </span>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-wider ${
                    isOutOfStock
                      ? 'bg-red-50 text-red-700'
                      : 'bg-green-50 text-green-700'
                  }`}
                >
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {isOutOfStock ? 'Out of stock' : `${dat.instock} in stock`}
                </span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl font-black leading-tight text-gray-950">
                {dat.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3 border-b border-gray-100 pb-5">
                <Rate disabled allowHalf value={rating} className="text-base text-amber-400" />
                <span className="text-sm font-bold text-gray-600">
                  {reviews} reviews
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <span className="text-4xl font-black text-gray-950">
                  ${finalPrice}
                </span>
                {discount > 0 && (
                  <>
                    <span className="pb-1 text-lg font-bold text-gray-400 line-through">
                      ${originalPrice}
                    </span>
                    <span className="mb-1 rounded-lg bg-red-50 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-red-600">
                      Save ${originalPrice - finalPrice}
                    </span>
                  </>
                )}
              </div>

              <p className="mt-5 text-base leading-7 text-gray-600">
                {dat.discreption}
              </p>

              <div className="mt-7 rounded-2xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-gray-900">Quantity</p>
                    <p className="text-xs font-semibold text-gray-500">
                      Shipping calculated at checkout
                    </p>
                  </div>
                  <div className="flex h-11 items-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <button
                      type="button"
                      disabled={quentity === 1}
                      onClick={() => setQuentity(quentity - 1)}
                      className="grid h-11 w-11 place-items-center text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="grid h-11 min-w-12 place-items-center border-x border-gray-100 px-4 text-sm font-black text-gray-900">
                      {quentity}
                    </span>
                    <button
                      type="button"
                      disabled={quentity === dat?.instock || isOutOfStock}
                      onClick={() => setQuentity(quentity + 1)}
                      className="grid h-11 w-11 place-items-center text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                disabled={isOutOfStock}
                loading={isAddingToCart}
                onClick={handleAddToCard}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl border-0 bg-brand-primary font-black uppercase tracking-wider"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="rounded-xl border border-gray-100 p-4">
                  <p className="text-xs font-black uppercase tracking-wider text-gray-400">
                    Product ID
                  </p>
                  <p className="mt-1 break-all text-sm font-bold text-gray-800">
                    {dat._id}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-100 p-4">
                  <p className="text-xs font-black uppercase tracking-wider text-gray-400">
                    Category
                  </p>
                  <p className="mt-1 text-sm font-bold capitalize text-gray-800">
                    {dat.catagory}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {(dat?.extarDiscreption?.header || dat?.extarDiscreption?.details) && (
          <section className="mt-10 rounded-2xl border border-gray-100 bg-white p-5 sm:p-7 shadow-sm">
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                Product details
              </span>
              {dat?.extarDiscreption?.header && (
                <h2 className="mt-2 text-2xl font-black text-gray-950">
                  {dat.extarDiscreption.header}
                </h2>
              )}
              {dat?.extarDiscreption?.details && (
                <p className="mt-4 text-base leading-8 text-gray-600">
                  {dat.extarDiscreption.details}
                </p>
              )}
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default ProductDetails;
