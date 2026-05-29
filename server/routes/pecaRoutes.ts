import { Router } from "express";
import { listarPecas, criarPeca, atualizarPeca, deletarPeca } from "../controllers/pecaController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.get("/", listarPecas);
router.post("/", criarPeca);
router.put("/:id", atualizarPeca);
router.delete("/:id", deletarPeca);

export default router;
