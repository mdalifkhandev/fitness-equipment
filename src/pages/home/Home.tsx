import Carousel from '@/components/headers/carousel/Carousels';
import { useEffect } from 'react';
import { Button } from 'antd';
import Section from '@/components/homeSection/Section';
import BenefitSection from '@/components/homeSection/BenefitSection';
import ProductCard from '@/components/products/ProductCard';
import { useGetProductsQuery } from '@/redux/fetures/products/productsApi';

const Home = () => {
  useEffect(() => {
    document.title = 'FIT-EQ Home page';
  }, []);

  const { data } = useGetProductsQuery(undefined);

  return (
    <div className="relative">
      <div className="">
        <Carousel />
      </div>
      <h1 className="text-center text-5xl font-bold my-10 text-green-400">
        {' '}
        All Products
      </h1>
      <div className="h-[700px] overflow-hidden shadow-2xl   rounded-xl">
        <div className="grid grid-cols-4 gap-6">
          {// eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.data?.map((card: any) => (
            <ProductCard key={card._id} card={card} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button href="/products" className="-mt-8 btn-outline">
          See more
        </Button>
      </div>
      <Section />
      <BenefitSection />
    </div>
  );
};

export default Home;
