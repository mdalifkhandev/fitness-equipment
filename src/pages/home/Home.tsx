import Carousel from '@/components/headers/carousel/Carousels';
import { useEffect } from 'react';
import Products from '../products/Products';
import { Button } from 'antd';
import Section from '@/components/homeSection/Section';
import BenefitSection from '@/components/homeSection/BenefitSection';

const Home = () => {
  useEffect(() => {
    document.title = 'FIT-EQ Home page';
  }, []);

  return (
    <div>
      <Carousel />
      <h1></h1>
      <div className="h-[700px] overflow-hidden shadow-2xl rounded-xl">
        <Products />
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
