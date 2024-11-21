const jwt = require('jsonwebtoken');

// Middleware para autenticação via JWT
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Extrai o token do cabeçalho Authorization

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido!' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'seu-segredo', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido!' });
        }

        req.user = user; // Adiciona o usuário autenticado à requisição
        next();
    });
}

module.exports = authenticateToken;
