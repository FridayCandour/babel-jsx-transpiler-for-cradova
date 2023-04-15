import _, { createSignal, div, Ref, Screen } from "cradova";
import * as babel from "@babel/standalone";
import Input from "./components/Input";
import Output from "./components/Output";
import "./styles.css";
const AppComp = new Ref(function (this: Ref<any>) {
  const self: Ref<any> = this;
  const signal = new createSignal(
    { input: "", output: "", errorMsg: "" },
    { persistName: "babel_code" }
  );

  function generateResult(value) {
    try {
      let result: String = babel.transform(value, {
        presets: ["react"],
      }).code;
      // replacements
      result = result.replaceAll(";", "");
      result = result.replaceAll("null,", "");
      result = result.replaceAll(", null", "");
      result = result.replaceAll("class:", "className:");
      result = result.replaceAll('/*#__PURE__*/React.createElement("', ``);
      result = result.replaceAll('", ', `(`);
      result = result.replaceAll("data-", `$`);
      //
      signal.setKey(
        "output",
        result +
          `








`
      );
      signal.setKey("errorMsg", "");
    } catch (e) {
      signal.setKey("output", "");
      signal.setKey("errorMsg", e.toString());
    }
    self.updateState({});
  }

  function handleInputChange(event) {
    const value =
      event.target.value +
      `








`;
    signal.setKey("input", value);
    setTimeout(() => {
      generateResult(value);
    }, 500);
  }
  const errorMsg = signal.value.errorMsg;
  const input = signal.value.input;
  const output = signal.value.output;
  return div(
    _("h1|A jsx and html to cradova transpiler using babel"),
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
