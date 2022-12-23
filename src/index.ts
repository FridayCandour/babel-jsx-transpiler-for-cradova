import { Router } from "cradova";
import { RouterType } from "cradova/src/types";

import App from "./App";

const r: RouterType = Router;

r.route("/", App);
r.route("/404", App);
