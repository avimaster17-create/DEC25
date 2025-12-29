const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTEAPI";
const signup = async (req, res) => {
    // existing user check -> password hashed --> user creation --> token Generate
    const { username, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json("User already exist")
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        })

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);

        res.status(201).json({ user: result, token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json("User not found")
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            res.status(400).json({ message: "Invalid Credential" });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        res.status(201).json({ user: existingUser, token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}

const prospectfoliocreation = async (req,res) => {
    let { pan, invname, dob, mobileno, emailId } = req.body;
    try {
        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        pan = pan?.toUpperCase();
        if (!regex.test(pan)) {
            return res.status(400).json({ message: "Invalid Pan Number" });
        }
        const dateRegex = /^\d{2}-(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)-\d{4}$/;
        if (!dateRegex.test(dob)) {
            return res.status(400).json({ message: "Date format is not correct" })
        }
        if (mobileno.length != 10) {
            return res.status(400).json({ message: "mobile number should be of 10 length" })
        }
        res.json({message:"Validation done"})
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = { signup, signin, prospectfoliocreation };