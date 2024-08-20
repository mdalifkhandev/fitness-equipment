import Carousel from '@/components/headers/carousel/Carousels';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'FIT-EQ Home page';
  }, []);

  return (
    <div>
      <Carousel />
    </div>
  );
};

export default Home;
