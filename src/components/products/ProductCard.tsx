import { Card, Rate } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard = ({ card }: any) => {
  // console.log(card?.image.img1);

  return (
    <a href={`/products/${card._id}`}>
      <Card
        className="h-[410px]"
        hoverable
        cover={
          <img
            alt={card.name}
            src={card.image ? card.image.img1 : card.image}
          />
        }
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
      </Card>
    </a>
  );
};

export default ProductCard;
