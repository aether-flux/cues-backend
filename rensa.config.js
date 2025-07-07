import { app } from "./src/index.js";

export default {
  mode: "manual",
  app: app,
  port: process.env.port || 5000,
}
