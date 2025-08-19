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
require("dotenv").config()
connection(process.env.DB_URI).then(()=>{
  console.log("db conntected")
});
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true,
  methods:["GET","POST","PUT","PATCH","DELETE"]
}))



app.use(express.json());

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/auth", authRouter);
app.use("/user",restrictToLoggedinUserOnly,userRouter)
app.use("/url", restrictToLoggedinUserOnly, urlRouter);
app.use("/admin",restrictToLoggedinUserOnly, adminRouter);


app.get("/",(req,res)=>{
  return res.send("hello from the shorty backend")
})


app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
