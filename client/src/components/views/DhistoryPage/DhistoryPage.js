import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Icon,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
 
function DhistoryPage() {
    return (
 
            <div style={{ width: '80%', margin: '3rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1>Order History</h1>
                </div>
                <br />
 
                <table>
                    <thead>
                        <tr>
                            <th>Purchaser (email)</th>
 
                            <th>Price</th>
                        </tr>
 
 
                    </thead>
 
 
                </table>
                <br/>
                <br/>
 
                <form action="/withdraw" method="post"> 
 
                <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
 
                >
                    <Form.Item label="Input">
          <Input id="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter your email"
                  type="email" />
          </Form.Item>
          <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '20%' }}>
                   Withdraw
                        </Button></Form.Item>
      </Form>
      </form>
                </div>
 
        )
 
}
 
export default DhistoryPage