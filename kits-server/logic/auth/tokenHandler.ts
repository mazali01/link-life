import jwt from 'jsonwebtoken';

export const generateToken = (email, isRemembering) => {
  return jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: isRemembering ? '10d' : '30m',
  });
}

export const generateAdminToken = () => {
  return jwt.sign({ user: "admin" }, process.env.JWT_ADMIN_SECRET!, {
    expiresIn: '30m',
  });
}


const validateToken = (getJwtSecret) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401);
      res.send("Unauthorized");
      return;
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      res.status(401);
      res.send("Unauthorized");
      return;
    }

    try {
      req.payload = jwt.verify(token, getJwtSecret()) as any;;
      next();
    } catch (err) {
      res.status(401);
      res.send("Unauthorized");
      return;
    }
  }
}

export const validateUserToken = validateToken(() => process.env.JWT_SECRET!);
export const validateAdminToken = validateToken(() => process.env.JWT_ADMIN_SECRET!);