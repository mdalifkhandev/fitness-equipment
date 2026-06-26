import about from '@/assets/New folder/about/Mighty_Fitness.webp';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Company Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8">About FIT-EQ</h1>
        <h2 className="text-2xl font-semibold text-gray-700 leading-relaxed mb-6">
          FIT-EQ is a premier fitness brand specializing in high-quality home gym equipment. 
          Our goal is to motivate you and provide the tools to lead a healthier and active life.
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          FIT-EQ emerged in 2020 out of necessity. With public gyms temporarily closed, we recognized the vital importance of staying active and healthy in the comfort of our homes. We wanted to provide our community with access to premium, reliable workout gear.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Today, we champion a hybrid approach to fitness. Having access to home gym equipment leaves no room for excuses, serving as a constant daily reminder that our health is our greatest wealth. We help transform garages, bedrooms, offices, or backyards into high-performance training hubs.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Every piece of equipment is crafted with strict attention to durability, aesthetics, and user safety, offering premium performance at an unbeatable value.
        </p>
        <h3 className="text-3xl font-bold text-blue-600 mb-8">Stay fit in the comfort of your home.</h3>
        <div className="flex justify-center rounded-2xl overflow-hidden shadow-2xl mb-16">
          <img src={about} alt="FIT-EQ Workspace" className="w-full max-h-[500px] object-cover" />
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-12">About Our Team</h1>
        <div className="grid md:grid-cols-3 gap-8 justify-center">
          <Card
            hoverable
            className="shadow-lg rounded-2xl overflow-hidden"
            cover={
              <img
                alt="MD. Alif Khan"
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300&auto=format&fit=crop"
                className="h-48 object-cover"
              />
            }
          >
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=Alif" />
              }
              title="MD. Alif Khan"
              description="Founder & CEO"
            />
          </Card>
          <Card
            hoverable
            className="shadow-lg rounded-2xl overflow-hidden"
            cover={
              <img
                alt="Sarah Jenkins"
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=300&auto=format&fit=crop"
                className="h-48 object-cover"
              />
            }
          >
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=Sarah" />
              }
              title="Sarah Jenkins"
              description="Head of Product Design"
            />
          </Card>
          <Card
            hoverable
            className="shadow-lg rounded-2xl overflow-hidden"
            cover={
              <img
                alt="Marcus Vance"
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=300&auto=format&fit=crop"
                className="h-48 object-cover"
              />
            }
          >
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=Marcus" />
              }
              title="Marcus Vance"
              description="Operations Manager"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
