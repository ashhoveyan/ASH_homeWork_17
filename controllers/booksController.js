import Books from '../models/Books.js'

import Users from '../models/Users.js'




export default {
   async addBook(req, res) {
       try {
           const { title, author}= req.body
           const{id:userId} = req.user


           const[book,created] = await Books.findOrCreate({
               where:{title:title},
               defaults:{
                   title:title,
                   author:author,
                   userId:userId,
               }
           })
           if(!created){
               return res.status(409).json({
                   message: 'Book already exists',
                   book: book
               });
           } else {
               return res.status(201).json({
                   message: 'Book added successfully',
                   book: book
               });
           }

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
            let page = 1;
            let limit = 10;
            const booksList = await Books.findAll({
                include: [
                    {
                        model: Users,
                        attributes: ['id', 'username']
                    }
                ],
                order: [
                    ['createdAt', 'Desc']
                ],
                offset: (page - 1) * limit,
                limit,
            });

            if (booksList.length === 0) {
                return res.status(404).json({
                    message: 'No books found'
                });
            }

             res.status(200).json({message: 'Books retrieved successfully', books: booksList});

        } catch (error) {
            console.error('Error fetching books:', error);
            return res.status(500).json({
                message: 'An error occurred while retrieving books',
                error: error.message
            });
        }
    }

}