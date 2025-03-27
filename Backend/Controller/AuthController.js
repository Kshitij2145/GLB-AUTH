import User from "../Model/User.js";  
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// SIGNUP FUNCTIONALITY

export const signup = async (req, res) => {
    const { username, fullname, email, password, mobile, skills, branch, year, linkedin } = req.body;

    try {
        // Check if user with the same email or mobile already exists
        const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
        console.log("existingUserFound: ", existingUser);
        if (existingUser) {
            return res.status(409).json({ error: "Email or mobile number already registered." });
        }
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            fullname,
            email,
            password: hashedPassword,
            mobile,
            skills,
            branch,
            year,
            linkedin
        });

        // Save new user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Send response
        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).status(201).json({ 
            message: "Signup successful", 
            user: { id: newUser._id, username, email }
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};



//LOGIN FUNCTIONALITY   

export const login=async(req,res)=>{
    const {email,password}=req.body;
    //BOTH FIELDS ARE REQUIRED TO PROCEED
    if(!email){
        return res.status(400).json({error:"Email is required"});
    }
    if(!password){
        return res.status(400).json({error:"Password is required"});
    }
     //CHECK IF THE EMAIL MATCHES WITH THE ONE IN THE DATABASE
    try{
        const user =await User.findOne({email});
        if(!user){
            return res.status(404).json({error:"User not found"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        //CHECK IF THE PASSWORD MATCHES
        if(!isMatch){
            return res.status(401).json({error:"Invalid credentials"});
        }
        
        //GENERATE JWT TOKEN
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

      // Store token in an httpOnly cookie and send response to frontend
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }).status(200).json({
        message: "Login successful",
        user: { id: user._id, email: user.email }
    });

    }catch(err){
        console.error("Login error:",err);
        res.status(500).json({error:"Internal server error"});
    }
   
}

export default {signup,login};