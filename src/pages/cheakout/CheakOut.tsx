/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductsCheakOutQuery } from '@/redux/fetures/products/productsApi';
import { useCurrentProductsInfo } from '@/redux/fetures/products/productsSlice';
import { useAppSelector } from '@/redux/hooks';
import Loding from '@/utils/Loding';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import PaymentCatchOn from '../payment/PaymentCatchOn';
import PaymentOnCard from '../payment/PaymentOnCard';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import UserInfo, { FieldUserType } from '../products/userinfo/UserInfo';

const stripepk = import.meta.env.VITE_SECRET_KEY;

const stripePromis: Promise<Stripe | null> = loadStripe(stripepk);

type TDeleveryProductInfo = {
  userName: string | undefined;
  userEmail: string | undefined;
  userPhone: string|number | undefined ;
  userDivision: string | undefined;
  userDistric: string | undefined;
  userUpzala: string | undefined;
  userAddress: string | undefined;
  productsID: string[];
  quentity: unknown;
  totalPrice: number;
};

const CheakOut = () => {
  const [userinfo,setUserInfo]=useState<FieldUserType|undefined>(undefined)
  // const { ids, quentity } = useAppSelector(useCurrentProductsInfo);
  const { ids, quentity } = useAppSelector((state: RootState) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCurrentProductsInfo(state),
  ) as { ids: string[]; quentity: { [key: string]: number } };
  // const { email } = useAppSelector(useCurrentUserInfo);
  const { data } = useGetProductsCheakOutQuery(ids);
  // const { data: getuserinfo } = useGetUserInfoQuery(undefined);
  // const { data: getuser } = useGetUserQuery(undefined);
  const [id, setId] = useState();

  // const userId = getuser?.data?._id;
  // const modelData = {
  //   userId
  // };

  console.log(userinfo);
  

  if (!data) {
    return <Loding />;
  }
  

  const product = data?.data;

  // const shipping = Math.ceil(
  //   (product?.price / 100) * 2 * (quentity || 1) > 10
  //     ? (product?.price / 100) * 2 * (quentity || 1)
  //     : 10,
  // );
  // const productPrice = Math.ceil(
  //   product?.price - (product?.price / 100) * product?.discount,
  // );
  // const totalPrice = Math.ceil(
  //   (product?.price - (product?.price / 100) * product?.discount) *
  //     (quentity || 1),
  // );

 
  // const totalPrice=product.reduce((total:number,item:any)=>{
  //   console.log(item.price);

  //   return total+item.price*quentity[item._id]
  // })

  // console.log(totalPrice);

  const totalPrice = Math.ceil(
    product.reduce((total: any, item: any) => {
      const itemQuantity = quentity[item._id] || 1;
      const price = item.price - (item.price / 100) * item.discount;
      return total + price * itemQuantity;
    }, 0),
  );
  const shipping = Math.ceil(totalPrice / 200 < 10 ? 10 : totalPrice / 200);
  const idArray = product.map((item: any) => item.productID);

  const deleveryProductsInfo: TDeleveryProductInfo = {
    userName: userinfo?.name,
    userEmail: userinfo?.email,
    userPhone: userinfo?.phonNumber,
    userDivision: userinfo?.division,
    userDistric: userinfo?.distric,
    userUpzala: userinfo?.upzelea,
    userAddress: userinfo?.address,
    productsID: idArray,
    totalPrice: totalPrice + shipping,
    quentity,
  };

  return (
    <div>
      <div className="grid lg:grid-cols-12 gap-4 ">
        <div className="shadow-xl col-span-6 rounded-2xl">
          {userinfo ? (
            <>
              <div className="shadow-2xl m-5 p-5 rounded-2xl">
                <p className="text-3xl font-bold text-center mb-5">
                  {' '}
                  Shipping & Billing
                </p>

                <p className="flex justify-between mt-3 font-bold">
                  <span>Your Name : </span>
                  <span>
                    {/* {getuser.data.firstName} {getuser.data.lestName} */}
                    {userinfo?.name}
                  </span>
                </p>
                <p className="flex justify-between mt-3 font-bold">
                  <span>Your Email : </span>
                  <span>
                    {userinfo.email}
                  </span>
                </p>
                {/* <p className="flex justify-between mt-3 font-bold">
                  <span>Your Email : </span>
                  <span>{email}</span>
                </p> */}
                <p className="flex justify-between mt-3 font-bold">
                  <span>Your Phon Number : </span>
                  {userinfo.phonNumber}
                </p>
                <p className="flex justify-between mt-3 font-bold">
                  <span>Your dividion : </span>
                  {userinfo.division}
                </p>
                <p className="flex justify-between mt-3 font-bold">
                  <span>Your distric : </span>
                  {userinfo.distric}
                </p>
                <p className="flex justify-between mt-3 font-bold">
                  <span>Your upzela : </span>
                  {userinfo.upzelea}
                </p>
                <p className="flex justify-between mt-3 font-bold">
                  <span>Your address : </span>
                  {userinfo.address}
                </p>
              </div>

              <div className="m-5 p-5 shadow-2xl lg:flex justify-between gap-5 md:block ">
                <PaymentCatchOn deleveryProductsInfo={deleveryProductsInfo} />
                <Elements stripe={stripePromis}>
                  <PaymentOnCard
                    setId={setId}
                    deleveryProductsInfo={deleveryProductsInfo}
                  />
                </Elements>
              </div>
            </>
          ) : (
            <>
              <p>Please give Your addres</p>
              <UserInfo 
              setUserInfo={setUserInfo}
              // modalData={modelData} 
              />
            </>
          )}
        </div>
        <div className="shadow-xl col-span-6 p-6  rounded-3xl">
          {

            product.map((products: any) => (
              <div className="flex" key={products._id}>
                <div className="flex justify-between items-center ">
                  <img width="100px" src={products?.image} alt="" />
                  <p> {product?.name} </p>
                  {/* <p> usd $ {productPrice}</p> */}
                </div>
                <div className="w-[30%] m-auto">
                  <h1>{products.name}</h1>
                </div>

                <div className="  mt-6">
                  <p>Qit : {quentity[products._id] || 1} </p>
                  <p>
                    {' '}
                    Price : ${' '}
                    {Math.ceil(
                      products.price -
                        (products.price / 100) * products.discount,
                    )}{' '}
                  </p>
                </div>

                <div className="m-auto">
                  <h1>
                    Total Price : ${' '}
                    {Math.ceil(
                      (products.price -
                        (products.price / 100) * products.discount) *
                        (quentity[products._id] || 1),
                    )}
                  </h1>
                </div>
              </div>
            ))
          }

          <div className="m-6 font-bold text-2xl">
            <div className="flex gap-5 justify-between mt-6">
              <p> Shipping </p>
              <p> $ {shipping} </p>
            </div>
            <div className="flex gap-5 justify-between mt-6">
              <p>Total Price </p>
              <p> $ {totalPrice} </p>
            </div>
          </div>
          {id ? (
            <p className="mt-16 text-2xl font-bold text-green-800 text-center">
              Payment id : {id}
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default CheakOut;
