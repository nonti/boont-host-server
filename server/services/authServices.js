import { User } from "../models/userModel.js";

export const findUserByEmail = async (email) =>  {
  return await User.findOne({email});
}

export const createUser = async ({ fullName, lastName, email, password})=> {
  const data = new User();
  data.fullName = fullName;
  data.lastName = lastName;
  data.email = email;
  data.password = password;

  return await data.save();
}