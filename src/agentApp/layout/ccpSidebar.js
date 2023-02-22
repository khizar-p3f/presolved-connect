
import React, { useRef, useState, useEffect } from 'react';
import { Collapse, Space, Spin, Typography,Modal,Avatar,Divider,Button    } from 'antd';
import '../../aws-streams/connect-streams'
import './ccpSidebar.less'
import popupImage from '../assets/images/phone.gif'

const { Panel } = Collapse;
const CustomCCPSidebar = () => {
    const CCPDiv = useRef(null)
    const [CCPLoaded, setCCPLoaded] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)

    useEffect(() => {
        initiateCCP()
    }, [])

    useEffect(() => {
        console.log({ agent: window.config.agent });
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
                setCCPLoaded(true)
                listenIncomingActivities()
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

    const listenIncomingActivities = () => {
        connect.contact(function (contact) {
            console.log(contact);
            let persistContact = contact
            window.config.contacts = contact         

            contact.onConnecting(function (ctx) {
                window.config.ctx = ctx      
                let contactAttributes = ctx._getData()
                console.log("Presolved::connect::contact::onConnecting::");
                setShowPopUp(true)
            })

            contact.onIncoming(function (ctx) {
                let contactAttributes = ctx._getData()
                console.log("Presolved::connect::contact::onIncoming::");

            });

            contact.onRefresh(function (ctx) {
                let contactAttributes = ctx._getData()
            });

            contact.onAccepted(function (ctx) {
                console.log("Presolved::connect::contact::onAccepted::");
                let contactAttributes = ctx._getData()
            });

            contact.onEnded(function (ctx) {
                window.config.contacts = new Map()
                
                console.log("Presolved::connect::contact::onEnded::");
                let contactAttributes = ctx._getData()
                contact.clear({
                    success: function () {
                        console.log("Presolved::connect::contact::cleared::");
                    },
                    failure: function () {
                        console.error("Presolved::connect::contact::cleared::");
                    }
                })                
            });
            contact.onConnected(function (ctx) {
                console.log("Presolved::connect::contact::onConnected::",);

            });
            contact.onMissed(function (ctx) {
                console.log("Presolved::connect::contact::onMissed::", ctx);
            })
        });

    }

    return (
        <div className='agent-ccp-sidebar'>
            <section className="collapse-menu-container">
                <Collapse defaultActiveKey={['customCCP']}>
                    <Panel header="Menu" key="customCCP">
                        <p>welcome</p>
                    </Panel>
                </Collapse>
            </section>
            {!CCPLoaded &&
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:10, margin:'50px 0', padding:'50px 0' }}  >
                    <Spin size={70} />
                    <Typography.Title level={3}>Please wait loading . . .</Typography.Title>
                </div>
            }

            <section className="ccp-container" ref={CCPDiv} style={{ visibility: CCPLoaded ? 'visible' : 'hidden' }}/>
            <Modal width={300} className="incoming-alert" open={showPopUp} onCancel={() => setShowPopUp(false)} footer={null}>
                    <div className='popup-container'>
                        <div className='items'>
                            <div className="poup-image">
                                <Avatar gap={10} style={{ backgroundColor: '#f5f5f5', }} size={200} shape='circle' icon={<img src={popupImage} />} />
                            </div>
                        </div>
                        <Divider />
                        <div className='items'>
                            <Typography.Title level={5} >New Vocie call</Typography.Title>
                            <Typography.Title level={4} >John Doe</Typography.Title>
                        </div>
                        <div className='items'>
                            <Typography.Title level={5} >Phone #</Typography.Title>
                            <Typography.Title level={4} >+1 9715463635</Typography.Title>
                        </div>
                        <Divider />
                        <div className='items'>

                            <Space direction='vertical'>
                                <Button size='large' block type='primary' onClick={() => acceptCall()}>Accept</Button>
                                <Button size='large' block type='primary' danger onClick={() => endCall()}>Reject</Button>
                                <Button size='large' block type='dashed' onClick={() => setState({ ...state, showIncomingPopup: false })}>Ignore</Button>
                            </Space>
                        </div>
                    </div>
                </Modal>
        </div>
    )
}

export default CustomCCPSidebar