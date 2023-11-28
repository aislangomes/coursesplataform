import express from "express";
import { router } from "./routes";

const app = express();
const serverip = 3333;

app.use(express.json());
app.use(router);

app.listen(serverip, () =>
  console.log(`Server is running on http://localhost:${serverip}`)
);
