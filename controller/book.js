const { book, Op } = require("../models");

class Book{
    static async listBooks(req, res, next) {
        try {
            const books = await book.findAndCountAll({
                where: {
                    bok_stock: {
                        [Op.gt]: 0
                    }
                }
            });

          const result = {
                totalBooks: books.count,
                books: books.rows  
          }
          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
    }
}


module.exports = Book