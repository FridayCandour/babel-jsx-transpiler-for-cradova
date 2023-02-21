import _, { createSignal, Ref, Screen } from "cradova";
import { SignalType, RefType } from "cradova/src/types";
import * as babel from "@babel/standalone";
import Input from "./components/Input";
import Output from "./components/Output";
import "./styles.css";
const AppComp = new Ref(function (this: RefType) {
  const self: RefType = this;
  const signal: SignalType = new createSignal(
    { input: "", output: "", errorMsg: "" },
    { persistName: "babel_code" }
  );

  function generateResult(value) {
    try {
      let result: String = babel.transform(value, {
        presets: ["react"],
      }).code;
      result = result.replaceAll("null,", "");
      if (result.includes("null")) {
        result = result.replaceAll(", null", "");
      }
      result = result.replaceAll("/*#__PURE__*/React.createElement", `_`);
      signal.setKey("output", result);
      signal.setKey("errorMsg", "");
    } catch (e) {
      signal.setKey("output", "");
      signal.setKey("errorMsg", e.toString());
    }
    self.updateState({});
  }

  function handleInputChange(event) {
    const value = event.target.value;
    signal.setKey("input", value);
    setTimeout(() => {
      generateResult(value);
    }, 800);
  }
  const errorMsg = signal.value.errorMsg;
  const input = signal.value.input;
  const output = signal.value.output;
  return _(
    "div",
    _("h1|Babel Transpiler for Cradova"),
    _("h2|Coverts html and jsx to vanilla javascript"),
    Input({ input, handleInputChange, errorMsg }),
    Output({ output })
  );
});
const App = new Screen({
  name: "Cradova Babel Transpiler",
  template: () => AppComp.render({}),
});

export default App;
