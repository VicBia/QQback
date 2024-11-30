const { verifyToken } = require("../config/jwtConfig");
const cookie = require("cookie");

// Middleware para autenticação via JWT
function authenticateMiddleware(req, res, next) {
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido!" });
  }

  try {
    const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;

    // Verifica e decodifica o token JWT
    const decoded = verifyToken(cleanToken);

    if (!decoded || !decoded.profiles) {
      return res
        .status(403)
        .json({ message: "Perfil de usuário não encontrado no token!" });
    }

    req.user = decoded; // Atribui o usuário decodificado ao objeto req
    next();
  } catch (error) {
    // Retorna mensagem de erro detalhada
    res.status(401).json({ message: `Token inválido: ${error.message}` });
  }
}

module.exports = authenticateMiddleware;
