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
  // * Functions for user
  
  async getUserById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },
  
  async createUser(email, first_name, password) {
    const result = await pool.query(
      "INSERT INTO users (email, first_name, password) VALUES (?, ?, ?)",
      [email, first_name, password]
    );
    const id = result[0].insertId;
    console.log("user id: " + id + " created");
    return module.exports.getUserById(id);
  },

  async deleteUserById(id) {
    // First, delete associated todos
    await pool.query("DELETE FROM todo WHERE user_email = (SELECT email FROM users WHERE id = ?)", [id]);
    
    // Then, delete the user
    const result = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result[0];
  },
  
  // * Functions for todo
  // * Updated for phase 3
  async getTodosByUserEmail(userEmail) {
    const [rows] = await pool.query("SELECT * FROM todo WHERE user_email = ?", [userEmail]);
    return rows;
  },
  
  //! Might be getting cut out
  // async getTodos() {
  //   const [rows] = await pool.query("SELECT * FROM todo");
  //   return rows;
  // },
  // * Updated for phase 3  
  async getTodo(id) {
    const [rows] = await pool.query("SELECT * FROM todo WHERE id = ?", [id]);
    return rows[0];
  },

  // * Completed for phase 3
  async createTodo(userEmail, title, description) {
    const result = await pool.query(
      "INSERT INTO todo (user_Email, title, description, completed) VALUES (?, ?, ?, ?)",
      [userEmail, title, description, false]
    );
    const id = result[0].insertId;
    console.log("todo id: " + id + " created");
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