// Initialize database connection
const mysql = require("mysql2");
// Load environment variables
const dotenv = require("dotenv");
// Load path module
const path = require("path");
// Set path to .env file
const envPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

// Create a pool connection using environment variables
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// Export functions
module.exports = {
  // * Up dated for phase 3
  async getTodosByUserId(userId) {
    const [rows] = await pool.query("SELECT * FROM todo WHERE user_id = ?", [userId]);
    return rows;
  },
    
  // async getTodos() {
  //   const [rows] = await pool.query("SELECT * FROM todo");
  //   return rows;
  // },
  //! Might be getting cut out
  async getTodo(id) {
    const [rows] = await pool.query("SELECT * FROM todo WHERE id = ?", [id]);
    return rows[0];
  },

  // * This wil be changed for phase 3
  async createTodo(title, description) {
    const result = await pool.query(
      "INSERT INTO todo (title, description, completed) VALUES (?, ?, ?)",
      [title, description, false]
    );
    const id = result[0].insertId;
    return module.exports.getTodo(id);
  },

  // * This should be able to stay the same for phase 3
  async completedTodoById(id) {
    const result = await pool.query(
      "UPDATE todo SET completed = NOT completed WHERE id = ?",
      [id]
    );
    //console.log(result);
    return result[0];
  },
  // * This should be able to stay the same for phase 3
  async deleteTodoById(id) {
    const result = await pool.query("DELETE FROM todo WHERE id = ?", [id]);
    return result[0];
  },
};
