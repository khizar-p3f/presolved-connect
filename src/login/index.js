import React from 'react'
import 'antd/dist/reset.css'
import './index.less'
import logo from '../adminApp/assets/images/logo.png'
import bg from './assets/bg.png'
import { Button, Layout, Typography } from 'antd'
const { Content } = Layout
const AppLoginPage = (props) => {
    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
    }
    return (
        <Layout className='login-page' style={bgStyle}>
            <Content className='container'>
                <div className='content'>
                    <div className='header'>
                        <div className='logo'>
                            <img src={logo} height={150} alt='logo' />
                        </div>
                        <div className='title'>
                            <Typography.Title level={3}>Authentication Required</Typography.Title>
                            <Typography.Text level={3}>
                                You must be logged in to access this page.
                            </Typography.Text>
                        </div>
                    </div>
                    <div className='body'>
                        <Button block type='primary' size='large' onClick={() => null}>Login </Button>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}


export default AppLoginPage