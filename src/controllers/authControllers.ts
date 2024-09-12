import { Request, Response } from "express";
import bcrypt from "bcrypt";
import createToken from "../utils/token";
import adminModel from "../models/adminModel";
import responseReturn from "../utils/response";

interface GetUserRequest extends Request {
  id?: string;
  role?: string;
}

const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email }).select("+password");
    if (admin) {
      const isPasswordMatched = await bcrypt.compare(password, admin.password);
      if (isPasswordMatched) {
        const token = await createToken({
          id: admin.id,
          role: admin.role,
        });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 200, { token, message: "Logged in successfully" });
      } else {
        responseReturn(res, 400, { message: "Password is incorrect" });
      }
    } else {
      responseReturn(res, 400, { message: "Email not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      responseReturn(res, 500, { message: error.message });
    } else {
      responseReturn(res, 500, { message: "An unknown error occurred" });
    }
  }
};

const getUser = async (req: GetUserRequest, res: Response) => {
  const { id, role } = req;

  try {
    if (role === "admin") {
      const user = await adminModel.findById(id);
      responseReturn(res, 200, { userInfo: user });
    } else {
      console.log("It's a seller");
    }
  } catch (error) {
    if (error instanceof Error) {
      responseReturn(res, 500, { message: error.message });
    } else {
      responseReturn(res, 500, { message: "An unknown error occurred" });
    }
  }
};

export const authControllers = {
  adminLogin,
};
