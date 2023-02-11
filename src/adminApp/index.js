import React, { useState } from 'react';
import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, ConfigProvider, Space, Typography } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import './assets/style/index.less'
import logo from './assets/images/logo.png'
const AdminMain = () => {
    const items = [
        getItem('Option 1', '1', <PieChartOutlined />),
        getItem('Option 2', '2', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
            getItem('Tom', '3'),
            getItem('Bill', '4'),
            getItem('Alex', '5'),
        ]),
        getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined />),
    ];
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <ConfigProvider
            prefixCls='presolved'
            theme={{
                
                token: {
                    colorPrimary: '#00b96b',
                },
            }}
        >
            <Layout className="admin-master" style={{ minHeight: '100vh', }}>
                <Sider className="master-sider" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="logo-container">

                        <img src={logo} height={50} />
                        
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    />
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                            }}
                        >
                            Bill is a cat.
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Ant Design ©2023 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );

}

export default AdminMain



function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}