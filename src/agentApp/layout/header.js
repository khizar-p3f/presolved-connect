import React, { useEffect, useState } from 'react'
import { Avatar, Layout, Menu, Space, Typography, theme, Button, Modal } from 'antd';
import { UserOutlined, LogoutOutlined, BellOutlined, AimOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';

import logo from '../../adminApp/assets/images/logo.png'
import recordingImg from '../assets/images/rec.gif'
import { Link, navigate } from '@gatsbyjs/reach-router';
import { Auth, Storage } from 'aws-amplify';
import moment from 'moment-timezone';
const { Header } = Layout

const AgentPrimaryHeader = () => {
    const items = [{
        key: 'home',
        label: <Link to='/'><Space><HomeOutlined /> Dashboard</Space></Link>,
    }, {
        key: 'wisdom',
        label: <Link to='/'><Space><BookOutlined /> Wisdom</Space></Link>,
    },
    {
        key: 'recordings',
        label: <Link to='/recordings'><Space><AimOutlined /> Recordings</Space></Link>,
    }
]
    const { useToken } = theme
    const { token } = useToken()
    const [user, setUser] = useState(window.config.user)
    const [recording, setRecording] = useState(false)
    const [MR, setMR] = useState(null);

    useEffect(() => {
        setUser(window.config.user);
    }, [window.config.user])

    const Logout = () => {
        Modal.confirm({
            title: 'Are you sure you want to logout?',
            content: 'You will be logged out of the system.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                Auth.signOut().then((data) => {
                    window.config.user = new Map();
                    navigate("/login")
                })
            }
        });
    }

    const recordScreen = async () => {
        return await navigator.mediaDevices.getDisplayMedia({
            audio: false,
            video: { mediaSource: "screen" }
        });
    }
    const createRecorder = (stream, mimeType) => {
        // the stream data is stored in this array
        let recordedChunks = [];
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = function (e) {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        }
        mediaRecorder.onstop = function () {
            saveFile(recordedChunks);
            recordedChunks = [];
        }
        mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
        return mediaRecorder;
    }
    const startRecording = async () => {
        let stream = await recordScreen();
        let mimeType = 'video/webm';
        let mediaRecorder = createRecorder(stream, mimeType);
        setMR(mediaRecorder)
        setRecording(true)
    }
    const stopRecording = () => {
        MR.stop();
        setRecording(false)
    }
    const saveFile = (recordedChunks) => {
        const blob = new Blob(recordedChunks, {
            type: 'video/webm'
        });
        window.open(URL.createObjectURL(blob));
        saveFileToS3(recordedChunks)
    }

    //save file to amplify storage s3
    const saveFileToS3 = (recordedChunks) => {
        const blob = new Blob(recordedChunks, {
            type: 'video/webm'
        });
        const file = new File([blob], 'test.webm', { type: 'video/webm' });
        const fileName = `recordings/${moment().format('x')}.webm`
        Storage.put(fileName, file, {
            contentType: 'video/webm',
            level: 'public',
        }).then(result => console.log({saveFileToS3:result}))
        .catch(err => console.log({saveFileToS3:err}));

    }

    const getAllfilesFromS3 = async () => {
        const list = await Storage.list('recordings', { level: 'public' })
        console.log({list})
    }

    return (
        <Header className="agent-primary" style={{ background: token.colorBgBase }}>
            <div className="logo-container" ><img src={logo} height={54} /></div>
            <div className="menu-container">
                <Menu mode="horizontal" defaultSelectedKeys={['home']} items={items} />
            </div>
            <div className="user-container">
                <Space size={10}>
                    <Space>
                        {recording ?
                            <Button onClick={() => stopRecording()} type='primary' shape='round'  >
                                <Space align='start'>
                                    <img src={recordingImg} height={20} />
                                    <Typography.Text style={{ color: '#fff' }}>Recording</Typography.Text>
                                </Space>
                            </Button>
                            :
                            <Button onClick={() => startRecording()} shape='round' icon={<AimOutlined />} type="primary"  >Record</Button>
                        }
                        <Button shape='circle' icon={<BellOutlined />} type="default" />
                    </Space>
                    <Space size={5}>
                        <Button onClick={() => Logout()} shape='circle' icon={<LogoutOutlined />} type="primary" danger />
                    </Space>
                    <Space size={5}>
                        <Avatar style={{ background: token.colorPrimaryBgHover }} icon={<UserOutlined />} />
                        <Typography.Text strong>{user && user.attributes && user.attributes.email}</Typography.Text>
                    </Space>

                </Space>
            </div>
        </Header>
    )
}

export default AgentPrimaryHeader