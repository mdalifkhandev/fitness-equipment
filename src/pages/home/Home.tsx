import Carousel from '@/components/headers/carousel/Carousels';
import { useEffect } from 'react';
import Section from '@/components/homeSection/Section';
import BenefitSection from '@/components/homeSection/BenefitSection';
import ProductCard from '@/components/products/ProductCard';
import { useGetProductsQuery } from '@/redux/fetures/products/productsApi';

const Home = () => {
  useEffect(() => {
    document.title = 'FIT-EQ Home page';
  }, []);

  const { data } = useGetProductsQuery({});

  return (
    <div className="relative">
      <div className="">
        <Carousel />
      </div>
      <div className="text-center mt-16 mb-10">
        <span className="text-sm font-extrabold tracking-widest text-blue-600 uppercase border-b-2 border-blue-500 pb-1">
          Featured Gear
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 uppercase">
          Top Rated Equipment
        </h2>
      </div>
      <div className="container mx-auto px-4 mb-12">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-8">
          {// eslint-disable-next-line @typescript-eslint/no-explicit-any
          data?.data?.slice(0, 8).map((card: any) => (
            <ProductCard key={card._id} card={card} />
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-16">
        <a
          href="/products"
          className="inline-flex items-center justify-center bg-gray-950 text-white font-bold py-3 px-10 rounded-xl hover:bg-gray-800 transition duration-300 transform hover:scale-105 shadow-md"
        >
          See All Products
        </a>
      </div>
      <Section />
      <BenefitSection />
    </div>
  );
};

export default Home;
