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
      case "Unauthenticated":
      case "JsonWebTokenError":
        status = 401;
        message = "Unauthenticated";
        break;
      case "Invalid Email/Password":
        status = 404;
        message = "Invalid Email/Password";
        break;
      case "Not Found":
        status = 404;
        message = "Menu Not Found";
        break;
      case "Forbiden":
        status = 403;
        message = "You are not authorized";
        break;
      default:
        message = "Internal Server Error";
        status = 500;
        break;
    }
  
    res.status(status).json({ message: message });
  };