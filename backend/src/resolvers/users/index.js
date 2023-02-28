const knex = require('../../databases');
const Validator = require('fastest-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { createUserToken, createRefreshToken } = require('../../helpers/tokens')

const v = new Validator();

module.exports = {
    register: async (req, res) => {
        try {
            const { fullname, email, password, confirmPassword, place } = req.body;
            const schema = {
                fullname: { type: "string", min: 3, max: 255, nullable: false },
                email: { type: "email", min: 3, max: 255, nullable: false },
                password: { type: "string", min: 3, max: 255, nullable: false },
                confirmPassword: { type: "string", min: 3, max: 255, nullable: false },
                place: { type: "string", min: 3, max: 255, nullable: false }
            }
            const validate = v.validate(req.body, schema);
            if (validate.length) return res.status(400).json({ status: "error validation", message: validate });
            if (await knex('users').where({ email }).then(data => data.length) !== 0) return res.status(400).json({ status: "error", message: "Password or Email already exists" });
            if (password !== confirmPassword) return res.status(400).json({ status: "error", message: "Password or Email not match" });
            const hashPassword = await bcrypt.hash(password, 10);
            await knex('users').insert({
                fullname,
                email,
                password: hashPassword,
                place
            });
            res.status(201).json({
                status: "success",
                message: "User created successfully"
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const schema = {
                email: { type: "email", min: 3, max: 255, nullable: false },
                password: { type: "string", min: 3, max: 255, nullable: false }
            }
            const validate = v.validate(req.body, schema);
            if (validate.length) return res.status(400).json({ status: "error validation", message: validate });
            const user = await knex('users').where({ email }).first();
            if (!user) return res.status(400).json({ status: "error", message: "Email or Password not match" });
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) return res.status(400).json({ status: "error", message: "Email or Password not match" });
            const token = createUserToken({
                id: user.id
            });
            const refreshToken = createRefreshToken({
                id: user.id
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            await knex('users').update({ refreshToken: refreshToken }).where({ email });
            res.status(200).json({
                status: "success",
                message: "Login successfully",
                token
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message
            });
        }
    },
    refreshToken: async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) return res.status(400).json({message: "Refresh Token expired!"})
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403)
                const token = createUserToken({
                    id: user.id,
                })
                res.status(200).json({
                    message: "Refresh Token success",
                    token
                })
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }
    },
    logout: async (req, res) => {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(204)
        const user = await knex('users').where('refreshToken', refreshToken).first()
        if (!user) return res.sendStatus(204)
        await knex('users').where({id: user.id}).update({refreshToken: null})
        res.clearCookie('refreshToken')
        res.status(200).json({message: "Logout Success"})
    }
}