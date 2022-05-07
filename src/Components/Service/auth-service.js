import axios from "axios";
import {server_url} from '../../utils';

export const LoginUser = async (userDetails, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(
      `${server_url}auth/login`,
      userDetails
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};
