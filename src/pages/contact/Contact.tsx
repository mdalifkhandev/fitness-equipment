import { Mail, MapPin, Phone, Send, Clock, Building2 } from 'lucide-react';

const Contact = () => {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-secondary py-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Have questions about our fitness equipment? Need help with an order? 
            Our team is here to assist you every step of the way.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary-light text-brand-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Head Office</h3>
                    <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                      Mohakhali, Gulshan,<br />
                      Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary-light text-brand-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Phone Support</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      <a href="tel:01704347965" className="hover:text-brand-primary transition-colors">
                        01704 347965
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary-light text-brand-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Email Us</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      <a href="mailto:mdalifkhandev@gmail.com" className="hover:text-brand-primary transition-colors">
                        mdalifkhandev@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary-light text-brand-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Working Hours</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      We are open 24/7.<br />
                      Our support team is available around the clock, every day of the week, to assist you with any inquiries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/mdalifkhan123/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1877F2]/10 text-[#1877F2] transition-transform hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
                <a 
                  href="https://x.com/MDAlifK26277528" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-900 transition-transform hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      placeholder="John"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Your message here..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary p-4 text-base font-bold text-white transition-all hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/25"
                >
                  Send Message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </section>
    </main>
  );
};

export default Contact;
