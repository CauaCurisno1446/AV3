import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use((req, res, next) => {
  const inicio = performance.now();

  res.on("finish", () => {
    console.log(
      `${req.method} ${req.originalUrl} - ${(performance.now() - inicio).toFixed(2)}ms`
    );
  });

  next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
