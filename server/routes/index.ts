import { Router } from "express";

import userRoutes from "./userRoutes";
import aeroRoutes from "./aeroRoutes";
import pecaRoutes from "./pecaRoutes";
import etapaRoutes from "./etapaRoutes";

const router = Router();

router.use("/usuarios", userRoutes);
router.use("/aeronaves", aeroRoutes);
router.use("/pecas", pecaRoutes);
router.use("/etapas", etapaRoutes);

export default router;
