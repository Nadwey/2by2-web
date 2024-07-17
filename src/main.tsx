import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root.tsx";
import Home from "./routes/Home.tsx";
import Devices from "./routes/Devices.tsx";
import Device from "./routes/devices/Device.tsx";

import "./index.css";
import { SWRConfig } from "swr";
import axios from "axios";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/devices",
                element: <Devices />,
                children: [
                    {
                        path: "/devices/:codename",
                        element: <Device />,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <SWRConfig
            value={{
                fetcher: (url) => axios.get(url).then((res) => res.data),
                errorRetryCount: 1,
            }}
        >
            <RouterProvider router={router} />
        </SWRConfig>
    </React.StrictMode>,
);
