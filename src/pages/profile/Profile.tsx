import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button, Dropdown, MenuProps } from 'antd';
import { logout, useCurrentToken } from '@/redux/fetures/auth/authSlice';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

const Profile = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const logoutUser = () => {
    try {
      dispatch(logout());
      toast.success('Log Out Successfully');
    } catch (error) {
      toast.error(`Error : ${error}`);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'Account Details',
      label: token ? (
        <Link to={'/account-details'} className="font-medium text-slate-700">
          Account Details
        </Link>
      ) : null,
    },
    {
      key: 'Order History',
      label: token ? (
        <Link to={'/order-history'} className="font-medium text-slate-700">
          Order History
        </Link>
      ) : null,
    },
    {
      key: 'My Cart',
      label: token ? (
        <Link to={'/my-cart'} className="font-medium text-slate-700">
          My Cart
        </Link>
      ) : null,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      danger: true,
      label: token ? (
        <div onClick={logoutUser} className="font-bold text-red-600 w-full">
          Log Out
        </div>
      ) : (
        <Link to={'/login'}>Login</Link>
      ),
    },
  ];

  return (
    <Dropdown 
      menu={{ items }} 
      placement="bottomRight"
      trigger={['click']}
      overlayClassName="w-48"
    >
      <button 
        type="button" 
        className="flex items-center justify-center p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all focus:outline-none"
      >
        <UserCircle className="h-7 w-7" />
      </button>
    </Dropdown>
  );
};

export default Profile;
