import { Router } from "express";

import { listarAeronaves, criarAeronave, deletarAeronave, atualizarAeronave } from "../controllers/aeroController";

const router = Router();

router.get("/listar", listarAeronaves);
router.post("/criar", criarAeronave);
router.put("/atualizar/:id", atualizarAeronave);
router.delete("/deletar/:id", deletarAeronave);

export default router;
