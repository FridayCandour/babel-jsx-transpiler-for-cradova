import _, { Ref } from "cradova";
const Output = new Ref<{ output: string; error: boolean }>(
  ({ output, error }) => {
    return _(
      "div.output",
      _("textarea.output-box" + (error ? ".errorMsg" : ""), {
        placeholder: "Compiled output will be shown here",
        value: output,
        readOnly: true,
      })
    );
  }
);
export default Output;
