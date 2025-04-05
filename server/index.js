require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cookieParse = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

//middlewares
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParse());
app.use(cors({ origin: process.env.FRONTEND_URL}));

//routes
const userRoute = require("./routes/User");
const courseRoute = require("./routes/Course");
const paymentRoute = require("./routes/Payment");
const profileRoute = require("./routes/Profile");
const contactController=require("./routes/contact")

//connections
const connectDB = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudanory");
connectDB();
cloudinaryConnect();

// handle routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
//left for testing -> payment
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/contactUs", contactController);

app.get("/", (req, res) => {
  res.send("Your server is running");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

