export default function roleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const userRole = String(req.user.role || "").toUpperCase();
    const roles = allowedRoles.map(r => String(r).toUpperCase());

    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: "Acesso negado: permissão insuficiente" });
    }

    next();
  };
}