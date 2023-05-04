import React from 'react';
import './App.css';
import HeaderTab from './components/HeaderTab';
import TheFooter from './components/TheFooter';


function App() {
  return (

    <div className="App">
      <HeaderTab/>
      {/* <Routes>

        <Route path='/' element={<LoginSignUp />} />
        <Route path='/game' element={<LuckyDiceGame />} />
        </Routes> */}
        <TheFooter/>
    </div>

  );
}

export default App;