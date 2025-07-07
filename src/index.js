import { Rensa } from 'rensa';
import { env } from 'rensa/utils';
import { homeIndex } from './controllers/homeController.js';
import fs from 'fs';
import path from 'path';
import { login, signup } from './controllers/authController.js';
import {
  newProj,
  getAllProj,
  getProj,
  updateProj,
  deleteProj
} from './controllers/projectController.js';
import {
  getTasks,
  getTask,
  newTask,
  updateTask,
  deleteTask
} from './controllers/taskController.js';


export const app = new Rensa();
const port = process.env.PORT || 3000;

// Layers (Built-in)
env();
app.useBuiltin("logger");

// Routes
app.get({ path: "/" }, homeIndex);

// Auth routes
app.post({ path: "/api/auth/signup" }, signup);
app.post({ path: "/api/auth/login" }, login);

// Project routes
app.get({ path: "/api/projects" }, getAllProj);
app.get({ path: "/api/projects/:id" }, getProj);
app.post({ path: "/api/projects/new" }, newProj);
app.put({ path: "/api/projects/:id" }, updateProj);
app.delete({ path: "/api/projects/:id" }, deleteProj);

// Task routes
app.get({ path: "/api/tasks" }, getTasks);
app.get({ path: "/api/tasks/:id" }, getTask);
app.post({ path: "/api/tasks/new" }, newTask);
app.put({ path: "/api/tasks/:id" }, updateTask);
app.delete({ path: "/api/tasks/:id" }, deleteTask);

// Start the server
// app.listen(port, () => {
//   console.log(`Server started on port ${port}...`);
// })
