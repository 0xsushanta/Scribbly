import express from "express";
import "dotenv/config";
import userRoutes from "./routes/user/user.routes";
import roomRoutes from "./routes/room/room.routes";

const app = express();
const port = Number(process.env.PORT ?? 3001);
const corsOrigin = process.env.CORS_ORIGIN ?? "*";

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", corsOrigin);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", roomRoutes);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
