const express = require("express");

const app = express();

app.use(cors);
app.use(express.json());

let taskId = 1;
let taskList = [];
const getTaskbyId = (id) => taskList.find((task) => task.id === Number(id));

/**
 * Create new task - Post /tasks
 * {
  description: "clean the room"
}
 */
app.post("/tasks", (req, res) => {
    const task = {
        id: taskId++,
        description: req.body.description,
        done: false,
    };

    taskList.push(task);
    res.json(task);
});

/**
 * Get /tasks -> task list
 * Get /tasks?description=xxxx -> filtered tasks
 */

app.get("/tasks", (req, res) => {
    const desc = req.query.description;
    const filteredTasks = taskList.filter((task) =>
        task.description.includes(desc)
    );

    desc ? res.json(filteredTasks) : res.json(taskList);
});

/**
 * Get /tasks/:id -> task with specific id
 */
app.get("/tasks/:id", (req, res) => {
    res.json(getTaskbyId(req.params.id));
});

/*
PUT /tasks/1
{
  description: "update task",
  done: true
}
*/
app.put("/tasks/:id", (req, res) => {
    const task = getTaskbyId(req.params.id);

    task.description = req.body.description;
    task.done = req.body.done;

    res.json(task);
});

/**
 * Delete /tasks/1
 */
app.delete("/tasks/:id", (req, res) => {
    taskList = taskList.filter((task) => task.id != req.params.id);

    res.json(taskList);
});

app.listen(3000);

function cors(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
}
