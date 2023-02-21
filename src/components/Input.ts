import _, { assert } from "cradova";
import Error from "./Error";
const Input = ({ input, handleInputChange, errorMsg }) => {
  return _(
    "div.input",
    _("textarea.input-box", {
      placeholder: "Write code here",
      value: input,
      onchange: handleInputChange,
      // oninput: handleInputChange,
    }),
    assert(errorMsg, _("div.error", Error({ errorMsg })))
  );
};
export default Input;
