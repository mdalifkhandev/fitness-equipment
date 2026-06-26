import { Rate } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductCard = ({ card }: any) => {
  const discountPrice = Math.ceil(card.price - (card.price / 100) * card.discount);
  const imageUrl = card.image && typeof card.image === 'object' ? card.image.img1 : card.image;

  return (
    <a 
      href={`/products/${card._id}`} 
      className="group relative flex flex-col w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <img
          alt={card.name}
          src={imageUrl}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Discount Badge Overlay */}
        {card.discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-sm tracking-wider uppercase z-10">
            Save {card.discount}%
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category */}
        <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1.5">
          {card.catagory || 'FIT-EQ'}
        </span>
        
        {/* Product Name */}
        <h3 className="font-bold text-gray-900 text-base line-clamp-2 mb-2 min-h-[3rem] leading-snug group-hover:text-blue-600 transition-colors duration-200">
          {card.name}
        </h3>

        {/* Ratings & Reviews */}
        <div className="flex items-center gap-1.5 mb-4">
          <Rate disabled allowHalf defaultValue={card.rating || 5} className="text-xs text-amber-400" />
          <span className="text-xs font-semibold text-gray-500">
            ({card.review || 0} Reviews)
          </span>
        </div>

        {/* Pricing Layout */}
        <div className="flex items-baseline gap-2.5 mt-auto pt-3 border-t border-gray-50">
          <span className="text-lg font-black text-gray-900">
            ${discountPrice}
          </span>
          {card.discount > 0 && (
            <span className="text-xs font-semibold text-gray-400 line-through">
              ${card.price}
            </span>
          )}
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
