import React, { useState, createContext, useRef, useEffect } from 'react'
import { activeProducts, customer360, userProfilesMock, policyDetails, recentHistory } from '../mock/customerProfiles'
import popupImage from '../assets/images/phone.gif'
import { Avatar, Button, Layout, Divider, Modal, Row, Space, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, } from '../../store/reducers/user'
import { changeAgentAvailibility, updateSettings } from '../../store/reducers/settings'
import { BorderOutlined, LineOutlined } from '@ant-design/icons';
import { updateCalls } from '../../store/reducers/activeCalls'
import './index.less'
import '../../aws-streams/connect-streams'
import '../../aws-streams/amazon-connect-chat'
import './chat'
import PlaceHolder from '../pages/placeholder'
import AgentPrimaryHeader from '../layout/header'
import SplitPane, { Pane } from 'react-split-pane'
import { faker } from '@faker-js/faker';


export const CustomCCPWidgetContext = createContext()

const { Header, Content, Footer } = Layout;
const CustomCCPWidgetProvider = ({ children }) => {
    const ccp = useRef(null);
    const dispatch = useDispatch()
    const [state, setState] = useState({
        isLoaded: false,
        channelType: null,
        contact: new Map(),
        agent: null,
        activeCall: null
    })
    const [showChat, setShowChat] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)

    let value = React.useMemo(() => ({
        muteCall: muteCall,
        holdCall: holdCall,
        endCall: endCall,
        acceptCall: acceptCall,
        ...state
    }), [state]);

    useEffect(() => initiateCCP(), [])

    const initiateCCP = () => {
        if (ccp.current) {
            connect.chat
            const ccpUrl = "https://p3fusion-qa.my.connect.aws/ccp-v2";
            connect.core.initCCP(ccp.current, {
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
            //initiateChatSession(connect)
        }
    }
    const checkCCPInitialized = () => {
        let i = 0;
        const PollInterval = setInterval(() => {
            console.log(`Presolved::CCP::Polling to get the login status ${i}`);
            if (connect.agent.initialized) {
                clearInterval(PollInterval)
                listenIncomingActivities()
                console.log(`Presolved::CCP::Login success stoppping the poll`);
                getAgentInfoFromConnect().then((agentInfo) => {
                    setState({ ...state, isLoaded: true })
                    // dispatch(updateUser({ ...agentInfo }))
                    // dispatch(changeAgentAvailibility(agentInfo.status))
                    // dispatch(updateSettings({ ccpInitiated: true }))
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
                setState({ ...state, agent: agent })
                let agentData = agent._getData()
                let currentState = agent.getStatus()
                console.log(`Presolved::CCP::completed loading the Agent information`);
                resolve({ info: agentData.configuration, status: currentState })
            });
        })
    }
    const listenIncomingActivities = () => {
        connect.contact(function (contact) {
            let persistContact = contact
            setState({ ...state, contact: persistContact })


            contact.onConnecting(function (ctx) {
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
                console.log({ contactAttributes });
                // dispatch(updateSettings({ contactDuration: contactAttributes.contactDuration }))


            });

            contact.onAccepted(function (ctx) {
                console.log("Presolved::connect::contact::onAccepted::");
                let contactAttributes = ctx._getData()
                /* delete contactAttributes.connections
                delete contactAttributes.contactFeatures
                delete contactAttributes.queue */
                const userProfile = getRandomObjectFromArray()
                /* let createChannel = {
                    notes: "New call picked by " + user?.attributes?.email || "",
                    assignTo: " ",
                    contactID: contactAttributes.contactId,
                    channelType: contactAttributes.type,
                    contactAttributes: { ...contactAttributes, userProfile }
                } */
                let activeCall = {
                    isActive: true, ...contactAttributes, userProfile, contact: contact, channelType: contactAttributes.type
                }
                // dispatch(updateCalls(activeCall))
                setState({ ...state, agent: state.agent, activeCall, contact: persistContact, muteCall: muteCall, endCall: endCall })
                if (contactAttributes.type == 'chat') {
                    setShowChat(true)
                }

            });

            contact.onEnded(function (ctx) {
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
                var contactData = contact._getData()
                let settings = {
                    isActive: false,
                    eventName: "onEnded",
                    activeTask: null,
                    isConnected: false
                }
                // dispatch(updateSettings(settings))
                setState({ ...state, activeCall: null, channelType: null, contact: null })
                if (contactAttributes.type == 'chat') {
                    setShowChat(false)
                }
            });

            contact.onConnected(function (ctx) {
                console.log("Presolved::connect::contact::onConnected::",);

            });
            contact.onMissed(function (ctx) {
                console.log("Presolved::connect::contact::onMissed::", ctx);
            })
        });

    }
    const acceptCall = () => {

        if (state.contact) {
            state.contact.accept({
                success: function () {
                    setShowPopUp(false)
                    console.log("Accepted contact via Streams");
                },
                failure: function () {
                    console.log("Failed to accept contact via Streams");
                }
            })

        }
    }
    const endCall = () => {
        //if (state.contact) {
        /*  var initialConnection = state.contact.getInitialConnection();
         console.log({ initialConnection });
         if (initialConnection) {
             initialConnection.destroy();
             state.contact.clear();
         } */
        console.log({ contact: state.contact });
        state.contact.getAgentConnection().destroy({
            success: function () {
                console.log("Disconnected contact via Streams");
            },
            failure: function () {
                console.log("Failed to disconnect contact via Streams");
            }
        });
        //}

    }
    const muteCall = () => {
        connect.agent(async function (agent) {
            if (agent) {
                agent.mute()
            }
        });
    }
    const holdCall = () => {
        if (state.contact.contactId) {
            var initialConnection = state.contact.getInitialConnection();
            console.log({ initialConnection });
            state.contact.toggleActiveConnections()
        }
    }
    const initiateChatSession = async () => {
        /* connect.ChatSession.setGlobalConfig({           
            region: "us-east-1", // optional, defaults to: "us-west-2"
            //Control switch for enabling/disabling message-receipts (Read/Delivered) for messages
            //message receipts use sendEvent API for sending Read/Delivered events https://docs.aws.amazon.com/connect-participant/latest/APIReference/API_SendEvent.html
            features: {
                messageReceipts: {
                    shouldSendMessageReceipts: false, // by default messageReceipts is enabled
                    throttleTime: 5000 //default throttle time - time to wait before sending Read/Delivered receipt.
                }
            }
        }); */
    }

    return (
        <CustomCCPWidgetContext.Provider value={{ ...value }} >
            <Layout className="app-master">
                <AgentPrimaryHeader />
                <Content className="app-content">
                    <SplitPane className='resizable-pane' split="vertical" minSize={400}>
                        <div ref={ccp} className="ccp"></div>
                        <Pane className='content-main-area'>
                            {state.isLoaded ? children : <PlaceHolder />}
                        </Pane>
                    </SplitPane>
                </Content>
            </Layout>          
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
        </CustomCCPWidgetContext.Provider>
    )

}
export default CustomCCPWidgetProvider



const getRandomObjectFromArray = () => {
    let array = userProfilesMock()
    let customerProfile = array[Math.floor(Math.random() * array.length)];
    return {
        customerProfile,
        recentHistory: recentHistory(),
        customer360: customer360(),
        activeProducts: activeProducts(),
        policyDetails: policyDetails(),

    }
}

// generate mock customer profile data
const MockUserProfile=()=> {
    
    let data = {

        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        country: faker.address.country(),
        dob: faker.date.past(),
    }



    
    return data;
}