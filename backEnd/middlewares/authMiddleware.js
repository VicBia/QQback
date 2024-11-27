const { verifyToken } = require("../config/jwtConfig");
const cookie = require("cookie");

// Middleware para autenticação via JWT
function authenticateMiddleware(req, res, next) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido!" });
  }

  try {
    const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;

    const decoded = verifyToken(cleanToken);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = authenticateMiddleware;
