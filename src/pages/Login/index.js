import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, Form, Checkbox, Row } from "antd";
import {
  UserOutlined,
  LockTwoTone,
  MobileTwoTone,
  MailTwoTone,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import InputItem from "../../components/InputItem/index";
import SubmitButton from "../../components/SubmitButton/index";
import styles from "./index.module.less";

const { TabPane } = Tabs;
export default function Login() {
  const [autoLogin, setAutoLogin] = useState(false);
  const [form] = Form.useForm();
  const handleFinish = (values) => {};
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <Form form={form} onFinish={handleFinish}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="账号密码登录" key="1">
              <InputItem
                name="username"
                size="large"
                prefix={<UserOutlined style={{ color: "#1890ff" }} />}
                placeholder="用户名"
                rules={[{ required: true, message: "请输入用户名" }]}
              />
              <InputItem
                name="password"
                type="password"
                size="large"
                prefix={<LockTwoTone style={{ color: "#1890ff" }} />}
                placeholder="密码"
                rules={[{ required: true, message: "请输入密码" }]}
              />
            </TabPane>
            <TabPane tab="手机号登录" key="2">
              {" "}
              <InputItem
                placeholder="手机号"
                name="mobile"
                size="large"
                prefix={<MobileTwoTone style={{ color: "#1890ff" }} />}
                rules={[{ required: true, message: "请输入手机号" }]}
              />
              <InputItem
                placeholder="验证码"
                name="captcha"
                size="large"
                prefix={<MailTwoTone style={{ color: "#1890ff" }} />}
                rules={[{ required: true, message: "请输入验证码" }]}
              />
            </TabPane>
          </Tabs>
          <Row justify="space-between">
            <Checkbox
              checked={autoLogin}
              onClick={(e) => {
                setAutoLogin(e.target.checked);
              }}
            >
              自动登录
            </Checkbox>
            <a href="#">忘记密码</a>
          </Row>
          <SubmitButton>登录</SubmitButton>
        </Form>
        <div className={styles.others}>
          其他登陆方式
          <AlipayCircleOutlined className={styles.icon}></AlipayCircleOutlined>
          <TaobaoCircleOutlined className={styles.icon}></TaobaoCircleOutlined>
          <WeiboCircleOutlined className={styles.icon}></WeiboCircleOutlined>
          <Link to="/signup" className={styles.signup}>
            注册账户
          </Link>
        </div>
      </div>
    </div>
  );
}
