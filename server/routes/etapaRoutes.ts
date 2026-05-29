import { Router } from "express";
import { listarEtapas, criarEtapa, deletarEtapa, atualizarEtapa } from "../controllers/etapaController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.get("/", listarEtapas);
router.post("/", criarEtapa);
router.put("/:id", atualizarEtapa);
router.delete("/:id", deletarEtapa);

export default router;
