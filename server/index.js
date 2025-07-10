const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors")
const { connection } = require("./dbconnection");
const dbURL = require("./models/urlModel");
const cookieParser = require("cookie-parser");
const urlRouter = require("./routes/routes");
const UserRouter = require("./routes/userRoute");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

connection("mongodb://127.0.0.1:27017/urlDb").then(()=>{
  console.log("db conntected")
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
  

}))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/user", UserRouter);
app.use("/url", restrictToLoggedinUserOnly, urlRouter);

app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
