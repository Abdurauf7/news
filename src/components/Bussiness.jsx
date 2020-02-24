// react
import React, { Component } from "react";

//third part
import { Card, Col, Row, Spin, notification, Icon, BackTop } from "antd";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

// custom

const { Meta } = Card;

export default class Bussiness extends Component {
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
    if (this.state.article.length >= 70) {
      this.setState({ hasMore: false });
      return;
    }
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=284367f5ba734899b242057a81dac8e0"
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
        "https://newsapi.org/v2/top-headlines?pageSize=100&country=gb&category=business&apiKey=284367f5ba734899b242057a81dac8e0"
      )
      .then(res =>
        this.setState({ article: this.state.article.concat(res.data.articles) })
      );
  };

  render() {
    console.log(this.props);
    const { article } = this.state;
    return (
      <div style={{ background: "#ECECEC", padding: "20px" }}>
        <Row gutter={5}>
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
                  title={a.author}
                  bordered={false}
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
                      more
                    </Link>
                  }
                  cover={<img alt="example" src={a.urlToImage} />}
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
