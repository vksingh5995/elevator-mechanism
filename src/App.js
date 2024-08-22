import React, { useState } from "react";
import "./App.scss";
import "./styles/CallButton.scss";
import "./styles/Elevator.scss";
import "./styles/Floor.scss";
import Floor from "./components/Floor";
import Elevator from "./components/Elevator";
import ElevatorSystem from "./components/ElevatorSystem";

const App = () => {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [targetFloor, setTargetFloor] = useState(null);

  const callElevator = (floor, onArrive) => {
    setTargetFloor(floor);
    const handleArrive = () => {
      setCurrentFloor(floor);
      onArrive();
    };
    return handleArrive;
  };

  return (
    <div className="building">
      <div className="floors">
        {[...Array(10)].map((_, i) => (
          <Floor
            key={i}
            floorNumber={9 - i}
            callElevator={(floor, onArrive) => callElevator(floor, onArrive)}
          />
        ))}
      </div>
      <div className="elevator-container">
        <Elevator
          currentFloor={currentFloor}
          targetFloor={targetFloor}
          setCurrentFloor={setCurrentFloor}
          onArrive={(e) => {
            setTargetFloor(null);
          }}
        />
        {/* <ElevatorSystem /> */}
      </div>
    </div>
  );
};

export default App;
