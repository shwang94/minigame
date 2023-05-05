import { useState } from "react";
import './luckydice.css'
import diceImage1 from '../../assets/images/dices/1.jpg';
import diceImage2 from '../../assets/images/dices/2.jpg';
import diceImage3 from '../../assets/images/dices/3.jpg';
import diceImage4 from '../../assets/images/dices/4.jpg';
import diceImage5 from '../../assets/images/dices/5.jpg';
import diceImage6 from '../../assets/images/dices/6.jpg';

const LuckyDice = () => {
    const [diceValue, setDiceValue] = useState(1);
    const [rolling, setRolling] = useState(false);
    const [rotationDirection, setRotationDirection] = useState("clockwise");

    const dices = [diceImage1,diceImage2,diceImage3,diceImage4,diceImage5,diceImage6];

    const handleClick = () => {
        setRolling(true);
        setRotationDirection(Math.random() < 0.5 ? "clockwise" : "counter-clockwise");
        setTimeout(() => {
            const randomValue = Math.floor(Math.random() * 6) + 1;
            setDiceValue(randomValue);
            setRolling(false);
          }, 1000); // 1 second delay to simulate the rolling effect

    };
  
    return (
        <div className="dice-container">
        <img
          src={dices[diceValue-1]}
          alt={`Dice with ${diceValue} points`}
          className={`dice-image ${rolling ? "rolling" : ""} ${rotationDirection}`}
        />
        <button className="roll-button" onClick={handleClick} disabled={rolling}>
          Roll the dice
        </button>
      </div>
    );
  };
  
  export default LuckyDice;