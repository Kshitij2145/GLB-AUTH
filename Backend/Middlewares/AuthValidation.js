import Joi from "joi";
const signupvalidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        fullname: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required(),
        mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        skills: Joi.string().min(1).max(100).required(),
        branch: Joi.string().min(2).max(100).required(),
        year: Joi.string().length(4).pattern(/^[0-9]+$/).required(),
        linkedin: Joi.string().uri().required(),
    });

    const { error } = schema.validate(req.body);
    
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

export default signupvalidation;
