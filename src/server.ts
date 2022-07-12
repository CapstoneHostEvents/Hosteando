import app from "./app";
import { AppDataSource } from "./data-source";

const init = async () => {
  const PORT = process.env.PORT || 3000;

  await AppDataSource.initialize();
  app.listen(PORT, () => {
    console.log("Server is running!");
  });
};

init();
