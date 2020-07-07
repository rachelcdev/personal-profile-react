import React, { useState, useEffect } from "react";
import { Input, Form, Button, Row, Col } from "antd";
import styles from "./index.module.less";
export default function InputItem(props) {
  const { name, rules, ...rest } = props;
  console.log(rules);
  const [timing, setTiming] = useState(false); //是否在倒计时
  const [count, setCount] = useState(60); //倒计时秒数
  const handleClickCaptcha = () => {
    setTiming(true);
  };

  useEffect(() => {
    let interval = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount((prevCount) => {
          if (prevCount <= 1) {
            setTiming(false); //结束倒计时
            clearInterval(interval);
            // return props.countDown || 60;
            return 60;
          }
          return prevCount - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timing]);
  if (name === "captcha") {
    return (
      <Form.Item name={name} rules={rules}>
        <Row gutter={8}>
          <Col span={16}>
            <Input {...rest} />
          </Col>
          <Col span={8}>
            <Button
              className={styles.getCaptcha}
              disabled={timing}
              onClick={handleClickCaptcha}
              size="large"
            >
              {timing ? `${count}s` : "获取验证码"}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    );
  }
  return (
    <Form.Item name={name} rules={rules}>
      {" "}
      <Input {...rest} />
    </Form.Item>
  );
}
