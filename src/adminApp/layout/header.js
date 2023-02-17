import { Layout, theme, Menu, Typography, Row, Col, Avatar, Space, Input } from 'antd';
import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Link, navigate } from '@gatsbyjs/reach-router';
import logo from '../assets/images/logo.png';
import logoWhite from '../assets/images/logo-white.png';

const { Header } = Layout;
const { Search } = Input;


const AdminHeader = ({ setCollapsed, collapsed }) => {
    const { useToken } = theme;
    const { token } = useToken();
    const { token: { colorBgContainer }, } = theme.useToken();

    const onSearch = (value) => console.log(value);

    return (

        <Header
            className="main"
            theme='dark'
            style={{
                background: colorBgContainer,
                width: '100vw',
                left: 0,
                top: 0,
                right: 0,
                padding: '2px 20px 2px 20px'
            }}
        >


            <Row justify="space-between">
                <Col>
                    <Row>
                        <Col style={{ marginLeft: '12px' }}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setCollapsed(!collapsed),
                            })}
                        </Col>
                        <Col style={{ marginLeft: '30px' }}>
                            <div className="logo">
                                <Link to="/admin">
                                    <img width={80} height={40} src={logo} alt="logo" />
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Search style={{margin: '12px 20px', width:'40vw'}} placeholder="search here" onSearch={onSearch} enterButton />
                </Col>
                <Col>
                    <div style={{ margin: '0 20px', textAlign: 'right', cursor: 'pointer' }}>
                        <Space>
                            <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
                            <Typography.Text>Username</Typography.Text>
                        </Space>
                    </div>
                </Col>
            </Row>
        </Header>

    );
}

export default AdminHeader;