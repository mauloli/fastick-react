import axios from "../../utils/axios";
export const registerUser = (form) => {
  return {
    type: "REGISTER_USER",
    payload: axios.post("auth/register", form)
  };
};
