import React, { Component } from 'react';
import { Upload, Button, Icon } from 'antd';
import './style.less';

export default class extends Component {
  state = {
    tip: "hello world"
  }

  componentWillMount() {

  }

  handleOk = () => {
    console.log("hello, world", this.state)
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="app-container__title">测试</h1>
        <div className="app-container__btn">
          <Upload>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>

          <Button type="primary" onClick={this.handleOk} style={{margin: '30px'}}> Try it ~ </Button>

        </div>

      </div>
    );
  }
}
