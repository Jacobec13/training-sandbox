import { TSetHeartRate } from "../../types";

enum EHandlerState {
  NOT_READY = "NOT_READY",
  READY = "READY",
}
type TTask = () => void;

export class ServerRateHandler {
  private readonly connection: WebSocket;
  private state: EHandlerState = EHandlerState.NOT_READY;
  private readonly taskQueue: TTask[] = [];
  private intervalId: number = -1;
  constructor() {
    this.connection = new WebSocket("wss://localhost:9001/heart-rate");
    this.connection.onopen = () => {
      this.state = EHandlerState.READY;
      this.executeTasksFromQueue();
    };
  }

  private executeTasksFromQueue() {
    if (this.state === EHandlerState.NOT_READY) {
      return;
    }
    while (this.taskQueue.length > 0) {
      const task = this.taskQueue.pop();
      if (task) {
        task();
      }
    }
  }

  private checkHeartRate = () => {
    this.connection.send("");
    console.log("checkHeartRate");
  };

  startListeningForHeartRate(setHeartRate: TSetHeartRate) {
    this.connection.onmessage = (ev) => {
      setHeartRate(parseInt(ev.data));
    };
    this.taskQueue.push(this.checkHeartRate);
    this.intervalId = window.setInterval(() => {
      this.taskQueue.push(this.checkHeartRate);
      this.executeTasksFromQueue();
    }, 5000);
    this.executeTasksFromQueue();
  }

  stopListeningForHeartRate() {
    window.clearInterval(this.intervalId);
  }

  disconnect() {
    this.connection.close();
  }
}
