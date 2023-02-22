import '../../aws-streams/connect-streams'
import React, { useState, createContext, useRef, useEffect } from 'react'
import { Auth } from 'aws-amplify';
import { Button, Divider } from 'antd';

export const CustomCCPWidgetContext = createContext()

export const CustomCCPWidgetProvider = ({ children }) => {
    const ccp = useRef(null);
    const [state, setState] = useState({
        connect: null,
        CCPInitiated: false,
        userLoggedIn: false,
        user: null,
        contact: null,
        agent: null,

    })

    useEffect(() => {
        initiateCCP()
        CheckLogin()
    }, [state.userLoggedIn])

    const CheckLogin = () => {
        Auth.currentAuthenticatedUser().then((user) => {
            console.log({ user });
            setState({ ...state, userLoggedIn: true, user })
        }).catch((err) => {
            console.log("check login error", err);
        })
    }

    const initiateCCP = () => {
        if (state.userLoggedIn && ccp.current) {
            const connectUrl = "https://p3fusion-qa.my.connect.aws/ccp-v2";
            
            connect.core.initCCP(ccp.current, {
                ccpUrl: "https://p3fusion-qa.my.connect.aws/ccp-v2", // REQUIRED
                region: "us-east-1", // REQUIRED for `CHAT`, optional otherwise
                loginPopup: false, // optional, defaults to false
                softphone: {
                    // optional, defaults below apply if not provided
                    allowFramedSoftphone: true, // optional, defaults to false
                    disableRingtone: false, // optional, defaults to false
                    ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
                },
                // optional, defaults to connect.getLog()
                ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
                ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
                ccpLoadTimeout: 10000 //optional, defaults to 5000 (ms)
            });
            let i = 0;
            const PollInterval = setInterval(async () => {
                console.log(`Presolved::CCP::Polling to get the login status ${i}`);
                if (connect.agent.initialized) {          
                    clearInterval(PollInterval)
                    console.log(`Presolved::CCP::Login success stoppping the poll`);
                    setState({ ...state, CCPInitiated: true, connect:connect})
                    listenIncomingActivities()
                    
                }
                if (i > 30) {
                    clearInterval(PollInterval)
                    console.log(`Presolved::CCP::Login failed stoppping the poll`);
                    reject(true)
                }
                i++;
            }, 1000);
        }


    }
    const listenIncomingActivities = () => {

        connect.agent((agent) => {
            setState({ ...state, agent })            
        })

        connect.contact(function (contact) {
            setState({ ...state, contact,connect })
            contact.onConnecting(function (ctx) {
                let contactAttributes = ctx._getData()                
                console.log("Presolved::connect::contact::onConnecting::");
                console.log({
                    contact,
                    ctx,
                    contactAttributes
                });
            })

            contact.onIncoming(function (ctx) {
                let contactAttributes = ctx._getData()
                console.log("Presolved::connect::contact::onRefresh::", contactAttributes);
            });

            contact.onRefresh(function (ctx) {
                let contactAttributes = ctx._getData()
                console.log({ contactAttributes });
                setState({ ...state, contact })

            });

            contact.onAccepted(function (ctx) {
                let contactAttributes = ctx._getData()
                console.log("Presolved::connect::contact::onAccepted::", contactAttributes);
            });

            contact.onEnded(function () {
                console.log("Presolved::connect::contact::onEnded::", contact);
                var contactData = contact._getData()
                setState({ ...state, contact:null })
            });

            contact.onConnected(function (ctx) {
                console.log("Presolved::connect::contact::onConnected::", ctx);
                let contactData = ctx._getData()

            });



        });

    }


    return state.userLoggedIn && <CustomCCPWidgetContext.Provider value={state}>
        <section>
            {children}
            <Divider />
            <div>
                <div ref={ccp} style={{ height: 500, width: '100%', visibility: '' }}></div>
            </div>
        </section>
    </CustomCCPWidgetContext.Provider>
}




