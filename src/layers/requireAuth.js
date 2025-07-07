import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "missing token" });
  
  const token = authHeader.split(' ')[1];

  try {
    // Extract user data from token
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;  // Attach user details to req object

    next();  // Calling the next handler
  } catch (e) {
    res.status(401).send({ error: "invalid or expired token" });
  }
}
