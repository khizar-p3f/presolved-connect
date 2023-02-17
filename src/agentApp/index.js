import React, { useEffect, useState } from 'react';
import { Layout, ConfigProvider, Collapse, Button } from 'antd';
import './assets/style/index.less';
import AgentPrimaryHeader from './layout/header';
import SplitPane, { Pane } from 'react-split-pane';
import CustomCCP from './layout/customCCP';
import { useSelector } from 'react-redux';
import {Auth} from 'aws-amplify';
import { navigate } from '@gatsbyjs/reach-router';


const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;
const text = "lorem ipsum lorem i"
const AgentAppMain = () => {

  const settings=useSelector(state=>state.settings)
  useEffect(()=>{
    Auth.currentAuthenticatedUser().then(user =>{

    })
    .catch((err)=>{
      navigate("/login")
    });
  },[])




  return (
    <ConfigProvider prefixCls='presolved' theme={{ token:settings }} >
      <Layout className="app-master">
        <AgentPrimaryHeader />

        <Content className="app-content">

          <SplitPane className='resizable-pane' split="vertical" minSize={400}>
            
            <div className='sidebar'>

              <Collapse defaultActiveKey={['customCCP']}>
                <Panel header="Menu" key="2">
                  <p>{text}</p>
                </Panel>

              </Collapse>

            </div>

            <Pane className='content-main-area'>
              <h1>Content Area</h1>
            </Pane>

          </SplitPane>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default AgentAppMain