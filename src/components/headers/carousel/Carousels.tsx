import { Carousel } from 'antd';

const items = [
  {
    key: 1,
    image: 'https://www.simpleimageresizer.com/_uploads/photos/c01f7604/Recumbent-collectionbanner_1_1_optimized.png',
  },

  {
    key: 2,
    image:
      'https://www.simpleimageresizer.com/_uploads/photos/c01f7604/Custom_Gym_Page_2024_Banner_FINAL_6-19-24_optimized.png',
  },
  {
    key: 3,
    image:
      'https://www.simpleimageresizer.com/_uploads/photos/c01f7604/gym-interior-with-exercise-equipment-vector-48659039_1400x500.jpg',
  },
  {
    key: 4,
    image:
      'https://www.simpleimageresizer.com/_uploads/photos/c01f7604/images_1400x500.jpeg',
  },
  {
    key: 5,
    image:
      'https://www.simpleimageresizer.com/_uploads/photos/c01f7604/images_1_1_1400x500.jpeg',
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
