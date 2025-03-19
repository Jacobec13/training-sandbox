import { FC } from "react";

import { IHeartbeatProps } from "./types";
import { HeartbeatChangeButtons } from "./HeartbeatChangeButtons";
import { HeartRateInput } from "./HeartRateInput";
import { useHeartbeatState } from "./hooks/useHeartbeatState";
import { ErrorView } from "./ErrorView";
import { Heart } from "./Heart";

export const Heartbeat: FC<IHeartbeatProps> = () => {
  const {
    isServerRateActive,
    toggleServerRate,
    heartRate,
    setHeartRate,
    error,
    buttonsState,
  } = useHeartbeatState();

  return (
    <div>
      <div>
        <p>Current heartbeat is: {heartRate} BPM</p>
        <ErrorView error={error}></ErrorView>
        <HeartRateInput
          heartRate={heartRate}
          setHeartRate={setHeartRate}
          disabled={isServerRateActive}
        ></HeartRateInput>
        <div>
          <p>Change heartbeat</p>
          <HeartbeatChangeButtons
            buttonsState={buttonsState}
            setHeartRate={setHeartRate}
            disabled={isServerRateActive}
          ></HeartbeatChangeButtons>
        </div>
        <div>
          <span>Toggle server heart rate</span>
          <input
            type="checkbox"
            checked={isServerRateActive}
            onClick={() => {
              toggleServerRate();
            }}
          ></input>
        </div>
        <div>
          <Heart heartRate={heartRate}></Heart>
        </div>
      </div>
    </div>
  );
};
