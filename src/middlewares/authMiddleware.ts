import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface GetUserRequest extends Request {
  id?: string;
  role?: string;
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

const authMiddleware = async (
  req: GetUserRequest,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.cookies;
  const jwtSecretkey = process.env.JWT_SECRET_KEY;
  if (!jwtSecretkey) {
    throw new Error(
      "JWT_SECRET_KEY is not defined in the environment variables."
    );
  }

  if (!accessToken) {
    return res.status(409).json({ error: "Please Login First" });
  } else {
    try {
      const decodeToken = (await jwt.verify(
        accessToken,
        jwtSecretkey
      )) as CustomJwtPayload;
      req.role = decodeToken.role;
      req.id = decodeToken.id;

      next();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(409).json({ error: "Please Login First" });
      }
    }
  }
};

export default authMiddleware;
