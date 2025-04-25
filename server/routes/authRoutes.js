import express from 'express'
import { loginController, registerController } from '../controllers/authControllers.js';


export const authRoutes = express.Router()

//REGISTER API
authRoutes.post('/register', registerController);


//LOGIN API
authRoutes.post('/login', loginController);

//LOGOUT API
authRoutes.post('/logout', (req,res)=>{});

