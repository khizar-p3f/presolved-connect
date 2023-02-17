import React, { useEffect, useState } from 'react'
import 'antd/dist/reset.css'
import './index.less'
import logo from '../adminApp/assets/images/logo.png'
import bg from './assets/bg.png'
import { Button, Layout, Typography } from 'antd'
import oldAwsConfig from '../aws-exports'
import { Auth, Hub, Amplify } from 'aws-amplify'
import generateCalendar from 'antd/es/calendar/generateCalendar'
import { updateUser } from '../store/reducers/user'
import { useDispatch } from 'react-redux'
import { navigate } from '@gatsbyjs/reach-router'
const { Content } = Layout
const AppLoginPage = (props) => {
    const dispatch=useDispatch()

    const isLocalhost = Boolean(
        window.location.hostname === "localhost" ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === "[::1]" ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );
    
    let oauth = {       
        domain: "presolvedconnectdemoapp.auth.us-east-1.amazoncognito.com",
        scope: [
            "aws.cognito.signin.user.admin",
            "email",
            "openid",
            "phone",
            "profile",
        ],
        redirectSignIn: 'https://localhost:3000/login/',
        redirectSignOut: 'https://localhost:3000/login/',
        responseType: "code",
        identityProvider: "CognitoSAML",
    }
    const [localRedirectSignIn, productionRedirectSignIn] = oauth?.redirectSignIn.split(",") || 'https://d36z7vqpuzrikl.cloudfront.net';
    const [localRedirectSignOut, productionRedirectSignOut] = oauth?.redirectSignOut.split(",") || 'https://d36z7vqpuzrikl.cloudfront.net';
    let awsConfig = {
        ...oldAwsConfig,
        oauth: oauth
    }

    let updatedAwsConfig = {
        ...awsConfig,
        oauth: {
            ...oauth,
            redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
            redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
        },
    };

    const [state, setState] = useState({
        showLoginProgress: false,
        isLoggedin: false,
        user: null,
    });
    const generateRandomPassword=()=>{
        
        let password = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 8; i++)
            password += possible.charAt(Math.floor(Math.random() * possible.length));
        return password;


    }
    useEffect(() => {
        Amplify.configure(updatedAwsConfig);
       
        Auth.currentAuthenticatedUser()
            .then((login) => {
                setState({ ...state, isLoggedin: true });                
                dispatch(updateUser({ ...login }));
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
            });
    }, [state.isLoggedin]);

    Hub.listen("auth", (data) => {
        const event = data.payload.event;
        if (event === "signIn") {
            setState({ ...state, isLoggedin: true });
        }
    });


    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
    }

    const SSOLogin=()=>{
      
            setState({ ...state, showLoginProgress: true })
            console.log({ awsExport: updatedAwsConfig, auth: Auth.configure() });
            Auth.federatedSignIn({ provider: "CognitoSAML" })
                .then((res) => {
                    console.log({ res });
                })
                .catch((error) => {
                    console.error({error})
                    console.error("Error with FederatedSignin is ", error);
                })

    
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
                        <Button block type='primary' size='large'
                         onClick={() => SSOLogin()}
                        >Login </Button>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}


export default AppLoginPage