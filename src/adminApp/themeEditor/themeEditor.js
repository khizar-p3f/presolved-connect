import React, { useState, useEffect } from 'react';
import { Breadcrumb, Button, Card, Col, Layout, ConfigProvider, Form, Row, Typography, Switch, Slider, Input, Select, theme, Space, Alert, Menu, Tabs } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});

const ThemeEditor = () => {

    const [form] = Form.useForm();
    const [defaultData, setDefaultData] = useState({
        token: {
            algorithm: "theme.defaultAlgorithm",
            colorPrimary: "#0c3651",
            colorSuccess: "#52c41a",
            colorWarning: "#faad14",
            colorError: "#ff4d4f",
            colorInfo: "#1677ff",
            fontSize: 14,
            fontSizeHeading1: 21,
            fontFamily: "Arial",
        },

        header: {
            mode: 'default',
            color: "#0c3651"

        },
        sider: {
            mode: 'default',
            color: "#f3f5f6"

        },
        footer: {
            mode: 'default',
            color: "#f3f5f6"
        },
    })


    const ThemePreview = ({ themeData }) => {

        const algorithm = themeData.token.algorithm === "theme.defaultAlgorithm" ? true : false;

        return (
            <ConfigProvider
                theme={{
                    algorithm: algorithm ? theme.defaultAlgorithm : theme.darkAlgorithm,
                    token: themeData.token
                }}
            >
                <Layout>
                    <Header className="header" style={{ backgroundColor: themeData.header.color }}>
                        <Menu mode="horizontal" items={items1} style={{ backgroundColor: themeData.header.color, color: 'white' }} />
                    </Header>
                    <Layout>
                        <Sider
                            style={{
                                background: themeData.sider.color,
                            }}
                            width={200}
                        >
                            <Menu
                                mode="inline"
                                style={{
                                    background: themeData.sider.color,
                                    height: '100%',
                                    color: 'black'
                                }}
                                items={items2}

                            />
                        </Sider>

                        <Content >
                            <Breadcrumb
                                style={{
                                    margin: '20px 10px',
                                }}
                            >
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>

                            <Content
                                style={{
                                    padding: '24px 24px',
                                    minHeight: 280,
                                }}
                            >
                                <Typography.Title
                                    style={{ marginBottom: '20px' }}
                                >
                                    Heading 
                                </Typography.Title>
                                <Tabs type='card'>
                                    <Tabs.TabPane tab="Tab 1" key="tab1" style={{background:'white', padding:'20px'}} >
                                        <Row>
                                            <Space
                                                direction="vertical"
                                                style={{
                                                    width: '75%',
                                                }}
                                            >

                                                <Row>
                                                    <Space>
                                                        <Button type="primary">Primary Button</Button>
                                                        <Button >Default Button</Button>
                                                    </Space>
                                                </Row>

                                                <Alert
                                                    message="Success Tips"
                                                    description="Detailed description and advice about successful copywriting."
                                                    type="success"
                                                    showIcon
                                                />
                                                <Alert
                                                    message="Informational Notes"
                                                    description="Additional description and information about copywriting."
                                                    type="info"
                                                    showIcon
                                                />
                                                <Alert
                                                    message="Warning"
                                                    description="This is a warning notice about copywriting."
                                                    type="warning"
                                                    showIcon
                                                    closable
                                                />
                                                <Alert
                                                    message="Error"
                                                    description="This is an error message about copywriting."
                                                    type="error"
                                                    showIcon
                                                />
                                            </Space>
                                        </Row>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Tab 2" key="tab2"  >
                                        <Typography>Content of tab2</Typography>
                                    </Tabs.TabPane>
                                </Tabs>
                            </Content>
                        </Content>
                    </Layout>
                    <Footer
                        style={{
                            textAlign: 'center',
                            background: themeData.footer.color
                        }}
                    >
                        Ant Design ©2023 Created by Ant UED
                    </Footer>
                </Layout>
            </ConfigProvider>
        );
    }

    useEffect(() => {

        form.setFieldsValue({
            token: {
                algorithm: "theme.defaultAlgorithm",
                colorPrimary: "#1677ff",
                colorSuccess: "#52c41a",
                colorWarning: "#faad14",
                colorError: "#ff4d4f",
                colorInfo: "#1677ff",
                fontSize: 14,
                fontSizeHeading1: 21,
                fontFamily: "Arial",
            },
            header: {
                mode: 'default',
                color: "#c8d8e4"

            },
            sider: {
                mode: 'default',
                color: "#2b6777"

            },
            footer: {
                mode: 'default',
                color: "#52ab98"
            },
        });
    }, []);

    const handleSwitchOnChange = (checked) => {

        checked ? setDefaultData({ ...defaultData, token: { ...defaultData.token, algorithm: "theme.defaultAlgorithm" } }) : setDefaultData({ ...defaultData, token: { ...defaultData.token, algorithm: "theme.darkAlgorithm" } })
        form.setFieldsValue({
            token: {
                algorithm: checked ? "theme.defaultAlgorithm" : "theme.darkAlgorithm"
            }
        })
    }

    const handleHeaderSwitchOnChange = (checked) => {
        checked ? setDefaultData({ ...defaultData, header: { ...defaultData.header, mode: 'default' } }) : setDefaultData({ ...defaultData, header: { ...defaultData.header, mode: 'custom' } })
        form.setFieldsValue({
            header: {
                mode: checked ? "default" : "custom",
            }
        })
    }

    const handleSiderSwitchOnChange = (checked) => {
        checked ? setDefaultData({ ...defaultData, sider: { ...defaultData.sider, mode: 'default' } }) : setDefaultData({ ...defaultData, sider: { ...defaultData.sider, mode: 'custom' } })
        form.setFieldsValue({
            sider: {
                mode: checked ? "default" : "custom",
            }
        })
    }

    const handleFooterSwitchOnChange = (checked) => {
        checked ? setDefaultData({ ...defaultData, footer: { ...defaultData.footer, mode: 'default' } }) : setDefaultData({ ...defaultData, footer: { ...defaultData.footer, mode: 'custom' } })
        form.setFieldsValue({
            footer: {
                mode: checked ? "default" : "custom",
            },
        })
    }

    const handleChangeFontFamily = (values) => {
        setDefaultData({
            ...defaultData,
            token: {
                ...defaultData.token,
                fontFamily: values,
            }
        })
    }

    const handleChangeDefaultFont = (newValue) => {
        setDefaultData({
            ...defaultData,
            token: {
                ...defaultData.token,
                fontSize: newValue
            }
        })
    };

    const handleChangeHeadingFont = (newValue) => {
        setDefaultData({
            ...defaultData,
            token: {
                ...defaultData.token,
                fontSizeHeading1: newValue
            }
        })
    };


    const onFinish = (values) => {
        console.log('val: ', values);
    }


    return (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
            <Typography.Title level={3} style={{ padding: '20px 10px 10px 20px' }}> Theme Editor</Typography.Title>
            <Row >
                <Col style={{ width: '30%', height: '100%' }}>
                    <Card >
                        <Typography.Title level={5} style={{ marginBottom: '20px' }}>THEME OPTIONS</Typography.Title>
                        <Form
                            form={form}
                            onFinish={onFinish}
                            name="theme"
                            labelAlign='left'
                            labelCol={{
                                span: 15,
                                offset: 0
                            }}
                            wrapperCol={{
                                span: 20,
                            }}
                        >
                            <Typography.Title level={5} style={{ marginBottom: '20px' }}>LOGO</Typography.Title>
                            <Form.Item name="logoImage" label="Logo Image URL" style={{ marginRight: '20px' }} labelCol={{
                                span: 17,
                                offset: 0
                            }}>
                                <Input
                                    type="url"
                                    name="url"
                                    id="url"
                                    placeholder="https://example.com"
                                    pattern="https://.*"
                                    style={{ width: '120px' }}
                                />
                            </Form.Item>
                            <Typography.Title level={5} style={{ marginBottom: '20px' }}>MODE</Typography.Title>
                            <Form.Item name={["token", "algorithm"]} label="Light/Dark" style={{ alignItems: 'center' }} valuePropName={defaultData.token.algorithm === "theme.defaultAlgorithm" ? 'checked' : 'unchecked'} >
                                <Switch defaultChecked='true' checkedChildren="Light" unCheckedChildren="Dark" onChange={handleSwitchOnChange} />
                            </Form.Item>
                            <Typography.Title level={5} style={{ marginBottom: '20px' }}>COLOR OPTIONS</Typography.Title>
                            <Form.Item name={["token", "colorPrimary"]} label="Brand Color" >
                                <Input.Group compact >
                                    <Input
                                        style={{
                                            width: '70%',
                                            cursor: 'default'
                                        }}
                                        value={defaultData.token.colorPrimary}
                                        readOnly
                                    />
                                    <Input
                                        style={{
                                            width: '30%',
                                            padding: 0,
                                            cursor: 'pointer',
                                        }}
                                        value={defaultData.token.colorPrimary}
                                        readOnly
                                        type="color"
                                        id="colorpicker"
                                        onChange={(e) => {
                                            setDefaultData({
                                                ...defaultData,
                                                token: {
                                                    ...defaultData.token,
                                                    colorPrimary: e.target.value
                                                }
                                            })
                                            form.setFieldsValue({
                                                token: {
                                                    colorPrimary: e.target.value,
                                                }
                                            });
                                        }}

                                    />
                                </Input.Group>
                            </Form.Item>
                            <Form.Item name={["token", "colorSuccess"]} label="Success Color"  >
                                <Input.Group compact >
                                    <Input
                                        style={{
                                            width: '70%',
                                        }}
                                        value={defaultData.token.colorSuccess}
                                        readOnly
                                    />
                                    <Input
                                        style={{
                                            width: '30%',
                                            padding: 0,
                                            cursor: 'pointer',
                                        }}
                                        value={defaultData.token.colorSuccess}
                                        readOnly
                                        type="color"
                                        id="colorpicker"
                                        onChange={(e) => {
                                            setDefaultData({
                                                ...defaultData,
                                                token: {
                                                    ...defaultData.token,
                                                    colorSuccess: e.target.value
                                                }
                                            })
                                            form.setFieldsValue({
                                                token: {
                                                    colorSuccess: e.target.value,
                                                }
                                            });
                                        }}

                                    />
                                </Input.Group>
                            </Form.Item>
                            <Form.Item name={["token", "colorWarning"]} label="Warning Color">
                                <Input.Group compact >
                                    <Input
                                        style={{
                                            width: '70%',
                                        }}
                                        value={defaultData.token.colorWarning}
                                        readOnly
                                    />
                                    <Input
                                        style={{
                                            width: '30%',
                                            padding: 0,
                                            cursor: 'pointer',
                                        }}
                                        value={defaultData.token.colorWarning}
                                        readOnly
                                        type="color"
                                        id="colorpicker"
                                        onChange={(e) => {
                                            setDefaultData({
                                                ...defaultData,
                                                token: {
                                                    ...defaultData.token,
                                                    colorWarning: e.target.value
                                                }
                                            })
                                            form.setFieldsValue({
                                                token: {
                                                    colorWarning: e.target.value,
                                                }
                                            });
                                        }}

                                    />
                                </Input.Group>
                            </Form.Item>
                            <Form.Item name={["token", "colorError"]} label="Error Color">
                                <Input.Group compact >
                                    <Input
                                        style={{
                                            width: '70%',
                                        }}
                                        value={defaultData.token.colorError}
                                        readOnly
                                    />
                                    <Input
                                        style={{
                                            width: '30%',
                                            padding: 0,
                                            cursor: 'pointer',
                                        }}
                                        value={defaultData.token.colorError}
                                        readOnly
                                        type="color"
                                        id="colorpicker"
                                        onChange={(e) => {
                                            setDefaultData({
                                                ...defaultData,
                                                token: {
                                                    ...defaultData.token,
                                                    colorError: e.target.value
                                                }
                                            })
                                            form.setFieldsValue({
                                                token: {
                                                    colorError: e.target.value,
                                                }
                                            });
                                        }}

                                    />
                                </Input.Group>
                            </Form.Item>
                            <Form.Item name={["token", "colorInfo"]} label="Info Color">
                                <Input.Group compact >
                                    <Input
                                        style={{
                                            width: '70%',
                                        }}
                                        value={defaultData.token.colorInfo}
                                        readOnly
                                    />
                                    <Input
                                        style={{
                                            width: '30%',
                                            padding: 0,
                                            cursor: 'pointer',
                                        }}
                                        value={defaultData.token.colorInfo}
                                        readOnly
                                        type="color"
                                        id="colorpicker"
                                        onChange={(e) => {
                                            setDefaultData({
                                                ...defaultData,
                                                token: {
                                                    ...defaultData.token,
                                                    colorInfo: e.target.value
                                                }
                                            })
                                            form.setFieldsValue({
                                                token: {
                                                    colorInfo: e.target.value,
                                                }
                                            });
                                        }}

                                    />
                                </Input.Group>
                            </Form.Item>
                            <Typography.Title level={5} style={{ marginBottom: '20px' }}>FONT OPTIONS</Typography.Title>
                            <Form.Item name={["token", "fontFamily"]} label="Font Family">
                                <Select
                                    style={{
                                        width: 120,
                                    }}
                                    onChange={handleChangeFontFamily}

                                    options={[
                                        {
                                            value: '-apple-system',
                                            label: 'Apple-system',
                                        },
                                        {
                                            value: 'BlinkMacSystemFont',
                                            label: 'BlinkMacSystemFont',
                                        },
                                        {
                                            value: 'Segoe UI',
                                            label: 'Segoe UI',
                                        },
                                        {
                                            value: 'Helvetica Neue',
                                            label: 'Helvetica Neue',
                                        },
                                        {
                                            value: 'Arial',
                                            label: 'Arial',
                                        },
                                        {
                                            value: 'Noto Sans',
                                            label: 'Noto Sans',
                                        },
                                        {
                                            value: 'sans-serif',
                                            label: 'sans-serif',
                                        },
                                        {
                                            value: 'Apple Color Emoji',
                                            label: 'Apple Color Emoji',
                                        },
                                        {
                                            value: 'Segoe UI Emoji',
                                            label: 'Segoe UI Emoji',
                                        },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item name={["token", "fontSize"]} label="Default Font Size">
                                <Slider
                                    min={14}
                                    max={20}
                                    onChange={handleChangeDefaultFont}
                                    value={defaultData.token.fontSize}
                                />
                            </Form.Item>
                            <Form.Item name={["token", "fontSizeHeading1"]} label="Heading Font Size">
                                <Slider
                                    min={21}
                                    max={45}
                                    onChange={handleChangeHeadingFont}
                                    value={defaultData.token.fontSizeHeading1}
                                />
                            </Form.Item>

                            <Typography.Title level={5} style={{ marginBottom: '20px' }}>HEADER</Typography.Title>
                            <Form.Item name={["header", "mode"]} label="Default/Custom" style={{ alignItems: 'center' }} valuePropName={defaultData.header.mode === 'default' ? 'checked' : 'unchecked'} >
                                <Switch defaultChecked='true' checkedChildren="Default" unCheckedChildren="Custom" onChange={handleHeaderSwitchOnChange} />
                            </Form.Item>
                            {
                                (defaultData.header.mode === 'custom') &&
                                <Form.Item name={["header", "color"]} label="Header color" >
                                    <Input.Group compact >
                                        <Input
                                            style={{
                                                width: '70%',
                                                cursor: 'default'
                                            }}
                                            value={defaultData.header.color}
                                            readOnly
                                        />
                                        <Input
                                            style={{
                                                width: '30%',
                                                padding: 0,
                                                cursor: 'pointer',
                                            }}
                                            value={defaultData.header.color}
                                            readOnly
                                            type="color"
                                            id="colorpicker"
                                            onChange={(e) => {
                                                setDefaultData({
                                                    ...defaultData,
                                                    header: {
                                                        ...defaultData.header,
                                                        color: e.target.value
                                                    }
                                                })
                                                form.setFieldsValue({
                                                    header: {
                                                        color: e.target.value,
                                                    }
                                                });
                                            }}

                                        />
                                    </Input.Group>
                                </Form.Item>
                            }
                            <Typography.Title level={5} style={{ marginBottom: '20px' }}>SIDER</Typography.Title>
                            <Form.Item name={["sider", "mode"]} label="Default/Custom" style={{ alignItems: 'center' }} valuePropName={defaultData.sider.mode === 'default' ? 'checked' : 'unchecked'}>
                                <Switch defaultChecked='true' checkedChildren="Default" unCheckedChildren="Custom" onChange={handleSiderSwitchOnChange} />
                            </Form.Item>
                            {
                                (defaultData.sider.mode === 'custom') &&
                                <Form.Item name={["sider", "color"]} label="Sider color" >
                                    <Input.Group compact >
                                        <Input
                                            style={{
                                                width: '70%',
                                                cursor: 'default'
                                            }}
                                            value={defaultData.sider.color}
                                            readOnly
                                        />
                                        <Input
                                            style={{
                                                width: '30%',
                                                padding: 0,
                                                cursor: 'pointer',
                                            }}
                                            value={defaultData.sider.color}
                                            readOnly
                                            type="color"
                                            id="colorpicker"
                                            onChange={(e) => {
                                                setDefaultData({
                                                    ...defaultData,
                                                    sider: {
                                                        ...defaultData.sider,
                                                        color: e.target.value
                                                    }
                                                })
                                                form.setFieldsValue({
                                                    sider: {
                                                        color: e.target.value,
                                                    }
                                                });
                                            }}

                                        />
                                    </Input.Group>
                                </Form.Item>
                            }
                            <Typography.Title level={5} style={{ marginBottom: '20px' }}>FOOTER</Typography.Title>
                            <Form.Item name={["footer", "mode"]} label="Default/Custom" style={{ alignItems: 'center' }} valuePropName={defaultData.footer.mode === 'default' ? 'checked' : 'unchecked'}>
                                <Switch defaultChecked='true' checkedChildren="Default" unCheckedChildren="Custom" onChange={handleFooterSwitchOnChange} />
                            </Form.Item>
                            {
                                (defaultData.footer.mode === 'custom') &&
                                <Form.Item name={["footer", "color"]} label="Footer color" >
                                    <Input.Group compact >
                                        <Input
                                            style={{
                                                width: '70%',
                                                cursor: 'default'
                                            }}
                                            value={defaultData.footer.color}
                                            readOnly
                                        />
                                        <Input
                                            style={{
                                                width: '30%',
                                                padding: 0,
                                                cursor: 'pointer',
                                            }}
                                            value={defaultData.footer.color}
                                            readOnly
                                            type="color"
                                            id="colorpicker"
                                            onChange={(e) => {
                                                setDefaultData({
                                                    ...defaultData,
                                                    footer: {
                                                        ...defaultData.footer,
                                                        color: e.target.value
                                                    }
                                                })
                                                form.setFieldsValue({
                                                    footer: {
                                                        color: e.target.value,
                                                    }
                                                });
                                            }}

                                        />
                                    </Input.Group>
                                </Form.Item>
                            }

                            <Form.Item
                                style={{ float: 'right', marginTop: '40px' }}
                            >
                                <Button type="primary" htmlType="submit" >Submit</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                {/* -----------------------------------------------------PREVIEW SECTION-------------------------------------------- */}

                <Col style={{ width: '70%', }}>
                    <Card
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            height: '100%'
                        }}>
                        <Typography.Title
                            level={5}
                            style={{ marginBottom: '20px' }}
                        >
                            PREVIEW
                        </Typography.Title>
                        <ThemePreview themeData={defaultData} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ThemeEditor;
