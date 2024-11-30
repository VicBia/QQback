// Mapeamento de acessos por perfil com métodos HTTP permitidos
const modules = {
  justStore: {
    "/api/store": ["GET"], // Apenas acesso à própria loja
  },
  dashboard: {
    "/api/dashboard": ["GET"],
    "/dashboard": ["GET"],
  },
  users: {
    "/api/register": ["GET", "POST", "PUT", "DELETE"], // Controle total na tabela users
    "/gestao_usuarios": ["GET"],
  },
  profile: {
    "/api/profile": ["GET", "POST", "PUT", "DELETE"], // Controle total na tabela profile
    "/api/association": ["GET", "POST", "PUT", "DELETE"], // Controle total na tabela userprofile
    "/gestao_perfis": ["GET"],
  },
  store: {
    "/api/store": ["GET", "POST", "PUT", "DELETE"], // Controle total na tabela store
    "/gestao_lojas": ["GET"],
  },
  stock: {
    "/api/stock": ["GET", "POST", "PUT", "DELETE"], // Controle total na tabela stock
    "/api/talons": ["GET", "POST", "PUT", "DELETE"], // Controle total na tabela talons
    "/estoque": ["GET"],
  },
  send: {
    "/api/send": ["GET", "POST", "PUT", "DELETE"], // Controle total nas transações de envio
    "/gestao_envio": ["GET"],
  },
  receive: {
    "/api/send": ["GET", "PUT"], // Somente GET e UPDATE nas transações de recebimento
    "/gestao_recebimento": ["GET"],
  },
  maintenance: {
    "/api/talons": ["POST"], // POST na tabela talons
    "/api/send": ["GET", "PUT"], // GET e UPDATE nas transações de manutenção
    "/manutencao": ["GET"],
  },
  reports: {
    "/api/reports": ["GET"], // Somente GET em relatórios
    "/relatorios": ["GET"],
  },
};

// Função para verificar as permissões de acesso de um usuário
async function verifyAcess(perfis = [], requiredProfiles, metodo, rota) {
  console.log("Perfis permitidos:", requiredProfiles);
  console.log("Perfis do usuário:", perfis);
  console.log("Método:", metodo);
  console.log("Rota original:", rota);

  // Extrai a rota base
  const baseRoute = rota.split("?")[0].split("/").slice(0, 3).join("/"); // Ex: /api/store

  console.log("Rota base:", baseRoute);

  // Verificar se o perfil do usuário tem acesso à rota e ao método HTTP
  for (const perfil of perfis) {
    console.log("Verificando perfil:", perfil);
    if (
      requiredProfiles.includes(perfil) &&
      modules[perfil] &&
      modules[perfil][baseRoute] &&
      modules[perfil][baseRoute].includes(metodo)
    ) {
      console.log("Acesso permitido para perfil:", perfil);
      return true;
    }
  }

  console.log("Acesso negado.");
  return false;
}

module.exports = {
  verifyAcess,
};
