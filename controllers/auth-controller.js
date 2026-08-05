// register controllers

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const registerUser = async (req, res) => {
    try {
        // WE NEED TO EXTRACT SOME USER INFO FIRST DUDE 

        const { userName, email, password, role } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'userName, email, and password are required'
            });
        }

        // if the user is already in the db , check that 
        const checkExistingUser = await User.findOne({ $or: [{ userName }, { email }] });
        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: 'user already exists , try to login instead'
            });
        }

        // we need to hash the passwords now 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // we can now create a new user 

        const newlyCreatedUser = new User({
            userName,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        await newlyCreatedUser.save();

        if (newlyCreatedUser) {
            res.status(201).json({
                success: true,
                message: `${userName} is now registered `
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Unable to register the User , please try again"
            });
        }

    } catch (e) {
        console.error(e.message);
        res.status(500).json({
            success: false,
            message: "could not register , please try again"
        });
    }
};

// login controllers 

const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({
                success: false,
                message: 'userName and password are required'
            });
        }

        // find if the user exists in the database or not 

        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'i do not know you gang'
            });
        }

        // if the password is correct or not ,

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "invalid password dude"
            });
        }

        const accessToken = jwt.sign({
            userId: user._id,
            username: user.userName,
            role: user.role,
        }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });

        res.status(200).json({
            success: true,
            message: 'login successful ',
            accessToken
        });

    } catch (e) {
        console.error(e.message);
        res.status(500).json({
            success: false,
            message: "could not login , please try again"
        });
    }
};

module.exports = { loginUser, registerUser };