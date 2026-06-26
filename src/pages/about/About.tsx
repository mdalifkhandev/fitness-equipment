import about from '@/assets/New folder/about/Mighty_Fitness.webp';
import { Target, Users, ShieldCheck, Dumbbell } from 'lucide-react';

const About = () => {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-secondary py-20 sm:py-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Empowering Your Fitness Journey
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            FIT-EQ is a premier fitness brand specializing in high-quality home gym equipment. 
            Our mission is to motivate you and provide the tools to lead a healthier, more active life.
          </p>
        </div>
      </section>

      {/* Story & Image Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-6">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                FIT-EQ emerged in 2020 out of necessity. With public gyms temporarily closed, we recognized the vital importance of staying active and healthy in the comfort of our homes. We wanted to provide our community with access to premium, reliable workout gear.
              </p>
              <p>
                Today, we champion a hybrid approach to fitness. Having access to home gym equipment leaves no room for excuses, serving as a constant daily reminder that our health is our greatest wealth. We help transform garages, bedrooms, offices, or backyards into high-performance training hubs.
              </p>
              <p className="font-semibold text-brand-primary">
                Every piece of equipment is crafted with strict attention to durability, aesthetics, and user safety, offering premium performance at an unbeatable value.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8">
              <div className="flex gap-4 items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary-light text-brand-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Premium Quality</h3>
                  <p className="mt-1 text-sm text-slate-500">Built to withstand the toughest workouts.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary-light text-brand-primary">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Goal Oriented</h3>
                  <p className="mt-1 text-sm text-slate-500">Designed to help you reach your peak.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-slate-100/50 -z-10 transform rotate-3 scale-105 transition-transform duration-500 hover:rotate-0" />
            <img
              src={about}
              alt="FIT-EQ Workspace"
              className="rounded-2xl shadow-2xl ring-1 ring-slate-900/10 object-cover w-full h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Meet the Team
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-500 mb-16">
            The passionate individuals behind FIT-EQ who make fitness accessible to everyone.
          </p>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'MD. Alif Khan',
                role: 'Founder & CEO',
                image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300&auto=format&fit=crop',
                avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Alif'
              },
              {
                name: 'Sarah Jenkins',
                role: 'Head of Product Design',
                image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=300&auto=format&fit=crop',
                avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Sarah'
              },
              {
                name: 'Marcus Vance',
                role: 'Operations Manager',
                image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=300&auto=format&fit=crop',
                avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=Marcus'
              }
            ].map((member, idx) => (
              <div key={idx} className="group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-w-3 aspect-h-2 mb-6 overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute top-[180px] left-1/2 -translate-x-1/2 rounded-full border-4 border-white bg-white shadow-sm">
                  <img src={member.avatar} alt="Avatar" className="h-14 w-14 rounded-full bg-brand-primary-light" />
                </div>
                <div className="pt-8 text-center">
                  <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-primary">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
