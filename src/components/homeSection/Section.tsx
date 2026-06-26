import { Award, Zap, ShieldCheck, Leaf } from 'lucide-react';

const achievements = [
  {
    key: 1,
    icon: Award,
    title: '100,000+ Facilities',
    description: 'Trusted by elite fitness clubs, professional athletic teams, and top universities in over 165 countries worldwide.',
    color: 'text-blue-500 bg-blue-50/50 border-blue-100',
  },
  {
    key: 2,
    icon: Zap,
    title: 'Fitness Innovation',
    description: 'Pioneering gym technology with interactive consoles, connected strength systems, and advanced biometrics.',
    color: 'text-amber-500 bg-amber-50/50 border-amber-100',
  },
  {
    key: 3,
    icon: ShieldCheck,
    title: '10-Year Warranty',
    description: 'Every commercial and home product is backed by a solid trust warranty and 24/7 client support.',
    color: 'text-green-500 bg-green-50/50 border-green-100',
  },
  {
    key: 4,
    icon: Leaf,
    title: 'Eco-Friendly Design',
    description: 'Built responsibly using highly durable, energy-efficient materials and sustainable manufacturing practices.',
    color: 'text-emerald-500 bg-emerald-50/50 border-emerald-100',
  },
];

const Section = () => {
  return (
    <div className="w-full bg-gray-50/30 py-8">
      {/* Title Header */}
      <div className="text-center mt-12 mb-12">
        <span className="text-sm font-extrabold tracking-widest text-blue-600 uppercase border-b-2 border-blue-500 pb-1">
          Our Milestones
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 uppercase">
          FIT-EQ Achievements
        </h2>
      </div>

      {/* Grid Container */}
      <div className="container mx-auto px-4 max-w-6xl mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.key} 
                className="group relative flex flex-col items-center text-center p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Accent Highlight Bar on Hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                
                {/* Icon Wrapper */}
                <div className={`flex items-center justify-center w-16 h-16 rounded-2xl mb-6 border ${item.color} transition-transform duration-300 group-hover:scale-110 shadow-inner`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Section;
