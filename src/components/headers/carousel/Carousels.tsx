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
    tag: 'NEW COLLECTION 2026',
    title: 'Elevate Your Home Gym',
    description: 'Transform your training with premium, durable fitness equipment designed for maximum gains and safety.',
    buttonText: 'Shop Collection',
    buttonLink: '/products',
    secondaryButtonText: 'Explore Deals',
    secondaryButtonLink: '/products',
  },
  {
    key: 2,
    image: img2,
    tag: 'STRENGTH TRAINING',
    title: 'Unleash Your Inner Power',
    description: 'From heavy-duty benches to premium barbells, get commercial-grade equipment built for your home garage.',
    buttonText: 'View Strength Gear',
    buttonLink: '/products',
  },
  {
    key: 3,
    image: img3,
    tag: 'CARDIO ESSENTIALS',
    title: 'High-Performance Cardio',
    description: 'Keep your endurance sharp. Experience state-of-the-art treadmills and spin bikes tailored for home training.',
    buttonText: 'Shop Cardio',
    buttonLink: '/products',
  },
  {
    key: 4,
    image: img4,
    tag: 'PREMIUM ACCESSORIES',
    title: 'Gear Up For Excellence',
    description: "Don't let small details hold you back. Stock up on dumbbells, kettlebells, mats, and essential workout accessories.",
    buttonText: 'Browse Accessories',
    buttonLink: '/products',
  },
  {
    key: 5,
    image: img5,
    tag: 'EXCLUSIVE OFFERS',
    title: 'Built to Last, Priced to Love',
    description: 'Take advantage of limited-time discounts on our top-rated functional trainers and power racks.',
    buttonText: 'Shop the Sale',
    buttonLink: '/products',
  },
];

const Carousels = () => {
  return (
    <div className="w-full relative overflow-hidden bg-gray-950">
      <Carousel autoplay effect="fade" speed={800} autoplaySpeed={5000} dots={{ className: 'custom-carousel-dots' }}>
        {items.map(item => (
          <div key={item.key} className="relative h-[380px] sm:h-[480px] md:h-[580px] lg:h-[620px] w-full overflow-hidden">
            {/* Background Image */}
            <img className="absolute inset-0 w-full h-full object-cover object-center" src={item.image} alt={item.title} />
            
            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-[1]" />
            
            {/* Content Card Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-32 text-white z-[2] max-w-4xl">
              {item.tag && (
                <span className="inline-block text-xs sm:text-sm font-bold tracking-widest text-brand-primary uppercase mb-3 border-l-4 border-brand-primary pl-3">
                  {item.tag}
                </span>
              )}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight mb-4 leading-tight">
                {item.title}
              </h1>
              <p className="text-xs sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 max-w-xl leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-4">
                {item.buttonText && (
                  <a
                    href={item.buttonLink}
                    className="inline-flex items-center justify-center bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 text-sm sm:text-base rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
                  >
                    {item.buttonText}
                  </a>
                )}
                {item.secondaryButtonText && (
                  <a
                    href={item.secondaryButtonLink}
                    className="inline-flex items-center justify-center border-2 border-white/60 hover:bg-white hover:text-black hover:border-white text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 text-sm sm:text-base rounded-xl transition duration-300 transform hover:scale-105"
                  >
                    {item.secondaryButtonText}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carousels;
