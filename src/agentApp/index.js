import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Layout, ConfigProvider, Collapse, Button } from 'antd';
import './assets/style/index.less';

import SplitPane, { Pane } from 'react-split-pane';

import { useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { navigate, Router } from '@gatsbyjs/reach-router';
import { useDispatch } from 'react-redux';
import { updateUser } from '../store/reducers/user';


import CustomCCPSidebar from './layout/ccpSidebar';
import AgentPrimaryHeader from './layout/header';
import AgentDashboard from './pages';

const PlaceHolder = React.lazy(() => import('./pages/placeholder'))
const CustomCCPWidgetProvider = React.lazy(() => import('./connect'))

const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;



const AgentAppMain = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  const settings = useSelector(state => state.settings)
  useEffect(() => {
    Auth.currentAuthenticatedUser().then(user => {
      dispatch(updateUser(user))
      window.config.user = user
      setIsLoaded(true)
    }).catch((err) => {
      navigate("/login")
    });
  }, [])




  return (
    <ConfigProvider prefixCls='presolved' theme={{ token: settings }} >
      <CustomCCPWidgetProvider>
        <Router>
          <AgentDashboard path='/' />
        </Router>
      </CustomCCPWidgetProvider>
    </ConfigProvider>
  )
}

export default AgentAppMain