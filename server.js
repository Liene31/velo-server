import express from "express";

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
