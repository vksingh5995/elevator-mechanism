import React from "react";
import CallButton from "./CallButton";

const Floor = ({ floorNumber, callElevator }) => {
  return (
    <div className="floor" style={{ "--floor-number": floorNumber }}>
      <span className="floor-label">
        {floorNumber === 0
          ? "Ground Floor"
          : floorNumber === 1
          ? "1st Floor"
          : floorNumber === 2
          ? "2nd Floor"
          : floorNumber === 3
          ? "3rd Floor"
          : `${floorNumber}th Floor`}
      </span>
      {floorNumber * 13.5}vh
      <CallButton floorNumber={floorNumber} callElevator={callElevator} />
    </div>
  );
};

export default Floor;
