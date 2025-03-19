import { ChangeEventHandler, FC, useState } from "react";

import { IHeartRateInputProps } from "./types";
import { MAX_HEART_RATE, MIN_HEART_RATE } from "../constants";

export const HeartRateInput: FC<IHeartRateInputProps> = ({
  heartRate,
  setHeartRate,
  disabled,
}) => {
  const [value, setValue] = useState<number>(heartRate);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
  };

  const handleClick = () => {
    setHeartRate(value);
  };

  return (
    <div>
      <span>Enter heartbeat:</span>
      <input
        type="number"
        placeholder="heartbeat"
        aria-describedby="heartbeat-input-description"
        min={MIN_HEART_RATE}
        max={MAX_HEART_RATE}
        value={value}
        onChange={handleChange}
      />
      <p
        id="heartbeat-input-description"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        Enter heartbeat here. Minimum value is 26. Maximum is 250.
      </p>
      <button type="button" onClick={handleClick} disabled={disabled}>
        Change
      </button>
    </div>
  );
};
