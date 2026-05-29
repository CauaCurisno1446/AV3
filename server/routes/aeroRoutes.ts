import { Router } from "express";
import { listarAeronaves, criarAeronave, deletarAeronave, atualizarAeronave } from "../controllers/aeroController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.get("/", listarAeronaves);
router.post("/", criarAeronave);
router.put("/:id", atualizarAeronave);
router.delete("/:id", deletarAeronave);

export default router;
