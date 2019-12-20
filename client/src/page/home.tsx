import React from 'react';
import { inject, observer } from 'mobx-react';
import './home.css'
import {
  Button, Input,
} from 'antd';
import TimeUtil from '@pefish/js-util-time'

@inject('homeStore')
@observer
export default class Home extends React.Component<any, any> {

  async start() {
    if (this.props.homeStore.started) {
      this.props.homeStore.started = false
      return
    }
    if (!this.props.homeStore.pkey || !this.props.homeStore.account) {
      alert(`请输入私钥以及账户名`)
      return
    }
    this.props.homeStore.started = true
    while (this.props.homeStore.started) {
      try {
        await this.props.homeStore.start()
      } catch (err) {
        console.error(err)
        await TimeUtil.sleep(5000)
      }
    }
  }

  render() {
    return (
      <div className="app">
        <div>
          <span style={{
            flex: 1,
            height: 50,
            fontSize: 20,
            color: `red`
          }}>
            pefish出品，微信号：xjpyong
          </span>
        </div>

        <div style={{
          flex: 1,
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          justifyContent: `center`,
        }}>
          <div style={{
            width: 300
          }}>
            <Input placeholder={`私钥`} onChange={(e) => {
              this.props.homeStore.pkey = e.target.value
            }} />
            <Input placeholder={`账户名`} onChange={(e) => {
              this.props.homeStore.account = e.target.value
            }} />
            <Input placeholder={`Action个数`} onChange={(e) => {
              this.props.homeStore.actionCount = e.target.value
            }} />
          </div>
          <div style={{
            display: `flex`,
            flexDirection: `row`,
            marginTop: 20,
            width: 200,
            justifyContent: `center`,
            alignItems: `center`,
          }}>
            <Button type={`primary`} onClick={this.start.bind(this)} style={{
              flex: 1,
            }}>{!this.props.homeStore.started ? `开始` : `停止`}</Button>
            <span style={{
              flex: 1,
            }}>
              {this.props.homeStore.counter}
            </span>
          </div>
          <div style={{
            marginTop: 20,
            width: 800,
            overflowWrap: `break-word`,
          }}>
            <span style={{
              height: 50,
            }}>
              {this.props.homeStore.txid}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
