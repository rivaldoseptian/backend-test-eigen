module.exports = (error, req, res, next) => {
    let message = "Internal Server Error";
    let status = 500;
  
    switch (error.name) {
      case "SequelizeValidationError":
      case "SequelizeUniqueValidationError":
      case "SequelizeUniqueConstraintError":
        status = 400;
        message = error.errors[0].message;
        break;
      case "Book Not found":
        status = 404;
        message = "Book Not Found";
        break;
      case "Member Not found":
        status = 404;
        message = "Member Not found";
        break;
      case "penalized":
        status = 400;
        message = "Can't borrow books if you're under penalized";
        break;
      case "can not borrow":
        status = 400;
        message = "Member can only borrow 2 books";
        break;
      case "book required":
        status = 400;
        message = "book required";
        break;
      case "member required":
        status = 400;
        message = "member required";
        break;
      case "borrow date required":
        status = 400;
        message = "borrow date required";
        break;
      case "return date required":
        status = 400;
        message = "borrow date required";
        break;
      case "Out of stock":
        status = 400;
        message = "The book is out of stock";
        break;
      case "Members not borrow the book":
        status = 400;
        message = "Members not borrow the book";
        break;
      default:
        message = "Internal Server Error";
        status = 500;
        break;
    }
  
    res.status(status).json({ message: message });
  };