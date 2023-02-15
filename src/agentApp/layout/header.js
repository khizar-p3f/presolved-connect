import React from 'react'
import { Avatar, Layout, Menu, Space, Typography, theme, Button } from 'antd';
import { UserOutlined, LogoutOutlined, BellOutlined, AimOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';

import logo from '../../adminApp/assets/images/logo.png'
import { Link } from '@gatsbyjs/reach-router';
const { Header } = Layout

const AgentPrimaryHeader = () => {
    const items = [{
        key: 'home',
        label: <Link to='/'><Space><HomeOutlined /> Dashboard</Space></Link>,
    }, {
        key: 'wisdom',
        label: <Link to='/'><Space><BookOutlined /> Wisdom</Space></Link>,
    }]
    const { useToken } = theme
    const { token } = useToken()
    return (
        <Header className="agent-primary" style={{ background: token.colorBgBase }}>
            <div className="logo-container" ><img src={logo} height={54} /></div>
            <div className="menu-container">
                <Menu  mode="horizontal" defaultSelectedKeys={['home']} items={items} />
            </div>
            <div className="user-container">
                <Space size={10}>
                    <Space>
                        <Button shape='round' icon={<AimOutlined />} type="primary"  >Record</Button>
                        <Button shape='circle' icon={<BellOutlined />} type="default" />
                    </Space>
                    <Space size={5}>
                        <Button shape='circle' icon={<LogoutOutlined />} type="primary" danger />
                    </Space>
                    <Space size={5}>
                        <Avatar style={{ background: token.colorPrimaryBgHover }} icon={<UserOutlined />} />
                        <Typography.Text strong>Khizar Ahmed</Typography.Text>
                    </Space>

                </Space>
            </div>
        </Header>
    )
}

export default AgentPrimaryHeader