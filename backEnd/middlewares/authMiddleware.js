const { verifyToken } = require("../config/jwtConfig");

// Middleware para autenticação via JWT
function authenticateMiddleware(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Extrai o token do cabeçalho Authorization

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido!" });
  }

  try {
    const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;

    const token = verifyToken(cleanToken);

    req.user = token;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = authenticateMiddleware;
