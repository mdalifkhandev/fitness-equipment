import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import Profile from '@/pages/profile/Profile';
import { useAppSelector } from '@/redux/hooks';
import { useCurrentToken } from '@/redux/fetures/auth/authSlice';
import { ShoppingCart, User, Menu as MenuIcon, X, Dumbbell } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'All Shops', path: '/products' },
  { name: 'Dashboard', path: '/productsmanagement' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const MainLayout = () => {
  const token = useAppSelector(useCurrentToken);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-md shadow-md border-b border-slate-800'
            : 'bg-slate-950 border-b border-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-brand-primary text-white p-2 rounded-xl group-hover:scale-105 transition-transform">
                  <Dumbbell className="h-6 w-6" />
                </div>
                <span className="font-black text-2xl tracking-tight text-white">
                  FIT<span className="text-brand-primary">.</span>EQ
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-bold tracking-wide transition-colors ${
                      isActive
                        ? 'text-brand-primary'
                        : 'text-slate-300 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                to="/my-cart"
                className="relative text-slate-300 hover:text-white transition-colors p-2"
              >
                <ShoppingCart className="h-6 w-6" />
              </Link>
              
              <div className="h-6 w-px bg-slate-700"></div>

              {token ? (
                <Profile />
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-primary-hover transition-colors shadow-sm"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden gap-4">
              <Link
                to="/my-cart"
                className="text-slate-300 hover:text-white"
              >
                <ShoppingCart className="h-6 w-6" />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1 shadow-lg">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-base font-bold ${
                    isActive
                      ? 'bg-brand-primary/20 text-brand-primary'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 mt-4 border-t border-slate-800 px-4 pb-2">
              {token ? (
                <Profile />
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 bg-brand-primary text-white px-5 py-3 rounded-xl font-bold text-base hover:bg-brand-primary-hover transition-colors w-full"
                >
                  <User className="h-5 w-5" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow w-full h-full min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
