import { Carousel } from 'antd';
import img1 from '@/assets/New folder/ssss/Custom_Gym_Page_2024_Banner_FINAL_6-19-24_optimized.png';
import img2 from '@/assets/New folder/ssss/Recumbent-collectionbanner_1_optimized.png';
import img3 from '@/assets/New folder/ssss/gym-interior-with-exercise-equipment-vector-48659039_1400x500.jpg';
import img4 from '@/assets/New folder/ssss/images_1400x500.jpeg';
import img5 from '@/assets/New folder/ssss/images_1_1400x500.jpeg';
const items = [
  {
    key: 1,
    image: img1,
  },

  {
    key: 2,
    image: img2,
  },
  {
    key: 3,
    image: img3,
  },
  {
    key: 4,
    image: img4,
  },
  {
    key: 5,
    image: img5,
  },
];

const Carousels = () => {
  return (
    <div className="">
      <Carousel autoplay>
        {items.map(item => (
          <div key={item.key}>
            <img className="w-full rounded-2xl" src={item.image} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carousels;
