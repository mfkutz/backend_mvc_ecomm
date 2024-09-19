import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import cartRoutes from "./cart.routes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);

export default router;
