import { useCallback, useEffect, useState } from "react";
import {
  IUseHeartbeatStateReturn,
  TButtonsState,
  TSetHeartRate,
} from "./types";
import {
  HEARTBEAT_BUTTON_VALUES,
  MAX_HEART_RATE,
  MIN_HEART_RATE,
} from "../../constants";
import { useServerRate } from "./useServerRate";

const validateHeartRate = (heartRate: number): boolean =>
  MIN_HEART_RATE <= heartRate && heartRate <= MAX_HEART_RATE;

const DEFAULT_BUTTONS_STATE: TButtonsState = {
  [-1]: true,
  [-5]: true,
  [-10]: true,
  [-50]: true,
  1: true,
  5: true,
  10: true,
  50: true,
};
export const useHeartbeatState = (): IUseHeartbeatStateReturn => {
  const [heartRate, setHeartRateInner] = useState<number>(26);
  const [isServerRateActive, setIsServerRateActive] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [buttonsState, setButtonsState] = useState<TButtonsState>(
    DEFAULT_BUTTONS_STATE,
  );

  useEffect(() => {
    const newButtonState: TButtonsState = HEARTBEAT_BUTTON_VALUES.reduce(
      (acc, value) => {
        return {
          ...acc,
          [value]: validateHeartRate(heartRate + value),
        };
      },
      {} as TButtonsState,
    );
    setButtonsState(newButtonState);
  }, [heartRate]);

  const toggleServerRate = useCallback(
    () => setIsServerRateActive((prev) => !prev),
    [],
  );

  const setHeartRate: TSetHeartRate = useCallback((value) => {
    setHeartRateInner((prev) => {
      const newValue = typeof value === "function" ? value(prev) : value;
      if (!validateHeartRate(newValue)) {
        setError("Heartbeat is not in range [26,250]");
        return prev;
      }
      setError("");
      return newValue;
    });
  }, []);

  useServerRate({
    isServerRateActive,
    setHeartRate,
  });

  return {
    heartRate,
    buttonsState,
    isServerRateActive,
    error,
    setHeartRate,
    toggleServerRate,
  };
};
