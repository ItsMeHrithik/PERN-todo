const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6004;
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//db config

//ROUTES

//create a todo
app.post("/todos", async (req, res) => {
  //waits for the function to complete - async

  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT*FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});
//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT*FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {}
});
//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todoupdate = await pool.query(
      "UPDATE todo SET  description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo is updated");
  } catch (error) {
    console.log(error.message);
  }
});

//delete a todo

app.delete("/todos/:id", (req, res) => {
  try {
    const { id } = req.params;
    const deletetodo = pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("todo deleted");
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/", (res, req) => {
  req.status(200).send("My PERN todo is working");
});

//listen
app.listen(port, () => {
  console.log(`listening on localhost: ${port} `);
});
