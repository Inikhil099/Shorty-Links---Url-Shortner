const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors")
const { connection } = require("./dbconnection");
const dbURL = require("./models/urlModel");
const cookieParser = require("cookie-parser");
const urlRouter = require("./routes/routes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const path = require("path")

connection("mongodb://127.0.0.1:27017/shortylinks").then(()=>{
  console.log("db conntected")
});



app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/auth", authRouter);
app.use("/user",userRouter)
app.use("/url", restrictToLoggedinUserOnly, urlRouter);
app.use("/admin", adminRouter);





app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
