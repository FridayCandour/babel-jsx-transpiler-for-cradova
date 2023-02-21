import _ from "cradova";
const Error = ({ errorMsg }) => {
  return _("pre.errorMsg|" + errorMsg);
};
export default Error;
