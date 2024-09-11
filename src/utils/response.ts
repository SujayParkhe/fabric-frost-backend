import { Response } from "express";

const responseReturn = (res: Response, code: number, data: any) => {
  return res.status(code).json(data);
};

export default responseReturn;
