import { userPath } from "@/router/userRoute";
import { menubaeItemGenerator } from "@/utils/menubarItemsGenerator";
import { Button, Layout, Menu, theme } from "antd"
import {  Link, Outlet } from "react-router-dom";
const { Header, Content } = Layout


const items=menubaeItemGenerator(userPath)

const MainLayout = () => {
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
                    <Link to='/'>
                    <div className="text-[#001529] font-extrabold text-5xl px-3 mr-10 bg-white rounded-lg p-1">FIT-EQ</div>
                    </Link>

                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['Home']}
                        items={items}
                        style={{ flex: 1, minWidth: 0 }}
                    />
                    <Button>asdfa</Button>
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

                        
                        <Outlet/>
                    
                    </div>
                </Content>
                
            </Layout>
        </div>
    )
}

export default MainLayout