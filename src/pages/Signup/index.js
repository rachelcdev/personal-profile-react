import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Checkbox,
  Row,
  Popover,
  Progress,
  Tabs,
  Select,
  Col,
} from "antd";
import {
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import InputItem from "../../components/InputItem/index";
import SubmitButton from "../../components/SubmitButton/index";
import styles from "./index.module.less";

const { TabPane } = Tabs;
const { Option } = Select;
const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.normal}>强度：中</div>,
  poor: <div className={styles.exception}>强度：弱</div>,
};
const passwordProgressMap = {
  ok: "success",
  pass: "normal",
  poor: "exception",
};
export default function Signup() {
  const [autoLogin, setAutoLogin] = useState(false);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [popover, setPopover] = useState(false);
  const [prefix, setPrefix] = useState("86");
  const handleFinish = (values) => {
    console.log(values);
  };
  const checkConfirm = (_, value) => {
    //第一个argument是什么，是antd里这样写
    const promise = Promise;
    if (!value) {
      return promise.reject("请确认密码");
    }
    if (value && value !== form.getFieldValue("password")) {
      return promise.reject("两次输入密码不匹配");
    }
    return promise.resolve();
  };
  const getPasswordStatus = () => {
    const value = form.getFieldValue("password");
    if (value && value.length > 9) {
      return "ok";
    }
    if (value && value.length > 5) {
      return "pass";
    }
    return "poor";
  };
  const checkPassword = (_, value) => {
    //第一个argument是什么，是antd里这样写
    const promise = Promise;
    if (!value) {
      setVisible(!visible);
      return promise.reject("请填写密码");
    }
    if (!visible) {
      //!!visible and !visivble
      setVisible(!visible);
    }
    //触发popover改变
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject("密码需大于6位数");
    }
    if (value && form.getFieldValue("confirm")) {
      //后输入第一遍password重新校验
      form.validateFields(["confirm"]);
    }
    return promise.resolve();
  };
  const renderPasswordProgress = () => {
    const value = form.getFieldValue("password");
    const passwordStatus = getPasswordStatus();
    return (
      value &&
      value.length && (
        <div className={styles[`progress-${passwordStatus}`]}>
          <Progress
            status={passwordProgressMap[passwordStatus]}
            strokeWidth={6}
            percent={value.length * 10 > 100 ? 100 : value.length * 10}
            showInfo={false}
          ></Progress>
        </div>
      )
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.singup}>
        <Form form={form} onFinish={handleFinish}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="邮箱注册" key="1">
              <InputItem
                name="mail"
                size="large"
                type="email"
                prefix={<MailTwoTone style={{ color: "#1890ff" }} />}
                placeholder="邮箱"
                rules={[
                  { required: true, message: "请输入邮箱" },
                  { type: "email", message: "请填写正确的邮箱格式" },
                ]}
              />
              <Popover
                content={
                  visible && (
                    <div>
                      {passwordStatusMap[getPasswordStatus()]}
                      {renderPasswordProgress()}
                      <div>输入至少六位密码</div>
                    </div>
                  )
                }
                placement="right"
                visible={visible}
                overlayStyle={{ width: 240 }}
              >
                <InputItem
                  name="password"
                  type="password"
                  size="large"
                  prefix={<LockTwoTone style={{ color: "#1890ff" }} />}
                  placeholder="至少6位密码，区分大小写"
                  rules={[{ validator: checkPassword }]}
                />
              </Popover>
              <InputItem
                name="confirm"
                type="password"
                size="large"
                prefix={<LockTwoTone style={{ color: "#1890ff" }} />}
                placeholder="确认密码"
                rules={[{ validator: checkConfirm }]}
              />
            </TabPane>
            <TabPane tab="手机号注册" key="2">
              <Row>
                <Col span={6}>
                  <Select
                    size="large"
                    value={prefix}
                    onChange={(value) => {
                      setPrefix(value);
                    }}
                    style={{ width: "100%" }}
                  >
                    <Option value="86">+86</Option>
                    <Option value="1">+1</Option>
                  </Select>
                </Col>
                <Col span={18}>
                  <InputItem
                    placeholder="手机号"
                    name="mobile"
                    size="large"
                    prefix={<MobileTwoTone style={{ color: "#1890ff" }} />}
                    rules={[
                      { required: true, message: "请输入手机号" },
                      { pattern: /^\d{11}$/, message: "手机号格式错误" },
                    ]}
                  />
                </Col>
              </Row>
              <InputItem
                placeholder="验证码"
                name="captcha"
                size="large"
                prefix={<MailTwoTone style={{ color: "#1890ff" }} />}
                rules={[{ required: true, message: "请输入验证码" }]}
              />
            </TabPane>
          </Tabs>
          <Row justify="space-between" align="middle">
            <Col span={8}>
              <SubmitButton>注册</SubmitButton>
            </Col>
            <Col span={16}>
              <Link to="/login" className={styles.login}>
                已有账户
              </Link>
            </Col>
          </Row>
        </Form>
        <div className={styles.others}>
          第三方注册
          <AlipayCircleOutlined className={styles.icon}></AlipayCircleOutlined>
          <TaobaoCircleOutlined className={styles.icon}></TaobaoCircleOutlined>
          <WeiboCircleOutlined className={styles.icon}></WeiboCircleOutlined>
        </div>
      </div>
    </div>
  );
}
