import { createRoot } from "react-dom/client";
import { App } from "./App";
import * as React from "react";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  const root = createRoot(document.getElementById("react-app")!);
  root.render(<App />);
});
