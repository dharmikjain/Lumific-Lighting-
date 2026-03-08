/**
 * RBAC middleware - restricts access by role
 * Roles: client, interior, architect, sales, marketing, partner
 */

const ROLES = ["client", "interior", "architect", "sales", "marketing", "partner"];

/**
 * Restrict to specific roles. Use after authMiddleware.
 * @param {string[]} allowedRoles - e.g. ['architect', 'sales', 'partner']
 */
export function requireRole(...allowedRoles) {
  const allowed = new Set(allowedRoles.map((r) => r.toUpperCase()));

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const userRole = (req.user.role || "").toUpperCase();
    if (!allowed.has(userRole)) {
      return res.status(403).json({
        error: "Forbidden",
        message: `This action requires one of: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
}

/**
 * Restrict to authenticated users only (any role)
 */
export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}

export { ROLES };
