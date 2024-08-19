import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { logout, useCurrentToken } from '@/redux/fetures/auth/authSlice';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

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
        <Link to={'/account-details'} className="">
          Account Details
        </Link>
      ) : null,
    },
    {
      key: 'Order History',
      label: token ? (
        <Link to={'/order-history'} className="">
          Order History
        </Link>
      ) : null,
    },
    {
      key: 'logout',
      danger: true,
      label: token ? (
        <Button onClick={logoutUser} className=" bg-red-600">
          Log Out
        </Button>
      ) : (
        <Link to={'/login'}>Login</Link>
      ),
    },
  ];

  return (
    <div>
      <Dropdown menu={{ items }}>
        <a onClick={e => e.preventDefault()}>
          <Space className=" flex justify-center items-center text-white">
            <title>Profile</title>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                // stroke-linecap="round"
                strokeLinecap="round"
                //  stroke-linejoin="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default Profile;
