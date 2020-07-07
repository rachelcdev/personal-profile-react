import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Checkbox, Row, Popover, Progress } from "antd";
import {
  LockTwoTone,
  MailTwoTone,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import InputItem from "../../components/InputItem/index";
import SubmitButton from "../../components/SubmitButton/index";
import styles from "./index.module.less";

export default function Signup() {
  const [autoLogin, setAutoLogin] = useState(false);
  const [form] = Form.useForm();
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
  const checkPassword = (_, value) => {
    //第一个argument是什么，是antd里这样写
    const promise = Promise;
    if (!value) {
      return promise.reject("请填写密码");
    }
    if (value.length < 6) {
      return promise.reject("密码需大于6位数");
    }
    if (value && form.getFieldValue("confirm")) {
      //后输入第一遍password重新校验
      form.validateFields("confirm");
    }
    return promise.resolve();
  };
  const renderPasswordProgress = () => {
    const value = form.getFieldValue("password");
    return (
      value &&
      value.length && (
        <div>
          <Progress></Progress>
        </div>
      )
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.singup}>
        <Form form={form} onFinish={handleFinish}>
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
              <div>
                {renderPasswordProgress()}
                <div>输入至少六位密码</div>
              </div>
            }
            placeholder="right"
            visible={true}
            overlayStyle={{ width: "20px" }}
          >
            <InputItem
              name="password"
              //   type="password"
              size="large"
              prefix={<LockTwoTone style={{ color: "#1890ff" }} />}
              placeholder="至少6位密码，区分大小写"
              rules={[
                { validator: checkPassword },
                { required: true, message: "Please input your password!" },
              ]}
            />
          </Popover>
          <InputItem
            name="confirm"
            // type="password"
            size="large"
            prefix={<LockTwoTone style={{ color: "#1890ff" }} />}
            placeholder="确认密码"
            rules={[
              { validator: checkConfirm },
              { required: true, message: "Please confirm your password!" },
            ]}
          />

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
          <SubmitButton>注册</SubmitButton>
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
