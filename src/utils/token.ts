import jwt from "jsonwebtoken";

const createToken = async (data: any) => {
  const jwtSecretkey = process.env.JWT_SECRET_KEY;
  if (!jwtSecretkey) {
    throw new Error(
      "JWT_SECRET_KEY is not defined in the environment variables."
    );
  }
  const token = jwt.sign(data, jwtSecretkey, {
    expiresIn: "7d",
  });
  return token;
};

export default createToken;
