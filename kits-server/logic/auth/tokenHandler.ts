import jwt from 'jsonwebtoken';

export const generateToken = (email, isRemembering) => {
  return jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: isRemembering ? '10d' : '30m',
  });
}

export const validateToken = (req, res, next) => {
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
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.email = jwtPayload.email;
    next();
  } catch (err) {
    res.status(401);
    res.send("Unauthorized");
    return;
  }
}