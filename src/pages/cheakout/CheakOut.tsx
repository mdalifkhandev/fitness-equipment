import { useGetSingleProductsQuery } from '@/redux/fetures/products/productsApi';
import { useCurrentProductsInfo } from '@/redux/fetures/products/productsSlice';
import { useAppSelector } from '@/redux/hooks';
import Loding from '@/utils/Loding';
import { Button, Input } from 'antd';
import UserInfo from '../products/userinfo/UserInfo';
import { useCurrentUserInfo } from '@/redux/fetures/users/userSlice';
import {
  useGetUserInfoQuery,
  useGetUserQuery,
} from '@/redux/fetures/users/userApi';
import Payment from '../payment/Payment';

type TDeleveryProductInfo = {
  userName: string;
  userEmail: string;
  userPhone: number;
  userDivision: string;
  userDistric: string;
  userUpzala: string;
  userAddress: string;
  productsImage: string;
  productsName: string;
  productsPrice: number;
  productsQuentity: number;
  productsShipping: number;
  productsTotalPrice: number;
};

const CheakOut = () => {
  const { productId, quentity } = useAppSelector(useCurrentProductsInfo);
  const { email } = useAppSelector(useCurrentUserInfo);
  const { data } = useGetSingleProductsQuery(productId);
  const { data: getuserinfo } = useGetUserInfoQuery({ email });
  const { data: getuser } = useGetUserQuery({ email });

  if (!data) {
    return <Loding />;
  }
  if (!getuser) {
    return <Loding />;
  }
  if (!getuserinfo) {
    return <Loding />;
  }
  if (!email) {
    return <Loding />;
  }

  const product = data?.data;
  console.log(productId, product);

  const shipping = Math.ceil(
    (product?.price / 100) * 2 * (quentity || 1) > 10
      ? (product?.price / 100) * 2 * (quentity || 1)
      : 10,
  );
  const productPrice = Math.ceil(
    product?.price - (product?.price / 100) * product?.discount,
  );
  const totalPrice = Math.ceil(
    (product?.price - (product?.price / 100) * product?.discount) *
      (quentity || 1),
  );
  const deleveryProductsInfo: TDeleveryProductInfo = {
    userName: `${getuser.data.firstName}, ${getuser.data.lestName}`,
    userEmail: email,
    userPhone: getuserinfo.data.phone,
    userDivision: getuserinfo.data.division,
    userDistric: getuserinfo.data.distric,
    userUpzala: getuserinfo.data.upzala,
    userAddress: getuserinfo.data.detailsAddress,
    productsImage: product.image.img1,
    productsName: product.name,
    productsPrice: product.price,
    productsQuentity: quentity || 1,
    productsShipping: shipping,
    productsTotalPrice: totalPrice,
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 ">
        <div className="shadow-xl col-span-6 rounded-2xl">
          {getuserinfo ? (
            <>
              <div className="shadow-2xl m-5 p-5 rounded-2xl">
                <p className="text-3xl font-bold text-center mb-5">
                  {' '}
                  Shipping & Billing
                </p>

                <p className="flex justify-between mt-3 font-bold">
                  <span>User Name : </span>
                  <span>
                    {getuser.data.firstName} {getuser.data.lestName}
                  </span>
                </p>
                <p className="flex justify-between mt-3 font-bold">
                  <span>User Phon Number : </span>
                  <span>{getuserinfo.data.phone} </span>
                </p>
                <p className="flex justify-between mt-3 font-bold">
                  <span>User dividion : </span>
                  <span>{getuserinfo.data.division} </span>
                </p>
                <p className="flex justify-between mt-3 font-bold">
                  <span>User distric : </span>
                  <span>{getuserinfo.data.distric} </span>
                </p>
                <p className="flex justify-between mt-3 font-bold">
                  <span>User upzela : </span>
                  <span>{getuserinfo.data.upzala} </span>
                </p>
                <p className="flex justify-between mt-3 font-bold">
                  <span>User address : </span>
                  <span>{getuserinfo.data.detailsAddress} </span>
                </p>
              </div>
              <div className="m-5 p-5 shadow-2xl">
                <Payment deleveryProductsInfo={deleveryProductsInfo} />
              </div>
            </>
          ) : (
            <>
              <p>Please give Your addres</p>
              <UserInfo />
            </>
          )}
        </div>
        <div className="shadow-xl col-span-6 p-6  rounded-3xl">
          <div className="flex justify-between items-center ">
            <img width="100px" src={product?.image?.img1} alt="" />
            <p> {product?.name} </p>
            <p> usd $ {productPrice}</p>
          </div>
          <div className="flex gap-5 mt-6">
            <Input placeholder="Discount Code" />
            <Button>Submit</Button>
          </div>
          <div className="flex gap-5 justify-between mt-6">
            <p>Subtotal ({quentity} item) </p>
            <p> $ {totalPrice} </p>
          </div>
          <div className="flex gap-5 justify-between mt-6">
            <p> Shipping </p>
            <p> $ {shipping} </p>
          </div>
          <div className="flex gap-5 justify-between mt-6 text-3xl font-bold">
            <p> Total </p>
            <p>
              <sub className="font-normal text-xl">USD</sub> ${' '}
              {shipping + totalPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheakOut;
