import appleWatch from '@/assets/New folder/benefit/club-series-treadmill-update-lifestyle-1-1000x1000_f69c3280-1dc7-44c6-b4c5-b12c469cd599.webp';
import helth from '@/assets/New folder/benefit/club-series-upright-female-exercising2-1000x1000_2b037479-0106-491c-b9a3-57e4d1f4341b.webp';
import strength from '@/assets/New folder/benefit/strength-1000x1000.webp';
import phone from '@/assets/New folder/benefit/woman-phone-footer-1.webp';
import gymInterior from '@/assets/New folder/gym-interior-with-exercise-equipment-vector-48659039.jpg';
import aboutImg from '@/assets/New folder/about/Mighty_Fitness.webp';

const items = [
  {
    key: '1',
    img: appleWatch,
    tag: 'INTEGRATION',
    title: 'Apple Watch® Compatible',
    details: "Easily track how hard you're working with real-time biometric feedback from your favorite Apple devices.",
  },
  {
    key: '2',
    img: helth,
    tag: 'AEROBIC',
    title: 'Cardiovascular Health',
    details: 'Regular cardio workouts like running, cycling, or climbing strengthen heart muscles, expand lung capacity, and improve circulation.',
  },
  {
    key: '3',
    img: strength,
    tag: 'RESISTANCE',
    title: 'Strength Training Basics',
    details: 'Resistance training increases lean muscle mass, builds bone density, and enhances joint support for functional daily activities.',
  },
  {
    key: '4',
    img: phone,
    tag: 'SMART TRACKING',
    title: 'Smart Fitness Companion',
    details: 'Sync your logs directly to your smartphone. Track your personal records, set reminders, and access training guides.',
  },
  {
    key: '5',
    img: gymInterior,
    tag: 'DESIGN',
    title: 'Space-Saving Ergonomics',
    details: 'Maximize your home area with space-conscious footprints, folding mechanisms, and clean visual integration.',
  },
  {
    key: '6',
    img: aboutImg,
    tag: 'WELLNESS',
    title: 'Mental & Physical Balance',
    details: 'Working out releases endorphins, reducing stress, clearing focus, and improving sleep cycles for a healthier lifestyle.',
  },
];

const BenefitSection = () => {
  return (
    <div className="w-full bg-gray-50/10 py-12 border-t border-gray-100">
      {/* Title Header */}
      <div className="text-center mb-12">
        <span className="text-sm font-extrabold tracking-widest text-blue-600 uppercase border-b-2 border-blue-500 pb-1">
          Train Smarter
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 uppercase">
          Benefits of FIT-EQ Gear
        </h2>
      </div>

      {/* Grid Container */}
      <div className="container mx-auto px-4 max-w-6xl mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div 
              key={item.key} 
              className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt={item.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Text Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow text-left">
                {item.tag && (
                  <span className="text-xs font-bold text-blue-500 tracking-widest uppercase mb-1.5">
                    {item.tag}
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitSection;
