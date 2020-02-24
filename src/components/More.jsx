//React
import React from "react";
import { useHistory } from "react-router-dom";

// third party
import { Layout, Typography, Button } from "antd";

// custom
import "../design/More.css";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function More(props) {
  let history = useHistory();

  function handleClick() {
    history.push("/");
  }

  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <div className="container">
          <img alt="example" src={props.location.state.img} />

          <div>
            <Title level={4}>{props.location.state.title}</Title>
          </div>
          <div>
            <Paragraph style={{ width: "90%" }}>
              {props.location.state.content}
            </Paragraph>
          </div>
          <div>
            <Text>{props.location.state.author}</Text>
          </div>

          <Button
            style={{ margin: "1em 0" }}
            type="primary"
            onClick={handleClick}
          >
            Back to
          </Button>
        </div>
      </Content>
    </Layout>
  );
}
