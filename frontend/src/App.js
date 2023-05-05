import React from 'react';
import './App.css';
import HeaderTab from './components/HeaderTab';
import TheFooter from './components/TheFooter';


function App() {
  return (

    <div className="App">
      <HeaderTab/>
     
      <TheFooter className="footer"/>
    </div>

  );
}

export default App;