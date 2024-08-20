import { userPath } from '@/router/userRoute';
import { menubaeItemGenerator } from '@/utils/menubarItemsGenerator';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import Profile from '@/pages/profile/Profile';
import { useAppSelector } from '@/redux/hooks';
import { useCurrentToken } from '@/redux/fetures/auth/authSlice';

const { Header, Content } = Layout;

const items = menubaeItemGenerator(userPath);

const MainLayout = () => {
  const token = useAppSelector(useCurrentToken);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* <div className="demo-logo" /> */}
          <Link to="/">
            <div className="text-[#001529] font-extrabold text-5xl px-3 mr-10 bg-white rounded-lg p-1">
              FIT-EQ
            </div>
          </Link>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['Home']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
          {token ? (
            <Profile />
          ) : (
            <Link to={`/login`} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-10 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>
          )}
        </Header>
        <Content style={{ padding: '0 48px' }}>
          <div
            style={{
              padding: 25,
              minHeight: 590,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default MainLayout;
