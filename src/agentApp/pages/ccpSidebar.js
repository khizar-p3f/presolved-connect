
import React, { useRef, useState, useEffect } from 'react';
import { Collapse } from 'antd';
import '../../aws-streams/connect-streams'
import './ccpSidebar.less'
const { Panel } = Collapse;
const CustomCCPSidebar = () => {
    const CCPDiv = useRef(null)

    useEffect(() => {
        initiateCCP()
    }, [])

    useEffect(() => {
        console.log({agent:window.config.agent});
    }, [window.config.agent])

    const initiateCCP = () => {
        if (CCPDiv.current) {
            const ccpUrl = "https://p3fusion-qa.my.connect.aws/ccp-v2";
            connect.core.initCCP(CCPDiv.current, {
                ccpUrl, // REQUIRED
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
            checkCCPInitialized()
        }
    }

    const checkCCPInitialized = () => {
        let i = 0;
        const PollInterval = setInterval(() => {
            console.log(`Presolved::CCP::Polling to get the login status ${i}`);
            if (connect.agent.initialized) {
                
                clearInterval(PollInterval)
                //listenIncomingActivities()
                console.log(`Presolved::CCP::Login success stoppping the poll`);
                getAgentInfoFromConnect().then((agentInfo) => {
                  /*   dispatch(updateUser({ ...agentInfo }))
                    dispatch(changeAgentAvailibility(agentInfo.status))
                    dispatch(updateSettings({ ccpInitiated: true })) */
                });
            }
            if (i > 30) {
                clearInterval(PollInterval)
                console.log(`Presolved::CCP::Login failed stoppping the poll`);
            }
            i++;
        }, 1000);

    }
    const getAgentInfoFromConnect = () => {
        return new Promise((resolve, reject) => {
            console.log("Presolved::CCP::Gettting loged in Agent information");
            connect.agent((agent) => {
                window.config.agent = agent
                let agentData = agent._getData()
                let currentState = agent.getStatus()
                console.log(`Presolved::CCP::completed loading the Agent information`);
                resolve({ info: agentData.configuration, status: currentState })
            });
        })
    }

    return (
        <div className='agent-ccp-sidebar'>
            <section className="collapse-menu-container">
                <Collapse defaultActiveKey={['customCCP']}>
                    <Panel header="Menu" key="2">
                        <p>welcome</p>
                    </Panel>
                </Collapse>
            </section>
            <section className="ccp-container" ref={CCPDiv}>

            </section>
        </div>
    )
}

export default CustomCCPSidebar