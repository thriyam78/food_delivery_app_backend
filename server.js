const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = require("./app");
const { checkDatabaseConnection } = require("./database/db.config");
const port = process.env.PORT || 8080;
checkDatabaseConnection();
app.listen(port, () => {
  console.log("Server is listening on Port", port);
});
