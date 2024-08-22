import React, { useState, useEffect } from "react";

const Elevator = ({ currentFloor, targetFloor, onArrive, setCurrentFloor }) => {
  const [position, setPosition] = useState(null);
  const [currentTargetFloor, setCurrentTargetFloor] = useState(null);
  const [status, setStatus] = useState("stopped"); // 'stopped', 'moving', 'arrived'
  const [bottom, setBottom] = useState(0.0);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    if (targetFloor !== null) {
      setQueue((prev) => {
        // sort the queue in ascending order
        const newQueue = [...prev, targetFloor];
        // .sort((a, b) => a - b);
        return newQueue;
      });
    }
  }, [targetFloor]);

  useEffect(() => {
    // set currentTargetFloor to the first item in the queue
    if (queue.length > 0) {
      setCurrentTargetFloor(queue[0]);
    }
  }, [queue]);

  useEffect(() => {
    if (currentTargetFloor !== null) {
      setPosition(currentTargetFloor);
    }
  }, [currentTargetFloor, position]);

  useEffect(() => {
    if (status === "arrived") {
      setTimeout(() => {
        // delete first item in queue
        setQueue((prev) => prev.slice(1));

        console.log("deleting first item in queue");
      }, 2000);
    }
  }, [status]);

  useEffect(() => {
    if (position !== 0) {
      const isMovingUp = currentTargetFloor > currentFloor;
      const floorHeight = 13.5; // The height of one floor in vh
      const speed = 0.1; // The distance that elevator moves in vh per interval

      if (isMovingUp) {
        if (bottom < position * floorHeight) {
          setStatus("moving");
          setTimeout(() => {
            setBottom((prev) => {
              const newBottom = prev + speed;
              const floorReached = Math.floor(newBottom / floorHeight);
              if (
                newBottom >= floorReached * floorHeight &&
                floorReached > currentFloor
              ) {
                // console.log("Arriving at floor:", floorReached);
                setCurrentFloor(floorReached);
                // setStatus("arrived");
              }
              return newBottom;
            });
          }, 10);
        }

        if (bottom >= position * floorHeight) {
          setStatus("arrived");
          setCurrentFloor(position);
          onArrive && onArrive(position);
          console.log("Status ffdsfs", status);
        }
      } else {
        if (bottom > position * floorHeight) {
          setStatus("moving");
          setTimeout(() => {
            setBottom((prev) => {
              const newBottom = prev - speed;
              const floorReached = Math.ceil(newBottom / floorHeight);
              if (
                newBottom <= floorReached * floorHeight &&
                floorReached < currentFloor
              ) {
                console.log("Arriving at floor:", floorReached);
                setCurrentFloor(floorReached);
                // setStatus("arrived");
                // onArrive && onArrive(floorReached); // Trigger onArrive callback if provided
                // console.log("Status", status);
              }
              return newBottom;
            });
          }, 10);
        }
        if (bottom === position * floorHeight) {
          setStatus("arrived");
          setCurrentFloor(position);
          onArrive && onArrive(position);
          console.log("Status", status);
        }
      }
    }
  }, [
    position,
    status,
    currentFloor,
    setCurrentFloor,
    onArrive,
    currentTargetFloor,
    bottom,
  ]);

  return (
    <>
      <div className="elevator-system">
        <div
          className={`elevator ${status}`}
          style={{
            color: "white",
            gridRow: 10 - position,
            bottom: `${bottom}vh`,
            // bottom: `${position * 13.5}vh`,
            // transitionDuration: `${Math.abs(targetFloor - currentFloor)}s`,
          }}
        >
          {bottom.toFixed(2)} <br />
          {status}
          {/* <div className="elevator-icon"></div> */}
        </div>
      </div>
    </>
  );
};

export default Elevator;
