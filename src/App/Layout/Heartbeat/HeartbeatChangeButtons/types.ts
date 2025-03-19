import { TButtonsState, TSetHeartRate } from "../hooks/useHeartbeatState/types";

export interface IHeartbeatChangeButtonsProps {
  buttonsState: TButtonsState;
  setHeartRate: TSetHeartRate;
  disabled: boolean;
}
