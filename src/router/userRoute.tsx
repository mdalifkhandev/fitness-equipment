import ProtactRoute from '@/components/layout/protctedRoute/ProtactRoute';
import About from '@/pages/about/About';
import Contact from '@/pages/contact/Contact';
import Home from '@/pages/home/Home';
import Products from '@/pages/products/Products';
import Managementa from '@/pages/productsManagmentnt/management/Managementa';

export const userPath = [
  {
    name: 'Home',
    path: '',
    index: true,
    element: <Home />,
  },
  {
    name: 'All Shops',
    path: 'products',
    element: <Products />,
  },
  {
    name: 'Products Management',
    path: 'productsmanagement',
    element: <Managementa />,
  },
  {
    name: 'About',
    path: 'About',
    element: (
      <ProtactRoute>
        <About />
      </ProtactRoute>
    ),
  },
  {
    name: 'Contact',
    path: 'contact',
    element: (
      <ProtactRoute>
        <Contact />
      </ProtactRoute>
    ),
  },
];
