import ProductCard from '@/components/products/ProductCard';
import Searchs from '@/components/products/search/Searchs';
import SelectsCatagory from '@/components/products/Selects/SelectsCatagory';
import { useGetProductsQuery } from '@/redux/fetures/products/productsApi';
import Loding from '@/utils/Loding';
import { useState } from 'react';

const Products = () => {
  const [catagory, setCatagory] = useState();
  const [search, setSearch] = useState();
  const query = {
    catagory,
    search,
  };
  const { data } = useGetProductsQuery(query);

  if (!data) {
    return <Loding />;
  }
  console.log(data);

  return (
    <div>
      <div className="flex justify-between">
        <SelectsCatagory setValues={setCatagory} />
        <div>
          <Searchs setSearch={setSearch} />
        </div>
      </div>
      <h1 className="font-bold text-center text-xl my-4">
        {data?.data?.length} Prodoct
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
