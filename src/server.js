import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import { connectDB } from "./config/db.connect.js";
import { config } from "./config/config.js";
import { initializePassport } from "./config/passport.config.js";
import routes from "./routes/index.js";

const app = express();
const PORT = config.PORT;

//Express config
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.SIGN_COOKIE));

//Passport config
initializePassport();
app.use(passport.initialize());

//Routes
app.use("/api", routes);
app.use((req, res) => {
  res
    .status(404)
    .json({ error: "Route not found", message: "The route you are looking for does not exist" });
});

//Connect to DB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
