// react
import React, { Component } from "react";

// third party
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";

// custom
import "../design/Navbar.css";

const { Header } = Layout;

export default class Navbar extends Component {
  render() {
    return (
      <Layout style={{ background: "transparent" }}>
        <Header style={{ background: "transparent" }}>
          <Menu mode="horizontal">
            <Menu.Item className="item">
              <Link to="/">General</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/bussiness">Bussiness</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/technology">Technology</Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/sports">Sports</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}
