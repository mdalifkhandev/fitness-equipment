/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCurrentToken } from '@/redux/fetures/auth/authSlice';
import {
  useDeletedOrderDataMutation,
  useGetCancelOrderDataQuery,
  useGetOrderDataQuery,
} from '@/redux/fetures/orderData/orderDataApi';
import { useAppSelector } from '@/redux/hooks';
import { verifyToken } from '@/utils/verifyToken';
import { Button, Card } from 'antd';

const OrderHistory = () => {
  const token: any = useAppSelector(useCurrentToken);
  const user: any = verifyToken(token);
  const email = user.email;
  const { data } = useGetOrderDataQuery({ email });
  const { data: cancelOrderData } = useGetCancelOrderDataQuery({ email });
  const [deleted] = useDeletedOrderDataMutation();

  const hendelOrderCancel = (id: any) => {
    deleted(id);
  };

  return (
    <div>
      <Card title="Your Order History">
        {data?.data?.map((card: any) => (
          <Card
            key={card._id}
            type="inner"
            title={card.productsName}
            extra={<a href={`/products/${card.productsID}`}>Details</a>}
          >
            <div className="flex gap-6 justify-between items-center">
              <div>
                <img src={card.productsImage} alt="" width="100px" />
              </div>
              <div>
                <h1>{card.productsName}</h1>
                <p> Price : {card.productsTotalPrice}</p>
              </div>
              <div className="">
                <Button
                  onClick={() => hendelOrderCancel(card._id)}
                  className="btn"
                >
                  Cancel Order
                </Button>
                <div>
                  {card.paymentID ? (
                    <p className=" border rounded-lg bg-green-500 text-white mt-3 text-center">
                      Paid
                    </p>
                  ) : (
                    <p className="text-center mt-4 bg-red-500 border rounded-xl text-white">
                      <a href={`/products/${card.productsID}`}>Un Paid</a>
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
            extra={<a href={`/products/${card.productsID}`}>Details</a>}
          >
            <div className="flex gap-6 justify-between items-center">
              <div>
                <img src={card.productsImage} alt="" width="100px" />
              </div>
              <div>
                <h1>{card.productsName}</h1>
                <p> Price : {card.productsTotalPrice}</p>
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
