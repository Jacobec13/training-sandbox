// import { http, HttpResponse, ws } from "msw";

const { http, HttpResponse, ws } = require("msw");

const heartRate = ws.link("wss://localhost:9001/heart-rate");
export const handlers = [
  http.get("/test", () => {
    return HttpResponse.json({ foo: "bar" });
  }),
  heartRate.addEventListener("connection", ({ client }) => {
    console.log("outgoing WebSocket connection");
    client.addEventListener("message", () => {
      const newHeartRate = Math.floor(26 + Math.random() * (250 - 26));
      client.send(String(newHeartRate));
    });
  }),
];
