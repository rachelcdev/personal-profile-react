import React from "react";
import { Form, Button } from "antd";
import styles from "./index.module.less";
export default function SubmitButton(props) {
  const { children } = props;
  return (
    <Form.Item>
      <Button
        className={styles.button}
        size="large"
        type="primary"
        htmlType="submit"
      >
        {children}
      </Button>
    </Form.Item>
  );
}
