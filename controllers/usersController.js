import md5 from 'md5';
import jwt from 'jsonwebtoken';

import Users from '../models/Users.js';

export default {
    async registration(req, res) {
        try{
            const {username, password} = req.body;
            const hashedPassword = md5(md5(password) + process.env.SECRET_FOR_PASSWORD);
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
                where: {username: username},
                attributes: ['id', 'username', 'password', 'createdAt', 'updatedAt']

            });
            const hashedPassword = md5(md5(password) + process.env.SECRET_FOR_PASSWORD);


            if (!user || hashedPassword !== user.getDataValue("password")) {
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
                expiresIn: '24h'
            });


            console.log(token)
            // console.log(user)


            if (user.type === "admin"){
                return res.status(200).json({
                    message: 'Admin logged in successfully',
                    user: user,
                    token: token,
                    isAdmin:true
                });
            }

            return res.status(200).json({
                message: 'User logged in successfully',
                user: user,
                token: token,
                isAdmin:false
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