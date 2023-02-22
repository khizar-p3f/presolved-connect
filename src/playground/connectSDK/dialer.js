import { Avatar, Button, Col, Divider, Modal, Row, Space, Typography } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CustomCCPWidgetContext } from './connect'
import popupImage from '../../agentApp/assets/images/animated/phone.gif'
import './dialer.less'
const DialerApp = () => {

    const { agent, contact, CCPInitiated, userLoggedIn, user, } = useContext(CustomCCPWidgetContext)
    const [state, setState] = useState({
        isDialerInitiated: false,
        showPopUp: true,
        contact
    })
    useEffect(() => {
        if (CCPInitiated) {
            setState({ ...state, isDialerInitiated: true })
        }
    }, [CCPInitiated])
    useEffect(() => setState({ ...state, contact }), [contact])

    const accept = () => {

        //connect.contact((contact) => {
        if (state.contact) {
            state.contact.accept()
        }
        //})

    }
    const end = () => {
        if (state.contact) {
            var initialConnection = state.contact.getInitialConnection();
            console.log({ initialConnection });
            if (initialConnection) {
                initialConnection.destroy();
                state.contact.clear();
            }
        }    
    }

    const muteCall = () => {
        connect.agent(async function (agent) {
            if (agent) {
                agent.mute()
            }
        });
        setState({ ...state, showPopUp: true })
    }


    const holdCall=()=>{
        contact.toggleActiveConnections({
            success: function (success) {
                console.log({hold:success});
            },
            failure: function (err) {
                console.log({hold:err});
            }
        })

    }


    return (
        <section>

            <div>DialerApp</div>
            {state.isDialerInitiated &&
                <section>
                    <h1>Initiated</h1>
                    <Space>

                        <Button type='primary' onClick={() => accept()}>Accept</Button>
                        <Button type='primary' danger onClick={() => end()}>Reject</Button>
                        <Button type='primary' onClick={() => muteCall()}>Mute</Button>

                    </Space>
                </section>
            }
            <Modal width={300} className="incoming-alert" open={state.showPopUp} onCancel={() => setState({ ...state, showPopUp: false })} footer={null}>
                <div className='popup-container'>
                    <div className='items'>
                        <div className="poup-image">
                            <Avatar gap={10} style={{ backgroundColor: '#f5f5f5', }} size={200} shape='circle' icon={<img src={popupImage} />} />
                        </div>
                    </div>
                    <Divider />
                    <div className='items'>
                        <Typography.Title level={5} >New Vocie call</Typography.Title>
                        <Typography.Title level={3} >John Doe</Typography.Title>
                    </div>
                    <div className='items'>
                        <Typography.Title level={5} >Phone #</Typography.Title>
                        <Typography.Title level={3} >+1 9715463635</Typography.Title>
                    </div>
                    <Divider />
                    <div className='items'>

                        <Space direction='vertical'>
                            <Button size='large' block type='primary' onClick={() => accept()}>Accept</Button>
                            <Button size='large' block type='primary' danger onClick={() => end()}>Reject</Button>
                            <Button size='large' block type='dashed' onClick={() => setState({ ...state, showPopUp: false })}>Ignore</Button>
                        </Space>
                    </div>
                </div>




            </Modal>
        </section>

    )
}

export default DialerApp