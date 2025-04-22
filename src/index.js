const { Rensa, env } = require('rensa');
const { homeIndex } = require('./controllers/homeController.js');
const fs = require('fs');
const path = require('path');
const { login } = require('./controllers/authController.js');
const { newProj, getAllProj, getProj, updateProj, deleteProj } = require('./controllers/projectController.js');
const { getTasks, getTask, newTask, updateTask, deleteTask } = require('./controllers/taskController.js');

const app = new Rensa();
const port = process.env.PORT || 3000;

// Layers (Built-in)
env();
app.useBuiltin("logger");

// Routes
app.get("/", homeIndex);

// Auth routes
app.get("/api/auth/login", login);

// Project routes
app.get("/api/projects", getAllProj);
app.get("/api/projects/:id", getProj);
app.post("/api/projects/new", newProj);
app.put("/api/projects/:id", updateProj);
app.delete("/api/projects/:id", deleteProj);

// Task routes
app.get("/api/tasks", getTasks);
app.get("/api/tasks/:id", getTask);
app.post("/api/tasks/new", newTask);
app.put("/api/tasks/:id", updateTask);
app.delete("/api/tasks/:id", deleteTask);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
})
