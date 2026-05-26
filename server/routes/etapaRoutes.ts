import { Router } from "express";

import { listarEtapas, criarEtapa, deletarEtapa, atualizarEtapa } from "../controllers/etapaController";

const router = Router();

router.get("/", listarEtapas);
router.post("/", criarEtapa);
router.put("/:id", atualizarEtapa);
router.delete("/:id", deletarEtapa);

export default router;
