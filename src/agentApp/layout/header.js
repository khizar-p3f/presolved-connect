import React from 'react'
import { Avatar, Layout, Menu, Space, Typography, theme, Button, Modal } from 'antd';
import { UserOutlined, LogoutOutlined, BellOutlined, AimOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';

import logo from '../../adminApp/assets/images/logo.png'
import { Link, navigate } from '@gatsbyjs/reach-router';
import { Auth } from 'aws-amplify';
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

    const Logout = () => {
        Modal.confirm({
            title: 'Are you sure you want to logout?',
            content: 'You will be logged out of the system.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                Auth.signOut().then((data) => {
                    navigate("/login")
                })
            }
        });
    }

    return (
        <Header className="agent-primary" style={{ background: token.colorBgBase }}>
            <div className="logo-container" ><img src={logo} height={54} /></div>
            <div className="menu-container">
                <Menu mode="horizontal" defaultSelectedKeys={['home']} items={items} />
            </div>
            <div className="user-container">
                <Space size={10}>
                    <Space>
                        <Button shape='round' icon={<AimOutlined />} type="primary"  >Record</Button>
                        <Button shape='circle' icon={<BellOutlined />} type="default" />
                    </Space>
                    <Space size={5}>
                        <Button onClick={() => Logout()} shape='circle' icon={<LogoutOutlined />} type="primary" danger />
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