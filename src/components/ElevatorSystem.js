import React, { useState } from "react";
import Elevator from "./Elevator";

const ElevatorSystem = () => {
  const [elevator1Target, setElevator1Target] = useState(null);
  const [elevator2Target, setElevator2Target] = useState(null);
  const [elevator1Position, setElevator1Position] = useState(0);
  const [elevator2Position, setElevator2Position] = useState(0);

  const handleCall = (floor) => {
    const distance1 = Math.abs(elevator1Position - floor);
    const distance2 = Math.abs(elevator2Position - floor);

    if (distance1 <= distance2) {
      setElevator1Target(floor);
    } else {
      setElevator2Target(floor);
    }
  };

  const handleArriveElevator1 = () => {
    setElevator1Target(null);
    setElevator1Position(elevator1Target);
  };

  const handleArriveElevator2 = () => {
    setElevator2Target(null);
    setElevator2Position(elevator2Target);
  };

  return (
    <div>
      <div className="controls">
        <button onClick={() => handleCall(0)}>Call to Floor 0</button>
        <button onClick={() => handleCall(1)}>Call to Floor 1</button>
        <button onClick={() => handleCall(2)}>Call to Floor 2</button>
        <button onClick={() => handleCall(3)}>Call to Floor 3</button>
        <button onClick={() => handleCall(4)}>Call to Floor 4</button>
        <button onClick={() => handleCall(5)}>Call to Floor 5</button>
        <button onClick={() => handleCall(6)}>Call to Floor 6</button>
        <button onClick={() => handleCall(7)}>Call to Floor 7</button>
        <button onClick={() => handleCall(8)}>Call to Floor 8</button>
        <button onClick={() => handleCall(9)}>Call to Floor 9</button>
      </div>

      <Elevator
        currentFloor={elevator1Position}
        targetFloor={elevator1Target}
        onArrive={handleArriveElevator1}
      />
      <Elevator
        currentFloor={elevator2Position}
        targetFloor={elevator2Target}
        onArrive={handleArriveElevator2}
      />
    </div>
  );
};

export default ElevatorSystem;
