import App from '@/App';
import Login from '@/pages/login/Login';
import Registration from '@/pages/registration/Registration';
import { createBrowserRouter } from 'react-router-dom';
import { userPath } from './userRoute';
import { routerGenerator } from '@/utils/routerGenerator';
import { profilePath } from './profileRoute';
import ProductDetails from '@/pages/products/ProductDetails';
import Products from '@/pages/products/Products';
import CheakOut from '@/pages/cheakout/CheakOut';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routerGenerator(userPath),
  },
  {
    path: '/',
    element: <App />,
    children: routerGenerator(profilePath),
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'products/:id',
        element: <ProductDetails />,
      },
      {
        path: 'products/cheakout/:id',
        element: <CheakOut />,
      },
      {
        path: '/products/:catagory',
        element: <Products />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Registration />,
      },
    ],
  },
]);

export default router;
