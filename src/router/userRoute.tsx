import ProtactRoute from '@/components/layout/protctedRoute/ProtactRoute';
import  About  from '@/pages/about/About';
import Contact from '@/pages/contact/Contact';
import Home from '@/pages/home/Home';
import Login from '@/pages/login/Login';
import Registration from '@/pages/registration/Registration';


export const userPath=[
    {
        name:'Home',
        path:'',
        index:true,
        element:<Home/>
    },
    {
        name:'About',
        path:'About',
        element: <ProtactRoute><About /></ProtactRoute> 
    },
    {
        name:'Contact',
        path:'contact',
        element:<ProtactRoute><Contact /></ProtactRoute> 
    },
    {
        name:'Login',
        path: 'login',
        element: <Login />,
    },
    {
        name:'Registration',
        path: 'registration',
        element: <Registration />,
    },
]