import User from "../Model/User.js";  
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    const { username, fullname, email, password, mobile, skills, branch, year, linkedin } = req.body;

    try {
        // Check if user with the same email or mobile already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(409).json({ error: "User already exists with this email" });
        }

        const existingUserByMobile = await User.findOne({ mobile });
        if (existingUserByMobile) {
            return res.status(409).json({ error: "User already exists with this mobile number" });
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

        res.status(201).json({
            message: "Signup successful",
            token,
            user: { id: newUser._id, username, email }
        });

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
export default signup;
