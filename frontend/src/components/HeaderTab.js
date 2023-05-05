import { useState } from 'react';
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LoginSignUp from '../pages/LoginSignUp';
import LuckyDiceGame from '../pages/LuckyDiceGame';
import Histories from '../pages/Histories';

import { Avatar } from 'antd';
import { designColor } from '../design';

export default function HeaderTab() {
  const [value, setValue] = useState('1');
  const { user } = useSelector(
    (reduxData) => reduxData.userReducers
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#1F2833' }}>
          {user !== null ? <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label={
              <Avatar icon={<img src={user.avatar} alt='Avatar' />} /> 
            } value="1" > </Tab>
            
             
            <Tab label="Lucky game" value="2" style={designColor.greenlight}/>
            <Tab label="Lịch Sử Chơi" value="3" style={designColor.greenlight}/>
          </TabList > :
            <TabList onChange={handleChange} aria-label="lab API tabs example" centered>  <Tab label="Đăng nhập" value="1" style={designColor.greenlight}>Đăng nhập</Tab></TabList>
          }
        </Box>
        <TabPanel value="1"> <LoginSignUp /> </TabPanel>
        <TabPanel value="2"><LuckyDiceGame /></TabPanel>
        <TabPanel value="3"><Histories/></TabPanel>
      </TabContext>
    </Box>
  );
}