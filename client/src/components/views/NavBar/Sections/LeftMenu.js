import React from 'react';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';

function LeftMenu(props) {
  const user = useSelector(state => state.user);

  if(user.userData && user.userData.role === 'admin') {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="home">
          <a href="/">Home</a>
        </Menu.Item>
        <Menu.Item key="admin">
          <a href="/admin">Admin</a>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <Menu mode={props.mode}>
      <Menu.Item key="home">
          <a href="/">Home</a>
        </Menu.Item>
    </Menu>
  )
}

export default LeftMenu