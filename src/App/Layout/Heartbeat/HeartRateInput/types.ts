import { TSetHeartRate } from "../hooks/useHeartbeatState/types";

export interface IHeartRateInputProps {
  heartRate: number;
  setHeartRate: TSetHeartRate;
  disabled: boolean;
}
