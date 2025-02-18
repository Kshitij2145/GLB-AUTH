import { Router } from "express";
import signup from "../Controller/AuthController.js";
import  signupvalidation  from "../Middlewares/AuthValidation.js";

const router = Router();

router.post("/signup", signupvalidation, signup); 

export default router;
