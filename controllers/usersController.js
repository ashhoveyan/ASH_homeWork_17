import md5 from 'md5';
import jwt from 'jsonwebtoken';

import Users from '../models/Users.js';
import {hash} from "bcrypt";
import {Sequelize, where} from "sequelize";
import Reviews from "../models/Reviews.js";

export default {
    async registration(req, res) {
        try{
            console.log(req.file)
            const {username, password} = req.body;

            const avatar = req.file ? req.file.path : null;
            const [user, created] = await Users.findOrCreate({
                where: { username },
                defaults: {
                     username,
                     password,
                     avatar,
                }
            });
            if (!created) {

                if (avatar) {
                    fs.unlinkSync(avatar);
                }

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
                where: {username},

            });
            //const hashedPassword = md5(md5(password) + process.env.SECRET_FOR_PASSWORD);
            const hashedPassword = Users.hash(password)


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
    },
    updateProfile:async (req, res) =>{
        try {
            const { id } = req.user;
            const { username } = req.body;
            const avatar = req.file ? req.file.path : null;


            const user = await Users.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }

            if (avatar && user.avatar) {
                try {
                    fs.unlinkSync(`${user.avatar}`);
                } catch (fileErr) {
                    console.error('Error removing old avatar:', fileErr.message);
                    return res.status(500).json({ message: 'Failed to update avatar. Please try again.' });
                }
            }

            await Users.update(
                {
                    username,
                     avatar,
                },
                {
                    where:{id}
                }
            );

            res.status(200).json({
                message: 'User updated successfully',
            });
        }catch (err){
            console.error('Error updating profile:', err.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
     getActiveReviewers:async(req, res) =>{
        try {
            const total = await Users.count();

            let page = +req.query.page
            let limit = +req.query.limit
            const order = req.query.order;

            const offset = (page - 1) * limit;

            const maxPageCount = Math.ceil(total / limit);

            if (page > maxPageCount) {
                return res.status(404).json({
                    message: 'Page not found.',
                    users: []
                });
            }

            const { id: userId } = req.user;
            const userExists = await Users.findByPk(userId);

            if (!userExists) {
                return res.status(404).json({
                    message: 'User not found.'
                });
            }

            const topActiveReviewers = await Users.findAll({
                attributes: [
                    'id',
                    'username',
                    [
                        Sequelize.fn('COUNT', Sequelize.col('reviews.id')),
                        'reviewCount'
                    ]
                ],
                include: [
                    {
                        model: Reviews,
                        attributes: []
                    }
                ],
                group: ['Users.id'],
                order: [
                    [Sequelize.fn('COUNT', Sequelize.col('reviews.id')), order]
                ],
                // limit,
                // offset
            });

            return res.status(200).json({
                message: 'Most active reviewers retrieved successfully.',
                topActiveReviewers,
                total,
                currentPage: page,
                totalPages: maxPageCount
            });

        } catch (e) {
            console.error('Error fetching active reviewers:', e);
            return res.status(500).json({
                message: 'Internal server error',
                error: e.message
            });
        }
    }
}