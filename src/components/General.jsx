// react
import React, { Component } from "react";

// third part
import { Card, Col, Row, Spin, notification, Icon, BackTop } from "antd";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

// custom
import "../design/General.css";
import { Link } from "react-router-dom";

const { Meta } = Card;
export default class General extends Component {
  constructor() {
    super();
    this.state = {
      article: [],
      hasMore: true,
      loader: (
        <div className="loading">
          <Spin size="large"></Spin>
        </div>
      )
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?pageSize=100&country=us&apiKey=284367f5ba734899b242057a81dac8e0"
      )
      .then(res => {
        this.setState({ article: res.data.articles });
      });
  }

  fetchMoreData = () => {
    if (this.state.article.length >= 100) {
      this.setState({ hasMore: false });
      this.setState({
        loader: notification.info({
          placement: "topRight",
          message: "Loading is finished",
          duration: 2.5,
          icon: <Icon type="smile" style={{ color: "#108ee9" }} />
        })
      });
      return;
    }
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?pageSize=100&country=us&apiKey=284367f5ba734899b242057a81dac8e0"
      )
      .then(res =>
        this.setState({ article: this.state.article.concat(res.data.articles) })
      );
  };

  render() {
    const { article } = this.state;

    return (
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <Row gutter={2}>
          <InfiniteScroll
            dataLength={this.state.article.length}
            next={this.fetchMoreData}
            hasMore={true}
            loader={this.state.loader}
          >
            {article.map(a => (
              <Col span={6}>
                <BackTop>
                  <div className="back-top">
                    <Icon type="up-circle" theme="filled" />
                  </div>
                </BackTop>
                <Card
                  bordered={false}
                  title={a.author}
                  extra={
                    <Link
                      to={{
                        pathname: "/more/",
                        state: {
                          img: a.urlToImage,
                          title: a.title,
                          content: a.content,
                          author: a.author
                        }
                      }}
                    >
                      More
                    </Link>
                  }
                  cover={<img alt="" src={a.urlToImage} />}
                >
                  <Meta title={a.title} description={a.description} />
                </Card>
              </Col>
            ))}
          </InfiniteScroll>
        </Row>
      </div>
    );
  }
}
