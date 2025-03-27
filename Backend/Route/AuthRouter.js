import { Router } from "express";
import {signup,login} from "../Controller/AuthController.js";
import  {signupvalidation,loginvalidation}  from "../Middlewares/AuthValidation.js";

const router = Router();

router.post("/signup", signupvalidation, signup); 
router.post("/login", loginvalidation, login); 


export default router;
