import express from "express";
import cors from "cors";
import "./appEnv.mjs";
import addresses from "./routes/address.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/address", addresses);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
