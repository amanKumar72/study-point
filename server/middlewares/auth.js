const { verifyToken } = require("../utils/JWT");

//isInstructor
const isInstructor = (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This route is restricted to instructor only",
      });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while validating the token" });
  }
};

//isAdmin
const isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This route is restricted to admin only",
      });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while validating the token" });
  }
};

//auth
const auth = (req, res, next) => {
  try {
    //extracting token
    const token =
      req.cookies.token ||
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "");
      console.log(token);
      
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token is missing-",
      });
    }

    //verifying token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while validating the token",error:error.message });
  }
};

// isStudent

const isStudent = (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This route is restricted to student only",
      });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while validating the token" });
  }
};

module.exports = {
  isAdmin,
  isInstructor,
  isStudent,
  auth,
};
