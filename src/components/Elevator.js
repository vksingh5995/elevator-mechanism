import React, { useState, useEffect } from "react";

const Elevator = ({ currentFloor, targetFloor, onArrive }) => {
  const [position, setPosition] = useState(currentFloor);
  const [status, setStatus] = useState("stopped"); // 'moving', 'arrived', 'stopped'

  useEffect(() => {
    if (targetFloor !== null && targetFloor !== position) {
      setStatus("moving");
      const moveTime = Math.abs(targetFloor - position) * 200;

      console.log(
        `Moving from ${position} to ${targetFloor} and will take ${moveTime}`
      );

      setTimeout(() => {
        setPosition(targetFloor);
        setStatus("arrived");
      }, moveTime);
    }
  }, [targetFloor, position]);

  useEffect(() => {
    if (status === "arrived") {
      const stopTime = 2000;
      setTimeout(() => {
        setStatus("stopped");
        onArrive();
      }, stopTime);
    }
  }, [status, onArrive]);

  return (
    <>
      <div className="elevator-system">
        <div
          className={`elevator ${status}`}
          style={{ gridRow: 10 - position, bottom: `${position * 14}vh` }}
        >
          <div className="elevator-icon"></div>
        </div>
      </div>
    </>
  );
};

export default Elevator;
