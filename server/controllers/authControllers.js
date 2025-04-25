import { createUser, findUserByEmail } from "../services/authServices.js";
import { generateTokens } from "../utils/authHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
export const registerController = async (req, res, next) => {
  const { fullName, lastName, email, password} = req.body;
  try {
    const userExist = await findUserByEmail(email);
    if(userExist){
      throw new ErrorHandler('User already exist!', 401);
    }

    //Hash Password
    const hashedPassword = await hashPassword(password);

   //Save User on Database
    const savedData = await createUser({
      fullName,
       lastName, 
       email, 
       password: hashedPassword
    });

    res.status(201).json({
      success: false,
      message: savedData, 
    })
  } catch (error) {
    next(error)
  }

}


export const loginController = async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const user = await findUserByEmail(email);
    if(!user){
      throw new ErrorHandler('User not found and wrong Email', 401);
    }

    const matchPassword = await comparePassword(password, user.password);
    if(!matchPassword){
      return res.status(401).json({
        success: false,
        message: 'Password do not match'
      })
    }

    //Access and Refresh Token generation
    const {token, refreshToken} = await generateTokens(user)

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken',token, {
      httpOnly: true, 
      secure: true
    })

    res.cookie('refreshToken',refreshToken, {
      httpOnly: true, 
      secure: true
    })


    console.log(user, password, token)

    res.status(201).json({
      success: true,
      message: 'Logged in successfully!', 
      user,
      accessToken: token,
      refreshToken
    })
  } catch (error) {
    next(error) 
  }
}

export const logoutController = (req,res) => {

}