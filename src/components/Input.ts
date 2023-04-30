import _, { Ref } from "cradova";
const Input = new Ref<{
  input: string;
  handleInputChange: (event: any) => void;
}>(({ input, handleInputChange }) => {
  return _(
    "div.input",
    _("textarea.input-box", {
      placeholder: "Write code here",
      value: input,
      // onchange: handleInputChange,
      oninput: handleInputChange,
    })
  );
});
export default Input;
