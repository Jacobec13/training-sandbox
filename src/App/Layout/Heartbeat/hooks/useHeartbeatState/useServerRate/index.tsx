import { IUseServerRateParams } from "./types";
import { useEffect, useRef } from "react";
import { ServerRateHandler } from "./helpers/ServerRateHandler";

export const useServerRate = ({
  setHeartRate,
  isServerRateActive,
}: IUseServerRateParams) => {
  const serverRateHandlerRef = useRef<ServerRateHandler | null>(null);

  useEffect(() => {
    if (!serverRateHandlerRef.current) {
      serverRateHandlerRef.current = new ServerRateHandler();
    }

    return () => {
      serverRateHandlerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isServerRateActive) {
      serverRateHandlerRef.current?.startListeningForHeartRate(setHeartRate);
    } else {
      serverRateHandlerRef.current?.stopListeningForHeartRate();
    }
  }, [setHeartRate, isServerRateActive]);
};
