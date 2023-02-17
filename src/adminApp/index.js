import React, { useState } from 'react'
import { Router } from '@gatsbyjs/reach-router';
import { ConfigProvider, Layout, Breadcrumb } from 'antd';
import 'antd/dist/reset.css';
import AdminSider from './layout/sider';
import AdminHeader from './layout/header';

const ThemeEditor = React.lazy(() => import('./themeEditor/themeEditor'))

const { Content } = Layout;

const defaultThemeData = { borderRadius: 6, colorPrimary: '#407db5', fontFamily: 'Open Sans', fontSize: 14, }
const componentSize = 'medium'

const AdminIndexPage = () => {

    const [collapsed, setCollapsed] = useState(true);

    return (
        <ConfigProvider prefixCls='presolved' theme={{ token: defaultThemeData }} componentSize={componentSize} >
            <Layout style={{ minHeight: '100vh', }} >
                <AdminHeader setCollapsed={setCollapsed} collapsed={collapsed}/>
                <Layout className="site-layout">
                    <AdminSider collapsed={collapsed}/>
                    <Content  >
                        <Router>
                            <ThemeEditor path="/theme" />
                        </Router>
                    </Content>
                </Layout>

            </Layout>


        </ConfigProvider>

    )
}

export default AdminIndexPage
