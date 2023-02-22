import { DotChartOutlined } from '@ant-design/icons';
import { Col, Divider, Form, Radio, Row, Skeleton, Space, Switch } from 'antd';
import React, { useState } from 'react';

const PlaceHolder = () => {
    const [active, setActive] = useState(true);
    const [block, setBlock] = useState(true);
    const [size, setSize] = useState('default');
    const [buttonShape, setButtonShape] = useState('default');
    const [avatarShape, setAvatarShape] = useState('circle');
    const handleActiveChange = (checked) => {
        setActive(checked);
    };
    const handleBlockChange = (checked) => {
        setBlock(checked);
    };
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };
    const handleShapeButton = (e) => {
        setButtonShape(e.target.value);
    };
    const handleAvatarShape = (e) => {
        setAvatarShape(e.target.value);
    };

    return (
        <>
            <Row gutter={[16, 16]}>
                {Array.from({ length: 3 }).map((_, index) =>
                    <Col span={8} key={index}>
                        <Space>
                            <Skeleton.Image active={active} />
                            <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
                            <Skeleton.Input active={active} size={size} />
                        </Space>
                    </Col>
                )}
            </Row>
            <br />
            <br />
            <Row gutter={[16, 16]}>
                {Array.from({ length: 20 }).map((_, index) =>
                    <Col span={8} key={index}>
                        <Skeleton.Button active={active} size={size} shape={buttonShape} block={block} />
                    </Col>

                )}
            </Row>
            <br />
            <br />
            <Skeleton.Input active={active} size={size} block={block} />
            <br />
            <br />           

        </>
    );
};
export default PlaceHolder;