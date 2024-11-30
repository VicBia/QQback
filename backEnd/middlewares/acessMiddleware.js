const { verifyAcess } = require("../utils/verifyAcess");

// Middleware de autorização
function acessMiddleware(requiredProfiles) {
  return async (req, res, next) => {
    const perfilUsuario = req.user ? req.user.profiles : null; // Verificar se req.user existe

    if (!perfilUsuario) {
      return res
        .status(403)
        .json({ message: "Perfil de usuário não encontrado" });
    }

    const metodo = req.method; // Método HTTP (GET, POST, etc)
    const rota = req.originalUrl; // Rota sendo acessada

    // Verificar permissões
    const acessoPermitido = await verifyAcess(
      perfilUsuario,
      requiredProfiles,
      metodo,
      rota
    );

    if (acessoPermitido) {
      return next(); // Se tiver permissão, continue para a rota
    }

    // Se não tiver permissão, bloqueie o acesso
    return res.status(403).json({ message: "Acesso proibido" });
  };
}

module.exports = acessMiddleware;
