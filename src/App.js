import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import Router from "./router/index";

import { Menu } from "antd";
import styles from "./App.module.less";
function App() {
  return (
    <BrowserRouter>
      {/* <Menu theme="dark" className={styles.menu}>
        <Menu.Item>
          <NavLink to="/">home</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/login">login</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/signup">signup</NavLink>
        </Menu.Item>
      </Menu> */}
      <Router></Router>
    </BrowserRouter>
  );
}

export default App;
