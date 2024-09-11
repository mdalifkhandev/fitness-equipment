/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateOrderDataMutation } from '@/redux/fetures/orderData/orderDataApi';
import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';

const Payment = ({ deleveryProductsInfo }: any) => {
  const [dataPost] = useCreateOrderDataMutation();
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
  } = deleveryProductsInfo;

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const hendleProcessOrder = () => {
    const orderData = {
      userName,
      userPhone,
      userEmail,
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
    };

    console.log(orderData);
    try {
      dataPost(orderData);
      toast.success('Order Data Created Successfully');
    } catch (error: any) {
      toast.error(error.message);
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

          <h1>Catch on Dalevary</h1>
        </div>
      </Button>
      <Drawer
        title="Catch on Delevary"
        placement="top"
        onClose={onClose}
        open={open}
      >
        <div className="flex justify-between px-52 items-center">
          <div>
            <p>Address </p>
            <div>
              <p> {userName} </p>
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
          <Button
            onClick={hendleProcessOrder}
            className="bg-[#001529] text-white"
          >
            <p onClick={onClose}>Process Order</p>
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Payment;
