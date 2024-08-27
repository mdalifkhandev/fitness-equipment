/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetAddToCardQuery,
  useRemoveToCardMutation,
} from '@/redux/fetures/products/cardProcuct';
import DataNotFound from '@/utils/DataNotFound';
import Loding from '@/utils/Loding';
import { Button, Card, Rate } from 'antd';
import { toast } from 'sonner';

const MyCard = () => {
  const { data } = useGetAddToCardQuery(undefined);
  const [remove] = useRemoveToCardMutation();
  if (!data) {
    return <Loding />;
  }
  if (data.data.length === 0) {
    return <DataNotFound />;
  }
  console.log(data.data.length);

  const hendleRemoveDataFormCard = async (id: any) => {
    try {
      const res = await remove(id).unwrap();
      console.log(res.message);

      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        {
        data?.data?.map((card: any) => (
          //   <a href={`/products/${card.productID}`}>
          <Card
            className="h-full"
            hoverable
            cover={<img alt={card.name} src={card.image} />}
          >
            <div>
              <h1 className="font-bold text-center h-10">{card.name}</h1>
              <div>
                <Rate allowHalf defaultValue={card.rating} />
                <span className="text-lg ml-1">{card.review} Reviews</span>
              </div>
              <div className="flex justify-center gap-6 font-semibold">
                <span className="line-through">$ {card.price}</span>
                <span>$ {card.price - (card.price / 100) * card.discount}</span>
                <span className="text-red-600">Save {card.discount} %</span>
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                onClick={() => hendleRemoveDataFormCard(card._id)}
                className="mt-3 bg-red-500 text-white p-5"
              >
                Remove{' '}
              </Button>
              <Button
                href={`/products/${card.productID}`}
                className="mt-3 bg-[#001529] text-white p-5"
              >
                Details
              </Button>
            </div>
          </Card>
          //   </a>
        ))}
      </div>
    </div>
  );
};

export default MyCard;
