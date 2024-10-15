/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCurrentToken } from '@/redux/fetures/auth/authSlice';
import {
  // useDeletedOrderDataMutation,
  useGetAllOrderDataQuery,
  useGetCancelOrderDataQuery,
  useGetOrderDataQuery,
} from '@/redux/fetures/orderData/orderDataApi';
import { useAppSelector } from '@/redux/hooks';
import Loding from '@/utils/Loding';
import { verifyToken } from '@/utils/verifyToken';
import { Card } from 'antd';
import { useEffect, useState } from 'react';

const OrderHistory = () => {
  const token: any = useAppSelector(useCurrentToken);
  const user: any = verifyToken(token);
  const email = user.email;

  const { data } = useGetOrderDataQuery({ email });
  const { data: cancelOrderData } = useGetCancelOrderDataQuery({ email });
  // const [deleted] = useDeletedOrderDataMutation();
  const [ids, setIds] = useState<string | null>(null);

  useEffect(() => {
    if (data?.data) {
      const idArray = data.data.map((item: any) => item.productsID);
      const ids = idArray.join(',');
      if (ids.length > 0) {
        setIds(ids);
      }
    }
  }, [data]);

  const { data: getallorderdata, error: getAllOrderError } =
    useGetAllOrderDataQuery({ ids }, { skip: !ids });

  // const handleOrderCancel = (id: any) => {
  //   deleted(id);
  // };

  if (!data) {
    return <Loding />;
  }

  if (getAllOrderError) {
    console.error('Error fetching all order data:', getAllOrderError);
  }

  return (
    <div>
      <Card title="Your Order History">
        {getallorderdata?.data?.map((card: any) => (
          <Card
            key={card._id}
            type="inner"
            title={card.name}
            // extra={<a href={`/products/${card._id}`}>Details</a>}
            extra={<a href={`/my-card`}>Details</a>}
          >
            <div className="flex gap-6 justify-between items-center">
              <div>
                <img src={card.productsImage} alt="" width="100px" />
              </div>
              <div>
                <h1>{card.name}</h1>
                <p>Price: {card.price}</p>
              </div>
              <div>
                {/* <Button
                  onClick={() => handleOrderCancel(card._id)}
                  className="btn"
                >
                  Cancel Order
                </Button> */}
                <div>
                  {card.paymentID ? (
                    <p className="border rounded-lg bg-green-500 text-white mt-3 text-center">
                      Paid
                    </p>
                  ) : (
                    <p className="border rounded-lg bg-red-500 text-white mt-3 px-5 p-2 text-center">
                      <a href={`/products/${card._id}`}>Unpaid</a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </Card>

      <Card title="Cancel Order History" className="opacity-80">
        {cancelOrderData?.data?.map((card: any) => (
          <Card
            key={card._id}
            type="inner"
            title={card.productsName}
            extra={<a href={`/products/${card._id}`}>Details</a>}
          >
            <div className="flex gap-6 justify-between items-center">
              <div>
                <img src={card?.image.img1} alt="" width="100px" />
              </div>
              <div>
                <h1>{card.productsName}</h1>
                <p>Price: {card.productsTotalPrice}</p>
              </div>
              <div>
                <p className="text-red-500 mt-3">Canceled</p>
              </div>
            </div>
          </Card>
        ))}
      </Card>
    </div>
  );
};

export default OrderHistory;
