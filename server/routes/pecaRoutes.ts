import { Router } from "express";

import { listarPecas, criarPeca, atualizarPeca, deletarPeca } from "../controllers/pecaController";

const router = Router();

router.get("/", listarPecas);
router.post("/", criarPeca);
router.put("/:id", atualizarPeca);
router.delete("/:id", deletarPeca);

export default router;
