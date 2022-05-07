import axios from "axios";

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
    const res = await axios.put("http://localhost:8800/users/update", {
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
