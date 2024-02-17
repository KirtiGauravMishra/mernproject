import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import userRouter from "./routes/userRouter.js";
import mentorRoute from "./routes/mentorRoute.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
dotenv.config({path:"./config/config.env"})

app.use(cors({
      origin: [process.env.FRONTEND_URL],
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    }));

// cookieparser used for getting token and authorization
app.use(cookieParser());
// express json converts string into json
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use( fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    }));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/mentor", mentorRoute)
app.use("/api/v1/application", applicationRouter);

dbConnection();
// Always use error middleware at last
app.use(errorMiddleware)

export default app;