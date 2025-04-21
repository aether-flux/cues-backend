const { Rensa, env } = require('rensa');
const { homeIndex } = require('./controllers/homeController.js');
const fs = require('fs');
const path = require('path');
const { login } = require('./controllers/authController.js');

const app = new Rensa();
const port = process.env.PORT || 3000;

// Layers (Built-in)
env();
app.useBuiltin("logger");

// Routes
app.get("/", homeIndex);

// Auth routes
app.get("/api/auth/login", login);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
})
