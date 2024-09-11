/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCurrentToken } from '@/redux/fetures/auth/authSlice';
import { useCreateAddToCardMutation } from '@/redux/fetures/products/cardProcuct';
import { useGetSingleProductsQuery } from '@/redux/fetures/products/productsApi';
import { setProductsCheakout } from '@/redux/fetures/products/productsSlice';
import { setUserInfo } from '@/redux/fetures/users/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Images from '@/utils/Image';
import Loding from '@/utils/Loding';
import { verifyToken } from '@/utils/verifyToken';
import { Button, Rate } from 'antd';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ProductDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleProductsQuery(id);
  const token = useAppSelector(useCurrentToken);
  const [CardData] = useCreateAddToCardMutation();
  const [quentity, setQuentity] = useState(1);
  const dispatch = useAppDispatch();

  if (!token) {
    return (
      <div>
        <Loding />
        <Link className="text-3xl flex justify-center" to={`/login`}>
          Please Login to Click
        </Link>
      </div>
    );
  }
  if (!data) {
    return <Loding />;
  }
  const user: any = verifyToken(token);

  const image = data.data.image;
  const dat = data.data;
  console.log(user.email);

  const hendelProductsInfo = () => {
    const productsInfo = {
      productId: dat._id,
      quentity: quentity,
    };
    const userInfo = {
      email: user.email,
    };
    dispatch(setProductsCheakout(productsInfo), setUserInfo(userInfo));
    // dispatch(setUserInfo(userInfo))
  };
  const handleAddToCard = async () => {
    const addToCardInfo = {
      name: dat.name,
      productID: dat._id,
      email: user.email,
      image: dat.image.img1,
      rating: dat.rating,
      price: dat.price,
      discreption: dat.discreption,
      extarDiscreption: {
        header: dat.extarDiscreption.header,
        details: dat.extarDiscreption.details,
      },
      catagory: dat.catagory,
      review: dat.review,
      instock: dat.instock,
      discount: dat.discount,
    };
    try {
      const res = await CardData(addToCardInfo).unwrap();
      toast.success(res?.message);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      <div className="flex relative">
        <Images className="sticky top-5" img={image} />
        <div className="ml-16 mt-8">
          <h1 className="text-4xl font-bold my-8">{dat.name}</h1>
          <div className="flex gap-7">
            <Rate allowHalf defaultValue={dat.rating} />
            <span className="text-lg ml-1">{dat.review} Reviews</span>
          </div>
          <div className="flex gap-10 font-semibold ">
            <span className="line-through">$ {dat.price}</span>
            <span>$ {dat.price - (dat.price / 100) * dat.discount}</span>
            <span className="text-red-600">Save {dat.discount} %</span>
          </div>
          <div className="my-3 text-xl">
            <h1>Catagory: {dat.catagory}</h1>
            <h1>
              {' '}
              Stock :{' '}
              {dat.instock === 0 ? (
                <span className="font-bold ">Stock out</span>
              ) : (
                <span className="font-bold">{dat.instock}</span>
              )}
            </h1>
          </div>
          <div className="my-3">
            <h1>Shipping calculated at checkout.</h1>
          </div>
          <div>
            {' '}
            <span className="mr-3">Quentity : </span>
            <Button
              disabled={quentity === dat.instock}
              onClick={() => {
                setQuentity(quentity + 1);
              }}
            >
              +
            </Button>
            <span className="mx-5">{quentity}</span>
            <Button
              disabled={quentity === 1}
              onClick={() => {
                setQuentity(quentity - 1);
              }}
            >
              -
            </Button>
          </div>
          <h1 className="divider pt-4"></h1>
          <div>
            <Button
              onClick={handleAddToCard}
              className=" w-full my-3 btn btn-outline text-black"
            >
              ADD TO CARD
            </Button>
          </div>
          <div className="mb-14">
            <Button
              disabled={dat.instock === 0}
              href={`/products/cheakout/${dat._id}`}
              onClick={hendelProductsInfo}
              className="w-full my-3 btn bg-[#3C0DEF] text-white"
            >
              CHECKOUT
            </Button>
          </div>
          <div>
            <h1 className="text-4xl font-bold ">{dat.discreption}</h1>
            <h1 className="text-2xl font-semibold mt-5">
              {dat.extarDiscreption.header} :{' '}
            </h1>
            <p className="font-semibold ">{dat.extarDiscreption.details}</p>
            <h1 className="text-2xl font-semibold mt-5">
              {dat.extarDiscreption.header} :{' '}
            </h1>
            <p className="font-semibold ">{dat.extarDiscreption.details}</p>
            <h1 className="text-2xl font-semibold mt-5">
              {dat.extarDiscreption.header} :{' '}
            </h1>
            <p className="font-semibold ">{dat.extarDiscreption.details}</p>
            <h1 className="text-2xl font-semibold mt-5">
              {dat.extarDiscreption.header} :{' '}
            </h1>
            <p className="font-semibold ">{dat.extarDiscreption.details}</p>
            <h1 className="text-2xl font-semibold mt-5">
              {dat.extarDiscreption.header} :{' '}
            </h1>
            <p className="font-semibold ">{dat.extarDiscreption.details}</p>
            <h1 className="text-2xl font-semibold mt-5">
              {dat.extarDiscreption.header} :{' '}
            </h1>
            <p className="font-semibold ">{dat.extarDiscreption.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
