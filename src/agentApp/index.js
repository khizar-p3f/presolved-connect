import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Layout, ConfigProvider, Collapse, Button } from 'antd';
import './assets/style/index.less';
import AgentPrimaryHeader from './layout/header';
import SplitPane, { Pane } from 'react-split-pane';
import CustomCCP from './layout/customCCP';
import { useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { navigate } from '@gatsbyjs/reach-router';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/reducers/user';
import CustomCCPSidebar from './pages/ccpSidebar';


const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;
const text = "lorem ipsum lorem i"
const AgentAppMain = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  const settings = useSelector(state => state.settings)
  useEffect(() => {
    Auth.currentAuthenticatedUser().then(user => {
      dispatch(updateUser(user))
      window.config.user = user
      setIsLoaded(true)
    })
      .catch((err) => {
        navigate("/login")
      });
  }, [])




  return (
    <ConfigProvider prefixCls='presolved' theme={{ token: settings }} >
      <Layout className="app-master">
        <AgentPrimaryHeader />
        <Content className="app-content">
          <SplitPane className='resizable-pane' split="vertical" minSize={400}>
            <CustomCCPSidebar />
            <Pane className='content-main-area'>
              {
                isLoaded ?  <h1>Content Area</h1> : <div>Loading...</div>
              }             
            </Pane>
          </SplitPane>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default AgentAppMain