import app from "./src/app.js";
import { _Config } from "./src/config/config.js";
import connectDB from "./src/config/db.js";

await connectDB();

app.listen(_Config.PORT, () => {
  console.log(`Server is running on port ${_Config.PORT}`);
});
