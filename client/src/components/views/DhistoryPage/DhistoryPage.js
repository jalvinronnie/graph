import React, { useState, useEffect } from "react";
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
} from "antd";
import Axios from "axios";
 
function DhistoryPage(props) {
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(0);
 
  useEffect(() => {
    console.log(props);
    if (props.user.userData) {
      Axios.get(
        "http://localhost:5000/api/withdraw/getBalance/" +
          props.user.userData._id
      ).then((resp) => {
        console.log(resp.data);
        setBalance(resp.data);
      });
    }
  }, [props]);
  function handleSubmit() {
    console.log(props);
    Axios.post("http://localhost:5000/api/withdraw/withdraw", {
      amount,
      email,
      id: props.user.userData._id,
    }).then((response) => {
      console.log(response.data);
    });
  }
  return (
    <div style={{ width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Withdraw Money</h1>
      </div>
      <br />
 
      <table>
        <thead>
          <tr>
            <th>Balance : {balance}</th>
          </tr>
        </thead>
      </table>
      <br />
      <br />
 
      <form action="/withdraw" method="post">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item label="Email">
            <Input
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Enter your email"
              type="email"
            />
          </Form.Item>
          <Form.Item label="Amount">
            <InputNumber
              value={amount}
              onChange={(event) => setAmount(event)}
              max={balance}
              min={0}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={handleSubmit}
              className="login-form-button"
              style={{ minWidth: "20%" }}
            >
              Withdraw
            </Button>
          </Form.Item>
        </Form>
      </form>
    </div>
  );
}
 
export default DhistoryPage;