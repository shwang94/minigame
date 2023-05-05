import React from 'react';
import { Layout, Typography } from 'antd';
import { designColor } from '../design';
const { Footer } = Layout;

function TheFooter() {
  return (
    <Footer style={{ backgroundColor: designColor.graylight.backgroundColor, textAlign: 'center', }}>
      <Typography.Text>This is a mini project made by Thu Vong</Typography.Text>
      <br />
      <Typography.Text type="secondary">
        © {new Date().getFullYear()} Thu Vong - React App
      </Typography.Text>
    </Footer>
  );
}

export default TheFooter;
