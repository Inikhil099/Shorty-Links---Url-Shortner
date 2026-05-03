const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./dbconnection");
const dbURL = require("./models/urlModel");
const path = require("path");
const cron = require("node-cron");
const cookieParser = require("cookie-parser");
const urlRouter = require("./routes/routes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const _dirname = path.resolve();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// cron.schedule("*/10 * * * *", async () => {
//   try {
//     const res = await fetch(`${process.env.ORIGIN}/health`);
//     console.log("Pinged:", res.status);
//   } catch (err) {
//     console.error("Error:", err.message);
//   }
// });

setInterval(
  async () => {
    const f = await fetch(`${process.env.ORIGIN}/health`);
    const data = await f.text()
    console.log(data);
  },
  1000 * 60 * 5,
);

app.use("/auth", authRouter);
app.use("/user", restrictToLoggedinUserOnly, userRouter);
app.use("/url", urlRouter);
app.use("/admin", restrictToLoggedinUserOnly, adminRouter);

app.get("/health", (req, res) => {
  return res.json({ msg: "Bit Links server is running" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
  });
}

connection(process.env.DB_URI).then(() => {
  console.log("db conntected");
  app.listen(PORT, () => {
    console.log("server running on port ", PORT);
  });
});
