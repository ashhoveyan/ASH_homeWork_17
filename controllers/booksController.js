import Books from '../models/Books.js'
import Users from '../models/Users.js'
import Category from '../models/Category.js'
import Reviews from "../models/Reviews.js";
import BookCategory from "../models/BookCategory.js";
import {Op,Sequelize} from 'sequelize';

export default {
   async addBook(req, res) {
       try {
           const { title, author,categoryName}= req.body
           const{userId} = req.user
           const cover = req.file ? req.file.path : null;


           const [category] = await Category.findOrCreate({
               where: { name:categoryName },
           });

           const[book,created] = await Books.findOrCreate({
               where:{title},
               defaults:{
                  title,
                  author,
                  userId,
                   cover
               }
           })
           if(!created){
               if (cover) {
                   fs.unlinkSync(cover);
               }

               return res.status(409).json({
                   message: 'Book already exists',
                    book
               });
           }

           await BookCategory.create({
               bookId: book.id,
               categoryId: category.id,
           });
               return res.status(201).json({
                   message: 'Book added successfully',
                    book,
                    category,
               });


       }catch(error) {
           console.error('Error adding book:', error);
           return res.status(500).json({
               message: 'An error occurred while adding the book',
               error: error.message
           });
       }

   },
    async getBooks(req, res) {
        try {
            const total = await Books.count()

            let page = +req.query.page;
            let limit = +req.query.limit;
            let offset = (page - 1) * limit;


            const maxPageCount = Math.ceil(total / limit);

            if (page > maxPageCount) {
                res.status(404).json({
                    message: 'Book does not exist',
                });
                return
            }


            const booksList = await Books.findAll({
                limit,
                offset,
                include: [
                    {
                        model: Users,
                    }
                ],
                order: [
                    ['createdAt', 'Desc']
                ],
            });

            if (booksList.length === 0) {
                return res.status(404).json({
                    message: 'No books found'
                });
            }

             res.status(200).json(
                 {
                     message: 'Books retrieved successfully',
                     books: booksList
                 });

        } catch (error) {
            console.error('Error fetching books:', error);
            return res.status(500).json({
                message: 'An error occurred while retrieving books',
                error: error.message
            });
        }
    },
     getTopRatedBooks: async (req, res) => {
       try {
           const {id:userId} = req.user;
           const total = await Books.count();

           const order = req.query.order
           let page = +req.query.page;
           let limit = +req.query.limit;
           const offset = (page - 1) * limit;



           const maxPageCount = Math.ceil(total / limit);

           if (page > maxPageCount) {
               return res.status(404).json({
                   message: 'Page not found.',
                   books: [],
                   total,
                   currentPage: page,
                   totalPages: maxPageCount
               });
           }

           const topRatedBooks = await Books.findAll({
               attributes: [
                   'id',
                   'title',
                   'author',
                   [
                       Sequelize.fn('AVG', Sequelize.col('reviews.rating')),
                       'averageRating'
                   ]
               ],
               include: [
                   {
                       model: Reviews,
                       attributes: []

                   }
               ],
               group: ['id'],
               order: [
                   [Sequelize.fn('AVG', Sequelize.col('reviews.rating')), order]
               ],
               // limit,
               // offset
           });

           res.status(200).json({
               message: 'Top-rated books retrieved successfully.',
               topRatedBooks,
               total,
               currentPage: page,
               totalPages: maxPageCount
           });

       }catch (error) {
           console.error('Error fetching top-rated books:', error);
           return res.status(500).json({
               message: 'An error occurred while fetching top-rated books',
               error: error.message
           });
       }
     }

}