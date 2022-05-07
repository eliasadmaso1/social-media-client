import axios from "axios";
import {server_url} from '../../utils';

const updateUser = async (
  userId,
  username,
  from,
  city,
  relationship,
  profilePicture,
  coverPicture,
  dispatch
) => {
  try {
    const res = await axios.put(`${server_url}update`, {
      userId,
      username,
      from,
      city,
      relationship,
      profilePicture,
      coverPicture,
    });
    dispatch({
      type: "UPDATE",
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export { updateUser };
