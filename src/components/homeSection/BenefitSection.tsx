import appleWatch from '@/assets/New folder/benefit/club-series-treadmill-update-lifestyle-1-1000x1000_f69c3280-1dc7-44c6-b4c5-b12c469cd599.webp';
import helth from '@/assets/New folder/benefit/club-series-upright-female-exercising2-1000x1000_2b037479-0106-491c-b9a3-57e4d1f4341b.webp';
import strength from '@/assets/New folder/benefit/strength-1000x1000.webp';
import phone from '@/assets/New folder/benefit/woman-phone-footer-1.webp';

const items = [
  {
    key: '1',
    img: appleWatch,
    title: 'Apple Watch® Compatible',
    details:
      "Easily track how hard you're working with real-time feedback from your favorite devices.",
  },
  {
    key: '2',
    img: helth,
    title: 'Heath and Body',
    details:
      'Cardiovascular Health: Engaging in regular aerobic exercises like running, cycling, or swimming improves heart and lung function.',
  },
  {
    key: '3',
    img: strength,
    title: 'Strength Training Basics',
    details:
      'Resistance Training: Involves exercises that cause muscles to contract against external resistance, such as weights, resistance bands, or body weight',
  },
  {
    key: '4',
    img: phone,
    title: 'Fitness Chick Regulerly',
    details:
      "Easily track how hard you're working with real-time feedback from your favorite devices.",
  },
];

const BenefitSection = () => {
  return (
    <div>
      <h1 className=" text-center font-bold my-10 text-4xl text-green-300">
        Benefit Use This Products
      </h1>
      <div className=" grid grid-cols-2">
        {items.map(item => (
          <div key={item.key}>
            <img src={item.img} className="w-[500px] mx-auto" alt="" />
            <h1 className="text-center font-bold text-xl">{item.title}</h1>
            <p className="text-center">{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitSection;
