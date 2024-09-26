import ProductCard from '@/components/products/ProductCard';
import PriceRange from '@/components/products/search/proceRange/PriceRange';
import Searchs from '@/components/products/search/Searchs';
import SelectsCatagory from '@/components/products/Selects/SelectsCatagory';
import { useGetProductsQuery } from '@/redux/fetures/products/productsApi';
import Loding from '@/utils/Loding';
import { useState } from 'react';

const Products = () => {
  const [catagory, setCatagory] = useState();
  const [search, setSearch] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();
  const query = {
    catagory,
    search,
    minPrice,
    maxPrice,
  };

  const { data } = useGetProductsQuery(query);

  if (!data) {
    return <Loding />;
  }

  return (
    <div>
      <div className="lg:flex lg:justify-between ">
        <div>
          <SelectsCatagory setValues={setCatagory} />
        </div>
        <div>
          <PriceRange setMixPrice={setMaxPrice} setMinPrice={setMinPrice} />
        </div>
        <div>
          <Searchs setSearch={setSearch} />
        </div>
      </div>
      <h1 className="font-bold text-center text-xl my-4">
        {data?.data?.length} Prodoct
      </h1>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {// eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.data?.map((card: any) => (
          <ProductCard key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Products;
