import mongoose, { model, Schema } from 'mongoose'


const userSchema = new Schema({
  fullName:{type: String, required:true},
  lastName:{type: String, required:true},
  email:{type: String, required:true, unique: true},
  password:{type: String, required:true, unique: true},
  emailVerified:{type: Boolean, default:false},
  refreshToken: {type: String},
  otp: {type:String, max:6}
}, {timestamps: true})


export const User = mongoose.model('User', userSchema)


