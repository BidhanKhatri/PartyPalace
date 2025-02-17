import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
import partyPalaceRouter from "./routes/partypalace.route.js";
import bookingRouter from "./routes/booking.route.js";
import adminRouter from "./routes/admin.route.js";
import messageRouter from "./routes/message.route.js";
import aiRouter from "./routes/ai.route.js";
import superAdminRouter from "./routes/superadmin.route.js";

const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use("/images", express.static("public/images"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/partypalace", partyPalaceRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/message", messageRouter);
app.use("/api/ai", aiRouter);
app.use("/api/superadmin", superAdminRouter);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
