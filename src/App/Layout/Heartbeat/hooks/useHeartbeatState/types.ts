import { HEARTBEAT_BUTTON_VALUES } from "../../constants";
import { SetStateAction, Dispatch } from "react";

export type TSetHeartRate = Dispatch<SetStateAction<number>>;

type TArrayType<A> = A extends readonly (infer R)[] ? R : never;

export type THeartbeatButtonValues = TArrayType<typeof HEARTBEAT_BUTTON_VALUES>;

export type TButtonsState = {
  [key in THeartbeatButtonValues]: boolean;
};

export type TToggleServerRate = () => void;

export interface IUseHeartbeatStateReturn {
  heartRate: number;
  isServerRateActive: boolean;
  error: string;
  buttonsState: TButtonsState;
  setHeartRate: TSetHeartRate;
  toggleServerRate: TToggleServerRate;
}
