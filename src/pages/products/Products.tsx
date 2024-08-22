import ProductCard from '@/components/products/ProductCard';
import { useGetProductsQuery } from '@/redux/fetures/products/productsApi';
import Loding from '@/utils/Loding';

const Products = () => {
  const { data } = useGetProductsQuery({ category: 'Cardio' });

  if (!data) {
    return <Loding />;
  }
  return (
    <div>
      <h1 className="font-bold text-center text-xl my-4">
        {data.data.length} Prodoct
      </h1>
      <div className="grid grid-cols-4 gap-6">
        {// eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.data?.map((card: any) => (
          <ProductCard key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Products;
