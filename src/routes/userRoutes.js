const express = require("express");
const { signin, signup, prospectfoliocreation } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/signin", signin);
userRouter.post("/prospectfoliocreation",prospectfoliocreation);
module.exports = userRouter;