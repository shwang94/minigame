import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;

function TheFooter() {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <Typography.Text>My Footer</Typography.Text>
      <br />
      <Typography.Text type="secondary">
        © {new Date().getFullYear()} My Company
      </Typography.Text>
    </Footer>
  );
}

export default TheFooter;
