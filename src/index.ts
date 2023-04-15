import { Router } from "cradova";

import App from "./App";
Router.BrowserRoutes({ "/": App, "/404": App });
