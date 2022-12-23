import _ from "cradova";
const Output = ({ output, hasError }) => {
  return _(
    "div.output",
    _("textarea.output-box", {
      placeholder: "Compiled output will be shown here",
      value: hasError !== "" ? "" : output,
      readOnly: true,
    })
  );
};
export default Output;
