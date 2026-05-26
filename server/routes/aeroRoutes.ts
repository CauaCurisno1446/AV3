import { Router } from "express";

import { listarAeronaves, criarAeronave, deletarAeronave, atualizarAeronave } from "../controllers/aeroController";

const router = Router();

router.get("/", listarAeronaves);
router.post("/", criarAeronave);
router.put("/:id", atualizarAeronave);
router.delete("/:id", deletarAeronave);

export default router;
