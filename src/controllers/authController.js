import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/index.js";
import { errorHandler } from "../utils/errorHandler.js";

const prisma = new PrismaClient();

export const signup = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !username || !password) return res.status(400).send({ error: "missing fields", message: "Email, username and password are required for signup." });
  
  try {
    // Hash the password
    const hpswd = await argon2.hash(password);

    // Store user details in DB
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hpswd,
      },
    });

    // Create jwt token
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    // Create refresh token
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, username: user,username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    // Store refresh token in cookie
    const isProd = process.env.NODE_ENV === "production";
    res.setHeader("Set-Cookie", `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}; ${isProd ? 'Secure;' : ''}`);

    res.status(201).send({ message: "Signup successful.", accessToken });
  } catch (e) {
    errorHandler(e, res, "signing up");
  }
}

export const login = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) return res.status(400).send({ error: "missing credentials", message: "Provide either an email or a username to log in." });
  
  if (!password) return res.status(400).send({ error: "missing password", message: "Password is required to log in." });

  try {
    let user;

    // Get username from DB, search through username/email (username has higher priority)
    if (username) {
      user = await prisma.user.findUnique({ where: { username } });
    } else {
      user = await prisma.user.findUnique({ where: { email } });
    }

    if (!user) return res.status(401).send({ error: "invalid username or email", message: "Username or email not found." });

    // Check if input password meets hash stored in DB
    const isCorrect = await argon2.verify(user.password, password);

    if (!isCorrect) return res.status(401).send({ error: "incorrect password", message: "Incorrect password." });

    // Create jwt token
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    // Create refresh token
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, username: user,username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    // Store refresh token in cookie
    const isProd = process.env.NODE_ENV === "production";
    res.setHeader("Set-Cookie", `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}; ${isProd ? 'Secure;' : ''}`);

    res.status(200).send({ message: "Login successful.", accessToken });
  } catch (e) {
    errorHandler(e, res, "logging in")
  }
}

export const refresh = (req, res) => {
  const token = req.cookies.refresh_token;
  if (!token) return res.status(401).send({ error: "missing refresh token", message: "Refresh token missing." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, username: decoded.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.status(200).send({ accessToken: newAccessToken });
  } catch (e) {
    res.status(403).send({ error: "invalid refresh token", message: "Invalid or expired refresh token." });
  }
}
