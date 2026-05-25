import { Router } from "express";

import { listarPecas, criarPeca, atualizarPeca, deletarPeca } from "../controllers/pecaController";

const router = Router();

router.get("/listar", listarPecas);
router.post("/criar", criarPeca);
router.put("/atualizar/:id", atualizarPeca);
router.delete("/deletar/:id", deletarPeca);

export default router;
