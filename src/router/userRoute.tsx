import About from '@/pages/about/About';
import Contact from '@/pages/contact/Contact';
import Home from '@/pages/home/Home';
import Products from '@/pages/products/Products';
import Managementa from '@/pages/productsManagmentnt/management/Managementa';
import MyCard from '@/pages/profile/MyCard';

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
    name: 'My Card',
    path: 'my-card',
    element: <MyCard />
      
  },
  {
    name: 'About',
    path: 'About',
    element: 
        <About />
   
  },
  {
    name: 'Contact',
    path: 'contact',
    element: <Contact />
      
  },
  
];
