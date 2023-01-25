const express = require("express");

const app = express();

app.use(cors);
app.use(express.json());

let task_id = 1;
let task_list = [];

const getTaskById = (id) => {
  return task_list.find((task) => {
    return task.id === Number(id); //catch type error?
  });
};

/*
 POST /tasks
{
  description: "clean the room"
}*/

app.post("/tasks", (req, res) => {
  const { description } = req.body;
  const task = {
    id: task_id++,
    description: description,
    done: false,
  };

  task_list.push(task);

  res.json(task);
});

/*
GET /tasks
[
  {
    id: 1,
    description: "clean the room",
    done: false
  }
]
GET /tasks?description=xxxxx
*/
app.get("/tasks", (req, res) => {
  const queryDesc = req.query.description;
  const filterList = (queryDesc) =>
    task_list.filter((task) => task.description.includes(queryDesc));

  queryDesc ? res.json(filterList(queryDesc)) : res.json(task_list);
});

/*
GET /tasks/1
{
  id: 1,
  description: "clean the room",
  done: false
}*/
app.get("/tasks/:id", (req, res) => {
  res.json(getTaskById(req.params.id)); //catch undefined error?
});

/*
PUT /tasks/1
{
  description: "update task",
  done: true
}*/

app.put("/tasks/:id", (req, res) => {
  const task = getTaskById(req.params.id);

  task.description = req.body.description;
  task.done = req.body.done;

  res.json(task);
});

/**
 * DELETE /tasks/1
 */

app.delete("/tasks/:id", (req, res) => {
  task_list = task_list.filter((task) => task.id != req.params.id);

  res.send(`Task ${req.params.id} deleted`);
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

function cors(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
}
