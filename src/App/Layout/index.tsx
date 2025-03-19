import { FC } from "react";

import { ILayoutProps } from "./types";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import { Heartbeat } from "./Heartbeat";

export const Layout: FC<ILayoutProps> = () => {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", width: "100%" }}>
        <nav style={{ flex: 1 }}>
          <ul>
            <li>
              <Link to="/heartbeat">heartbeat</Link>
            </li>
          </ul>
        </nav>
        <main style={{ flex: 6 }}>
          <Routes>
            <Route path="/heartbeat" Component={Heartbeat}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
