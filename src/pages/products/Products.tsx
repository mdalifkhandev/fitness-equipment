import ProductCard from '@/components/products/ProductCard';
import SelectsCatagory from '@/components/products/Selects/SelectsCatagory';
import { useGetProductsQuery } from '@/redux/fetures/products/productsApi';
import Loding from '@/utils/Loding';
import { useState } from 'react';

// type LabelRender = SelectProps['labelRender'];

const Products = () => {
  const [Catagory, setCatagory] = useState();
  const { data } = useGetProductsQuery(Catagory);

  console.log(Catagory);

  if (!data) {
    return <Loding />;
  }
  console.log(data);

  return (
    <div>
      <div className="flex justify-between">
        <SelectsCatagory setValues={setCatagory} />
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
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
