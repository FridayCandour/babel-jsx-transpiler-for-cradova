import _ from "cradova";
const Output = ({ output }) => {
  return _(
    "div.output",
    _("textarea.output-box", {
      placeholder: "Compiled output will be shown here",
      value: output,
      readOnly: true,
    })
  );
};
export default Output;
