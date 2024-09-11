/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetAddToCardQuery,
  useRemoveToCardMutation,
} from '@/redux/fetures/products/cardProcuct';
import DataNotFound from '@/utils/DataNotFound';
import Loding from '@/utils/Loding';
import { Button, Card, Checkbox } from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';

const MyCard = () => {
  const { data } = useGetAddToCardQuery(undefined);
  const [remove] = useRemoveToCardMutation();
  const [quentity, setQuentity] = useState<Record<string, number>>({});
  const [clicked, setClicked] = useState<Record<string, boolean>>({});
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {},
  );
  const totalItems = Object.keys(selectedItems).reduce((sum, id) => {
    return selectedItems[id] ? sum + (quentity[id] || 1) : sum;
  }, 0);

  if (!data) {
    return <Loding />;
  }
  if (data.data.length === 0) {
    return <DataNotFound />;
  }
  const totalPrice = data.data.reduce((sum: number, card: any) => {
    const isChecked = selectedItems[card._id];
    const quantity = quentity[card._id] || 1;
    return isChecked
      ? sum + (card.price - (card.price / 100) * card.discount) * quantity
      : sum;
  }, 0);

  const hendleRemoveDataFormCard = async (id: any) => {
    try {
      const res = await remove(id).unwrap();

      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data.message);
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

  return (
    <div className="grid grid-cols-7 relative">
      <div className="col-span-5 my-5 relative">
        {data?.data?.map((card: any) => (
          <Card
            key={card.productID}
            title={card.catagory || ''}
            className="my-5 shadow-2xl"
            style={{ width: '100%' }}
          >
            <div className="grid grid-cols-12 gap-5 items-center">
              <div className="col-span-1">
                <Checkbox
                  checked={card.instock > 0 ? !!selectedItems[card._id] : false}
                  onChange={e => {
                    hendleCheakboxChange(card._id, e.target.checked);
                  }}
                />
              </div>
              <div className="col-span-2">
                <img className="w-20" src={card.image} alt="" />
              </div>
              <div className="col-span-5">
                <a href={`/products/${card.productID}`}>
                  <p>{card.name}</p>
                  <p className="mt-3">{card.discreption}</p>
                </a>
              </div>
              <div className="col-span-2">
                <p>Price : {card.price - (card.price / 100) * card.discount}</p>
                <div className="flex gap-4 mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`size-6 cursor-pointer ${clicked[card._id] ? 'text-red-500' : ''}`}
                    onClick={() => {
                      togolLikeButton(card._id);
                    }}
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>

                  <svg
                    onClick={() => {
                      hendleRemoveDataFormCard(card._id);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-red-500 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
              <div className="col-span-2 flex ">
                <Button
                  disabled={
                    quentity[card._id] === card.instock || card.instock === 0
                  }
                  onClick={() => {
                    updateQuantity(card._id, 1, card.instock);
                  }}
                >
                  +
                </Button>
                <p className="mx-3">
                  {card.instock > 0 ? quentity[card._id] || 1 : 0}
                </p>
                <Button
                  disabled={quentity[card._id] === 1}
                  onClick={() => {
                    updateQuantity(card._id, -1, card.instock);
                  }}
                >
                  -
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="col-span-2 my-8 shadow-2xl ml-4 relative divide-y h-96 ">
        <div className="sticky">
          <div className="flex gap-5 m-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <p>User Location</p>
          </div>
          <div className="m-5 p-3 h-10">
            <p className="text-xl">Order Summery</p>
            <div className="flex justify-between mt-5">
              <p>Subtotal ({totalItems} items)</p>
              <p>{totalPrice}</p>
            </div>
            <div className="flex justify-between mt-5">
              <p>Shipping Free</p>
              <p>
                {totalItems
                  ? (totalPrice / 100) * 2 > 10
                    ? ((totalPrice / 100) * 2).toFixed()
                    : 10
                  : 0}
              </p>
            </div>
            <div className="flex justify-between mt-5">
              <p>Shipping fee is minimum 10$ and maximum 2% of total price. </p>
            </div>
            <div className="flex justify-between font-bold mt-5">
              <p>Total Price</p>
              <p>
                {(totalItems
                  ? (totalPrice / 100) * 2 > 10
                    ? ((totalPrice / 100) * 2).toFixed()
                    : 10
                  : 0) + totalPrice}
              </p>
            </div>
            <Button className="w-full mt-5 bg-[#001529] text-white">
              CheakOut
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCard;
