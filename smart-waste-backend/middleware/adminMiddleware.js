// backend/middleware/adminMiddleware.js
import jwt from "jsonwebtoken";

export const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");

    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Not an admin" });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ error: "Token not valid" });
  }
};
