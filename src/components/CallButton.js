import React, { useEffect, useState } from "react";

const CallButton = ({ floorNumber, callElevator }) => {
  const [status, setStatus] = useState("call");

  const handleClick = () => {
    // Call the elevator and set status to "waiting" when it starts moving
    callElevator(floorNumber, () => {
      setStatus("waiting");
      console.log("waiting");

      // Simulate the elevator's arrival at the floor
      setTimeout(() => {
        setStatus("arrived");
        console.log("arrived");
      }, 2000);
    });
  };

  useEffect(() => {
    if (status === "waiting") {
      const resetTimeout = setTimeout(() => setStatus("arrived"), 2000);
      return () => clearTimeout(resetTimeout);
    }
    if (status === "arrived") {
      const resetTimeout = setTimeout(() => setStatus("call"), 5000);
      return () => clearTimeout(resetTimeout);
    }
  }, [status]);

  return (
    <button
      className={`call-button ${status}`}
      onClick={status === "call" ? handleClick : null}
    >
      {status}
    </button>
  );
};

export default CallButton;
