const User = require('../models/User');
const bcrypt = require('bcrypt');
const ResponseData = require('../models/ResponseData');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

const authController = {
    generateAccessToken: (user) => {
        return jwt.sign({
                id: user.id,
                roleID: user.roleID,
            },
            process.env.JWT_ACCESS_KEY, { expiresIn: "30d" }
        );
    },

    generateRefreshToken: (user) => {
        return jwt.sign({
                id: user.id,
                roleID: user.roleID,
            },
            process.env.JWT_REFRESH_KEY, { expiresIn: "365d" }
        );
    },
    registerUser: async(req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const newUser = await new User({
                username: req.body.username,
                roleID: req.body.roleID,
                fullName: req.body.fullName,
                accountStatus: req.body.accountStatus,
                email: req.body.email,
                password: hashed
            });
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    loginUser: async(req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                const responseData = await ResponseData.findOne({ error: 2 });
                res.status(200).json(responseData);
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                const responseData = await ResponseData.findOne({ error: 3 });
                res.status(200).json(responseData);
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })
                const { password, ...others } = user._doc;
                const responseData = await ResponseData.findOne({ error: 1 });
                res.status(200).json({ responseData, ...others, accessToken, refreshToken });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    refreshToken: async(req, res) => {
        const refreshToken = req.cookie.refreshToken;
        res.status(200).json(refreshToken);
        if (!refreshToken) return res.status(401).json("You are not authenticated");
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push()
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({ accessToken: newAccessToken });
        })

    },
    userLogout: async(req, res) => {
        res.clearCookie('refreshToken');
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("logout!");
    }
};


module.exports = authController;