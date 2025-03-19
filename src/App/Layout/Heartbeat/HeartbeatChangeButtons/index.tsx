import { FC } from "react";

import { IHeartbeatChangeButtonsProps } from "./types";
import { HEARTBEAT_BUTTON_VALUES } from "../constants";

export const HeartbeatChangeButtons: FC<IHeartbeatChangeButtonsProps> = ({
  setHeartRate,
  buttonsState,
  disabled,
}) => {
  return (
    <div>
      {HEARTBEAT_BUTTON_VALUES.map((value) => {
        return (
          <button
            key={value}
            type="button"
            disabled={!buttonsState[value] || disabled}
            onClick={() => {
              setHeartRate((prev) => prev + value);
            }}
          >
            {value < 0 ? value : `+${value}`}
          </button>
        );
      })}
    </div>
  );
};
