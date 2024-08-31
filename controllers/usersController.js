import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Users from '../models/Users.js';

export default {
    async registration(req, res) {
        try{
            const {username, password} = req.body;
            const hashedPassword = await bcrypt.hash(password + process.env.SECRET_FOR_PASSWORD, 10);
            const [user, created] = await Users.findOrCreate({
                where: { username: username },
                defaults: {
                    username: username,
                    password: hashedPassword,
                }
            });
            if (!created) {
                return res.status(409).json({
                    message: 'User already exists',
                });
            } else {
                user.password = undefined
                return res.status(201).json({
                    message: 'User created successfully',
                    user: user,
                });
            }
        }catch (error) {
            console.error('Registration Error:', error);
            return res.status(500).json({
                message: 'registration failed',
                error: error.message,
            });
        }
    },
    async login(req, res) {
        try {
            const { username, password } = req.body;

            const user = await Users.findOne({
                where: {username: username}
            });
            const hashedPassword = await bcrypt.hash(password + process.env.SECRET_FOR_PASSWORD, 10);


            if (!user || hashedPassword !== user.password) {
                return res.status(400).json({
                    message: 'Invalid username or password'
                });
            }
            const payload = {
                username: user.username,
                id: user.id
            };

            const token = jwt.sign(
                payload,
                process.env.SECRET_FOR_JWT, {
                expiresIn: '1h'
            });


            console.log(token)


            return res.status(200).json({
                message: 'User logged in successfully',
                user: user,
                token: token
            });


        } catch (error) {
            console.error('Login Error:', error);
            return res.status(500).json({
                message: 'Login failed',
                error: error.message
            });
        }
    }

}