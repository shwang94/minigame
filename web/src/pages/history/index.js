import React, { useState, useEffect } from 'react';
//import { useTable } from 'react-table';
//import { GetDiceHistories } from '../../services/DiceService';


const HistoryPage = () => {
//  const [diceHistories, setDiceHistories] = useState([]);
  

  useEffect(() => {
    const loadData = async () => {
      try {
        
      } catch (error) {
        console.error('Error fetching dice history:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div>History</div>
  );
};

export default HistoryPage;
