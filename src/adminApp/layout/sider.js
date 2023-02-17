import { Layout, theme, Menu, Typography, ConfigProvider } from 'antd';
import React, { useState } from 'react';
import { UserOutlined, DashboardOutlined, BgColorsOutlined } from '@ant-design/icons';
import { Link, navigate } from '@gatsbyjs/reach-router';
import logo from '../assets/images/logo.png';

const { Sider } = Layout;

const AdminSider = ({collapsed}) => {
    const { useToken } = theme;
    const { token } = useToken();
    const { token: { colorBgContainer }, } = theme.useToken();
    


    return (
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: 0
                }
            }}
        >
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="main"
                style={{
                    background: colorBgContainer,
                    overflow: 'auto',
                    height: '100vh',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)'
                }}
            >

                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                    }}
                    items={[
                        {
                            key: "1",
                            icon: <DashboardOutlined />,
                            label: <Link to="/admin">Dashboard</Link>,
                        },
                        {
                            key: "2",
                            icon: <BgColorsOutlined />,
                            label: <Link to="/admin/theme">Theme</Link>,
                        },
                    ]}
                />
            </Sider>

        </ConfigProvider>

    );
}

export default AdminSider;