
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Breadcrumb, Button, Col, Empty, Layout, Menu, Radio, Result, Row, Space, Spin, theme, Typography } from 'antd';
const { Header, Content, Footer } = Layout;
import * as AWS from '@aws-sdk/client-connect'
import { Auth } from 'aws-amplify'

import 'antd/dist/reset.css';
import './connect.less'
import { CustomCCPWidgetProvider, CustomCCPWidgetContext } from './connect';
import DialerApp from './dialer';

const AWSSDK = () => {
  let ccp = null;
  const container = useRef(null);



  const [state, setState] = useState({
    userLoggedIn: false,
    CCPInitiated:null,
  })



  const { token: { colorBgContainer }, } = theme.useToken();


  return (
    
    
      <Layout>
        <Header
          style={{
            justifyContent: 'space-between',
            display: 'flex',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
          }}
        >
          <div className='logo'><Typography.Title style={{ color: '#fff' }} level={4}>Custom CCP</Typography.Title></div>
          <Menu
            style={{ flex: 1 }}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(3).fill(null).map((_, index) => ({
              key: String(index + 1),
              label: `nav ${index + 1}`,
            }))}
          />
        </Header>
        <Content
          className="site-layout-main"
          style={{
            padding: '0 50px',
          }}
        >   <div className="custom-ccp" ref={container}></div>
          <Breadcrumb style={{ margin: '16px 0', }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={6} className="inner-sidebar padding">
                <Button type='primary' shape='round'>Get States</Button>
              </Col>
              <Col span={18} className="inner-content padding">
                <CustomCCPWidgetProvider>
                    <DialerApp />
                </CustomCCPWidgetProvider>
              </Col>
            </Row>

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




  )
}

export default AWSSDK

