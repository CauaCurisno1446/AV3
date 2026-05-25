import { Router } from "express";

import { listarEtapas, criarEtapa, deletarEtapa, atualizarEtapa } from "../controllers/etapaController";

const router = Router();

router.get("/listar", listarEtapas);
router.post("/criar", criarEtapa);
router.put("/atualizar/:id", atualizarEtapa);
router.delete("/deletar/:id", deletarEtapa);

export default router;
