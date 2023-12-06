import _, { createSignal, div, Ref, Screen } from "cradova";
import * as babel from "@babel/standalone";
import Input from "./components/Input";
import Output from "./components/Output";
import "./styles.css";
const template = () => {
  const signal = new createSignal(
    { input: "", output: "" },
    { persistName: "babel_code" }
  );

  function generateResult(value) {
    try {
      let result: String = babel.transform(value, {
        presets: ["react"],
      }).code;
      // nomalise
      result = result.replaceAll("\n", "");
      //? cradova 2.0 replacements (no element tags)
      result = result.replaceAll(";", "");
      result = result.replaceAll("null,", "");
      result = result.replaceAll("(null)", "()");
      result = result.replaceAll("class:", "className:");
      result = result.replaceAll('/*#__PURE__*/React.createElement("', `_("`);
      if (result.lastIndexOf(".") > -1) {
        result = result.replaceAll("/*#__PURE__*/React.createElement(", `_("`);
      }
      //? cradova 3.0 replacements (element tags)
      const results = result.split(`_("`);
      for (let index = 0; index < results.length; index++) {
        const element = results[index];
        const tage = element.indexOf(`",`);
        if (tage > -1) {
          results[index] = element.replace(`",`, "(");
        }
      }
      result = results.join("");
      // result = result.replaceAll("null,", "");
      // result = result.replaceAll("(null)", "()");
      // result = result.replaceAll("class:", "className:");
      // result = result.replaceAll('/*#__PURE__*/React.createElement("', `_("`);
      // if (result.lastIndexOf(".") > -1) {
      //   result = result.replaceAll("/*#__PURE__*/React.createElement(", `_("`);
      // }
      //
      signal.setKey(
        "output",
        result +
          `
          

`
      );
      Output.updateState({ output: signal.value.output, error: false });
    } catch (e) {
      signal.setKey("output", e.toString());
      Output.updateState({ output: signal.value.output, error: true });
    }
  }

  function handleInputChange(event) {
    const value = event.target.value + ``;
    signal.setKey("input", value);
    setTimeout(() => {
      generateResult(value);
    }, 400);
  }

  const input = signal.value.input;
  const output = signal.value.output;
  return div(
    _("h1|A jsx and html to cradova transpiler using babel"),
    _("h2|Coverts html and jsx to vanilla javascript"),
    Input.render({ input, handleInputChange }),
    Output.render({ output, error: false })
  );
};
const App = new Screen({
  name: "Cradova Babel Transpiler",
  template,
});

export default App;
