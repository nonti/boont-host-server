import jwt from 'jsonwebtoken'


export const generateTokens = async (user) => {
  //Get Access Token 
  let token =await jwt.sign({
    data: {email: user?.email, id: user._id}}, 'LOGINSECRET', {
    expiresIn: 60 * 60,
  });


  // Get Refresh Token
  let refreshToken = await jwt.sign({data: {email: user?.email, id: user._id}},'LOGINSECRET',{
    expiresIn: '1d'
  });

  return { token, refreshToken}
}