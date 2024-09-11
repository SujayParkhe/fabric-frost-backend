import { Router } from "express";
import { authControllers } from "../controllers/authControllers";

const router = Router();

router.post("/admin-login", authControllers.adminLogin);

export default router;
